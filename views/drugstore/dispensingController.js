define(['controller/controllers','jquery','services/HealthDBService'
    ],function(controllers,$){
    angular.module('app.dispensing',['ngRoute'])
    .config(['$routeProvider' , function($routeProvider){
    	$routeProvider.when("/dispensing",{
        	templateUrl:"views/drugstore/dispensing.html",
        	controller:"dispensingController"
        });
    }])
    controllers.controller("dispensingController", ['$rootScope','$scope','$routeParams','$http','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,HealthDBService){
    		$scope.selectDay = 1;	//今天or所有
    		$scope.prescNo = "";	//流水号
    		$scope.inpOrOutp = "";	//1门诊2住院
    		$scope.index = 0;		//左侧id
    		$scope.recipeList = [{}];
    		$scope.recipeItemList = [{}];
    		listRecipe();
            
	    	$scope.changeDay = function(flag){
	    		$scope.selectDay = flag;
	    		empty();
	    		listRecipe();
	    	}
	    	$scope.inpOrOutp = function(flag){
	    		var temp = "";
	    		if(flag == 1){
	    			temp = "门诊";
	    		}else{
	    			temp = "住院";
	    		}
	    		return temp;
	    	}
	    	//------查询处方列表，填充左侧
    		function listRecipe(){
        		var param = {searchCondition1:$scope.selectDay,patient_barCode:$scope.nhcardno};
    	    	HealthDBService.httpPostForm("dispensing.do",param,function(data){
    	    		$scope.recipeList = data.list;
    	    	});
    			
    		}
    		//------查询处方明细，填充右侧
    		$scope.findDetail = function(r){
    			$scope.prescNo = r.prescNo;
    			$scope.inpOrOutp = r.inpOrOutp;
    			var td = event.srcElement; // 通过event.srcElement 获取激活事件的对象 td 
    			$scope.index=td.parentElement.rowIndex;//获取行
			
	    		var param = {recipe_dispensedFlag:"",presc_no:r.prescNo};
	    		if (!r.prescNo){
	    			return;
	    		}
	    		if (r.inpOrOutp==1){
		    		HealthDBService.httpPostForm("queryRecipeItem.do",param,function(data){
    	    			$scope.recipeItemList = data.list;
    	    			totalCount(data.list);
    	    		});
	    		}else{
		    		HealthDBService.httpPostForm("queryInpRecipeItem.do",param,function(data){
    	    			$scope.recipeItemList = data.list;
    	    			totalCount(data.list);
    	    		});
	    		}
	    	}
    		//------合计
    		function totalCount(list){
    			var totalCountall=0,totalPriceall=0;
    			$.each(list,function(i,val){
    				totalCountall+=val.totalCount;
    				totalPriceall+=val.totalPrice;
    			});
    			$scope.totalCountall = totalCountall;
    			$scope.totalPriceall = Math.round(totalPriceall*100)/100;
    		}
    		
    		//------发药
    		$scope.dispensing = function(){
	    		var param = {presc_no:$scope.prescNo};
	    		if (!$scope.prescNo){
	    			return;
	    		}
	    		if ($scope.inpOrOutp==1){
		    		HealthDBService.httpPostForm("storeDispensing.do",param,function(data){
		    			if(data.status=='1'){
	    					alert("发药失败，" + data.errorMsg);
	    				}
    	    		});
	    		}else{
		    		HealthDBService.httpPostForm("storeInpDispense.do",param,function(data){
	    				if(data.status=='1'){
	    					alert("发药失败，" + data.errorMsg);
	    				}
    	    		});
	    		}
	    		if (data.status=='0'){
	    			alert("发药成功！");
	    		}
	    		empty();
	    	}
    		//------清空
    		function empty(){
    			if ($scope.prescNo!==""){
    				//------清空明细数据
        			$('#item td').text('');
        			$scope.totalCountall = "";
        			$scope.totalPriceall = "";
        			//------删除主数据
        			document.getElementById('master').deleteRow($scope.index-1);
        			//------
    	    		$scope.prescNo="";
    			}
    			
    		}
    	}
    ]);
});
define(['angular','jquery','services/HealthDBService','directives/radioYesNo'
    ],function(angular, $ ){
    angular.module('app.govEdit',['ngRoute'])
    .config(['$routeProvider' , function($routeProvider){
    	$routeProvider.when("/govEdit",{
        	templateUrl:"govmanage/govEdit.html",
        	controller:"govEditController"
        });
    }])
    .controller("govEditController", ['$rootScope','$scope','$routeParams','$http','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,HealthDBService){
            $scope.govTree = {};
            $scope.govRoutes = [];
            $scope.govChildren = [];
            $scope.one = {};
            //------取机构数据，tree
	    	HealthDBService.httpPostForm("getGovList4Tree.do",null,function(res){
	    		$scope.govList = [];
	    		if(res && res.errmsg){
	    			alert(res.errmsg);
	    		}else{
	    			$scope.govTree = res.list[0];
	    			$scope.govRoutes = [];
	    			$scope.govRoutes.push($scope.govTree);
	    			$scope.govChildren = $scope.govTree.arrGov;
	    		}
	    	});
	    	$scope.clickGov = function(gov){
	    		var inFlag = false;
	    		//----点击的机构是否有子机构，没有的不加入路由
	    		if(gov.arrGov && gov.arrGov.length>0){
		    		//-----机构路由是否已经有
		    		for(var i=0;i<$scope.govRoutes.length;i++){
		    			if($scope.govRoutes[i].nodeid == gov.nodeid){
		    				inFlag = true;
		    				break;
		    			}
		    		}
		    		if(!inFlag){//----
		    			$scope.govRoutes.push(gov);
		    			
		    		}else{
		    			$scope.govRoutes = $scope.govRoutes.slice(0,i+1);
		    		}
		    		//-----下级机构
		    		$scope.govChildren = gov.arrGov;
		    		//-----编辑详细
		    		$scope.editGov(gov);
	    		}
	    	}
	    	$scope.editGov = function(gov){
	    		HealthDBService.httpPostForm("showDepartDetail2.do?station_id="+gov.nodeid,null,function(result){
	    			if(result.errmsg){
    					alert(errmsg);
    				}else{
    					$scope.one = result.hospital;
    				}
	    		})
//	    		$http.get("showDepartDetail2.do?station_id="+gov.nodeid).
//	    			success(function(result){
//	    				if(result.errmsg){
//	    					alert(errmsg);
//	    				}else{
//	    					$scope.one = result.hospital;
//	    				}
//	    			})
	    	}
	    	$scope.commitGov = function(){
	    		var one = $scope.one;
	    		//----转换为提交的数据格式
	    		var obj = {
	    				"PUBLIC_DICT_HOSPITAL_HOSID":one.hosid,
	    				"PUBLIC_DICT_HOSPITAL_HOSNAME":one.hosname,
	    				"PUBLIC_DICT_HOSPITAL_HOSLEVEL":one.hoslevel,
	    				"PUBLIC_DICT_HOSPITAL_HOSCODE":one.hoscode,//机构代码
	    				"PUBLIC_DICT_HOSPITAL_HOSADDR":one.hosaddr, //地址
	    				"PUBLIC_DICT_HOSPITAL_HOSPARENT":one.hosparent,  //父机构
	    				"PUBLIC_DICT_HOSPITAL_DELIVERY":one.hosdelivery,//机构配送编码
	    				"PUBLIC_DICT_HOSPITAL_INSURANCE":one.hosinsurance,//机构医保码
	    				"PUBLIC_DICT_HOSPITAL_HOSREGION":one.hosregion,  //机构所属街道
	    				"PUBLIC_DICT_HOSPITAL_USING_SYSTEM":one.using_system,
    					"PUBLIC_DICT_HOSPITAL_EXIST_REGISTER":one.register,
    					"PUBLIC_DICT_HOSPITAL_MERGE_CHARGE_DRUG":one.merge_charge_drug,
	    				"PUBLIC_DICT_HOSPITAL_USE_BARCODE":one.use_barcode,
	    				"PUBLIC_DICT_HOSPITAL_IS_STOCK_MANAGE":one.is_stock_manage,
	    				"PUBLIC_DICT_HOSPITAL_IS_UPDATE_PRICE":one.is_update_price
	    		}
	    		//----form模式提交
	    		HealthDBService.httpPostForm("editMachine.do",obj);
	    		
	    	}
	    	$scope.editDept = function(){
	    		if(!$scope.one.hosid){
	    			return;
	    		}
	    		//----进行提交
	    		HealthDBService.httpPostForm("showDepartList.do?station_id="+$scope.one.hosid,null,function(res){
	    			//----后台返回的是html，所以在对话框中显示
	    			$rootScope.modalTitle = "科室维护";
	    			$("#myModal .modal-body").html( res);
	    			$("#myModal").modal();
	    		})
	    		
	    	}
	    	$scope.setDept2DrugStore = function(){
	    		if(!$scope.one.hosid){
	    			return;
	    		}
	    		//----进行提交
	    		HealthDBService.httpPostForm("showDrugList.do?station_id="+$scope.one.hosid,null,function(res){
	    			//----后台返回的是html，所以在对话框中显示
	    			$rootScope.modalTitle = "维护";
	    			$("#myModal .modal-body").html( res);
	    			$("#myModal").modal();
	    		})
	    		
	    	}
	    	$scope.setSjptBase = function(){
	    		if(!$scope.one.hosid){
	    			return;
	    		}
	    		//----进行提交
	    		HealthDBService.httpPostForm("showSjptHospital.do?station_id="+$scope.one.hosid,null,function(res){
	    			//----后台返回的是html，所以在对话框中显示
	    			$rootScope.modalTitle = "维护";
	    			$("#myModal .modal-body").html( res);
	    			$("#myModal").modal();
	    		})
	    	}
    	}
    ]);
});
define(['angular','jquery','services/HealthDBService','directives/registerPatient','directives/pinyinCollapse','directives/burkPagination'
    ],function(angular,$){
    angular.module('app.outpcharge',['ngRoute'])
    .config(['$routeProvider' , function($routeProvider){
    	$routeProvider.when("/outpcharge",{
        	templateUrl:"charge/outpcharge.html",
        	controller:"outpchargeController"
        });
    }])
    .controller("outpchargeController", ['$rootScope','$scope','$routeParams','$http','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,HealthDBService){
    		$scope.drugPinyin = {//----输入法控件参数
    				title:"药品目录",
    				dataurl:"searchSjptDrugContents.do",
    				cols: [
         	              {title:"拼音",id:"inpu_code",show:true},
        	              {title:"名称",id:"drug_name",show:true},
        	              {title:"单价",id:"price",show:true},
        	              {title:"规格",id:"drug_spec",show:false},
        	              {title:"隐藏2",id:"yc2",show:false}
        	              ]
    		};
    		$scope.patient = { };
    		$scope.$watch("patient",function(newpat,oldpat){//----更新病人时，初始化页面内容
    			$scope.items = [];
    			$scope.totalCost = 0;
    			$scope.totalCharge = 0;
    			$scope.invoiceNO = "SF0001900100000";
    		});
    		$scope.$watch("inputItem" , function(newItem,oldItem){//---输入法，选中一个记录后
    			if(!newItem){return;}
    			$scope.adding = {
    					item_name:newItem.drug_name,
    					spec:newItem.drug_spec,
    					price:newItem.price
    					};//复制
    		});
    		$scope.deleteItem = function(index){//------删除一个项目
    			var a1 = $scope.items.slice(0,index);
    			var a2 = $scope.items.slice(index+1);
    			$scope.items=a1.concat(a2);
    			cal();
    			
    		};
    	    $scope.addItem = function(item){//----加入一个项目
    	    	if(!item){return;}
    	    	if(!item.item_name){
    	    		alert("未指定项目");
    	    		return;
    	    	}
    	    	if(!item.sl || item.sl<=0){
    	    		alert("数量不正确");
    	    		return;
    	    	}
    	    	var newItem = $.extend({}, item); //---复制
    	    	newItem.itemNO = $scope.items.length + 1;
    	    	$scope.items.push(newItem);
    	    	cal();//---计算金额
    	    	$scope.adding = {};//----输入内容清理
    	    };
    	    function cal(){
    	    	var tmp =0;
    	    	angular.forEach($scope.items,function(one,index){
    	    		tmp += one.charge;
    	    	})
    	    	$scope.totalCost = $scope.totalCharge = tmp;//----合计，应收
    	    }
    	}
    ]);
});
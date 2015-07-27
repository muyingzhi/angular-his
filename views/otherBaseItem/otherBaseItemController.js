define(['angular','jquery','services/HealthDBService','directives/burkPagination'
    ],function(angular,$){
	angular.module("app.otherBaseItemView", ['ngRoute'])
    .config(['$routeProvider' , function($routeProvider){
    	console.log("app.otherBaseItemView config:...")
    	$routeProvider.
                when("/otherBaseItem",{
                	templateUrl:"otherBaseItem/otherBaseItem.html",
                	controller:"otherBaseItemController"
                })
    }])
    .controller("otherBaseItemController", ['$rootScope','$scope','$routeParams','$http','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,HealthDBService){
            $scope.base = {};
            $scope.list = {drug:[],nodrug:[]};
            $scope.pageInfo = {curPage:1,pageItemNumber:10};//分页信息
          
            $scope.drugNew = {};
            $scope.noDrugNew = {};
            $scope.currentType = "drug";
     
            //----获取基本大类数据
            HealthDBService.httpPostForm("dwBaseDirectory.do",null,function(data){
            	if(data.list.length>0){
	            	$scope.baseList = data.list;
	            	$scope.base = data.list[0];
            	}
            });
            $scope.deleteBase = function(base){
            	//----删除大类的操作
            	HealthDBService.httpPostForm("baseDirectoryDelete.do?dw_dirclass_id="+base.dirclass_id,null,function(data){
                	$scope.baseList = data.list;
                });
            }
            $scope.saveBase = function(){
        		//----保存大类
        		var base = $scope.base;
        		if(!base.dw_baseDirectory_name){
        			return;
        		}
        		if(!base.dw_dirclass_id){
        			return;
        		}
        		base.input_code="";
        		base.dw_baseDirectory_memo="";
        		base.dw_baseDirectory_status="1";
        		base.firstKey = "1";
        		HealthDBService.httpPostForm("BaseDirectoryUpdate.do",base,function(data){
                	$scope.baseList = data.list;
                	$scope.adding = false;
                });
            }
            $scope.clickBaseItem = function(base){
            	//----点击一个大类，右侧读取相关药品
            	$scope.base = base;
            	//--------刷新药品数据
            	$scope.changeList("drug");
            }
            //----新增药品或非药品
            $scope.newAdd = function(currentType,base){
            	if(!base || !base.dirclass_id){
            		alert("请先点击左侧大类");
            		return;
            	}
            	//----状态处理
            	if(currentType==="drug"){
                	$scope.drugAdding=true;
                	$scope.nodrugAdding=false;
                	$scope.drugNew={drug_type:"01",drug_name:"新药品",drug_spec:"100ml",dosage_unit:"ml",price:23.5,
                			package_unit:"ml",sales_unit:"ml",sales_relation:1,control_flag:1,using_flag:1};
            	}else{
                	$scope.drugAdding=false;
                	$scope.nodrugAdding=true;
                	$scope.nodrugNew={};
            	}
            };
            //-----改变药品/价表时的处理
            $scope.changeList = function(type){
            	$scope.currentType=type;
            	$scope.list = {};
            	$scope.drugAdding=false;
            	$scope.nodrugAdding=false;
            	if(!$scope.base || !$scope.base.dirclass_id){
            		alert("请先点击左侧大类");
            		return;
            	}
            	var param = {
            			currentPage: 1,
            			recordSize: $scope.pageInfo.pageItemNumber
            	}
            	if(type==="drug"){
            		param.basedirectory_id = $scope.base.dirclass_id;
            		HealthDBService.httpPostForm("searchSjptDrugContents.do",param,function(data){
                		$scope.list['drug']=data.list;
                		$scope.pageInfo = data.pageInfo;//---分页信息；

                	});
            	}else{
            		param.basedirectory_class2 = $scope.base.dirclass_id;
            		HealthDBService.httpPostForm("baseDiagnosisList.do",param,function(data){
                		$scope.list['nodrug']=data.list;
                		$scope.pageInfo = data.pageInfo;//---分页信息；
                	});
            	}
            };
            //-----做数据请求
            function httpDataRequest(type,pagenum){
            	var param = {
            			currentPage: pagenum,
            			recordSize: $scope.pageInfo.pageItemNumber
            	};
            	if(type==="drug"){
            		param.basedirectory_id = $scope.base.dirclass_id;
            		HealthDBService.httpPostForm("searchSjptDrugContents.do",param,function(data){
                		$scope.list['drug']=data.list;
                		$scope.pageInfo = data.pageInfo;//---分页信息；
                	});
            	}else{
            		param.basedirectory_class2 = $scope.base.dirclass_id;
            		HealthDBService.httpPostForm("baseDiagnosisList.do",param,function(data){
                		$scope.list['nodrug']=data.list;
                		$scope.pageInfo = data.pageInfo;//---分页信息；
                		
                	});
            	}
            }
            //----显示指定页
            $scope.pageChange = function(pagenum){
            	httpDataRequest($scope.currentType, pagenum);
            };
            //----下一页、前一页，转换
        	$scope.pageGroupChange = function(fx){
        		var pagenum=0;
        		if(fx==1){
        			//next
        			pagenum = $scope.pageInfo.curPage + 1;
        		}else{
        			pagenum = $scope.pageInfo.curPage - 1;
        		}
        		if(pagenum>$scope.pageInfo.countPageNumber){
        			alert("已经到达最后一页了");
        			return;
        		}if(pagenum<1){
        			alert("已经到达第一页了");
        			return;
        		}
        		httpDataRequest($scope.currentType, pagenum);
        		
        	};
            //----保存新增药品
            $scope.saveNewDrug = function(){
            	var newone = $scope.drugNew;
            	newone.basedirectory_id = $scope.base.dirclass_id;
            	newone.drug_name_alias=newone.drug_name;
            	HealthDBService.httpPostForm("addSjptDrugsContents.do",newone);
            };
            $scope.editDrug = function(drug){
            	$scope.drugAdding=true;
            	$scope.nodrugAdding=false;
            	$scope.drugNew= drug;
            };
           $scope.retrieve = function(pagenum){
        	   
        	   //httpDataRequest($scope.currentType, pagenum);
           };
           $scope.$watch("pageInfo.curPage",function(newNum){
        	   if(newNum>0){
        		   httpDataRequest($scope.currentType, newNum);
        	   }
           })
    	}
    ]);
});
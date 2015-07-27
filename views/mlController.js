define(['controller/controllers','jquery','services/HealthDBService'
    ],function(controllers,$){
    console.log("mlController start...");
    controllers.controller("mlController", ['$rootScope','$scope','$routeParams','$http','$location','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,$location,HealthDBService){
            document.title = $scope.title="工作台";
            $scope.DEBUG = true;
            $scope.loginInfo = window.loginInfo; 
            $scope.menu = [];
            $scope.moreMenu = [];
            $scope.isActive = function(route){
            	return route === $location.path();
            };
            //----读取菜单数据
            $scope.menu = [
                           {id:"m01",label:"门诊",children:[
                                                     {id:"m0101",label:"挂号",action:"#register"}
                                                     ,{id:"m0102",label:"诊疗",action:"/his/clinicCaseHistory.do"}
                                                     ,{id:"m0101",label:"收费",action:"#outpcharge"}
                                                     ]},
                           {id:"m02",label:"住院",children:[
                                                     {id:"m0201",label:"入院登记",action:""}
                                                     ,{id:"m0202",label:"护士站",action:""}
                                                     ,{id:"m0203",label:"医生站",action:""}
                                                     ,{id:"m0204",label:"结算管理",action:""}
                                                          ]},
                           {id:"m03",label:"药房",children:[
                                                     {id:"m0301",label:"处方发药",action:"#dispensing"}
                                                     ,{id:"m0302",label:"摆药",action:""}
                                                     ,{id:"m0303",label:"库存管理",action:""}
                                                     ,{id:"m0303",label:"入库",action:""}
                                                     ,{id:"m0303",label:"出库",action:""}
                                                     ,{id:"m0303",label:"调价",action:""}
                                                          ]},
                          {id:"m04",label:"病历管理",children:[
                                                         {id:"m0301",label:"整理",action:"#dispensing"}
                                                         ,{id:"m0302",label:"模板",action:""}
                                                              ]}
                           ];
            $scope.moreMenu = [
                        {id:"m99",label:"系统管理",children:[
                                         {id:"m9901",label:"机构配置",action:"#govEdit"}
                                         ,{id:"m9902",label:"角色和功能分组",action:"#roleAndGroup"}                 
                                             ]}
                        ];
//            HealthDBService.getTaskInfo(function(menu, moreMenu){
//            	$scope.menu = menu;
//            	$scope.moreMenu = moreMenu;
//            	console.log(menu);
//            	console.log(moreMenu);
//            });
            $scope.clickMenu=function(menuhref){
            	if(menuhref==undefined || menuhref==""){return;}
        		if(menuhref.indexOf("#")>=0){//#开头的是agularjs，直接在url后加上，将会执行mainjs的路由
        			menuhref = menuhref.substr(menuhref.indexOf("#"));
        			var href = document.location.href;
        			if(href.indexOf("#")>=0){
        				href = href.substr(0,href.indexOf("#"));
        			}
        			href = href+menuhref;
        			document.location.href = href;
        		}else{
        			$http({
        				url:menuhref,
        				method:"post"
        			}).success(function(res){
            		    $("#contentDiv").html(res);//执行。do
        			});
        		}
            };
            $scope.signOut = function(){
            	$location.path("/signOut.do");
            };
            $scope.changePwd = function(){
            	HealthDBService.httpPostForm("userUpdatePassWord.do",null,function(res){
            		$("#contentDiv").html(res);
            	});
            }
        }
    ]);
});
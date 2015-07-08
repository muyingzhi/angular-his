define(['angular','jquery','services/HealthDBService','directives/burkPagination','roles/rolesManageDirective'
    ],function(angular , $){
	angular.module('app.rolesAndGroup',['ngRoute','app.directive.rolesManage'])
    .config(['$routeProvider' , function($routeProvider){
    	$routeProvider.when("/roleAndGroup",{
        	templateUrl:"views/roles/rolesAndGroup.html",
        	controller:"rolesAndGroupController"
        });
    }])
    .controller("rolesAndGroupController", ['$rootScope','$scope','$routeParams','$http','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,HealthDBService){

			var pnum=10;//---每组显示分页数
            $scope.firstMenuList = [];
            $scope.rolelist = [];
            
          //----单元：获取一级菜单 和 叶子结点
            HealthDBService.httpPostForm("taskInfoAllModule.do",null,function(xmlstr){
            	var xmldoc = $.parseXML(xmlstr);
            	var $xml = $(xmldoc);
            	var taskModel = $xml.find("TaskModel");
            	var allTask = readTask(taskModel);//----树形结构的菜单项
            	
            	$scope.firstMenuList = allTask;
            		
            	function readTask(taskModel){
            		var result = [];
	            	var taskGroup = taskModel.children();
	            	if(taskGroup){
	            		for(var i=0;i<taskGroup.length;i++){
	            			var t = taskGroup[i];
	            			var obj = {};
	            			//------设置id，label，action
	            			for(var ai = 0; ai<t.attributes.length; ai++ ){
	            				obj[t.attributes[ai].nodeName]=t.attributes[ai].nodeValue;
	            			}
	            			if(t.nodeName=="TaskGroup"){
	            				//递归
	            				obj.children = readTask($(t));
	            			}else if(t.nodeName=="TaskInfo"){
	            				//---叶子
	            				
	            			}
	            			result.push(obj);
	            		}
	            	}
	            	return result;
            	}
            });
            $scope.clickGroup = function(group){
            	if(group.children && group.children.length>0){
            		$scope.tmpGroupList = $scope.cloneArray(group.children);
                	$scope.breadGroup = group;
            	}
            }

            $scope.clickMenu = function(menu){
            	if(menu.children && menu.children.length>0){
            		$scope.tmpMenuList = $scope.cloneArray(menu.children);
                	$scope.breadMenu = menu;
            	}
            }
            $scope.cloneArray = function(a){
            	var rtn=[];
            	for(var i=0;i<a.length;i++){
            		rtn.push(a[i]);
            	}
            	return rtn;
            };
            //---
            $scope.clickRole = function(){
            	var role = $scope.oneRole;
            	$scope.currentRole = {};
            	$scope.breadGroup = {};
            	if(!role){return;}
            	$scope.currentRole = role;
            	HealthDBService.httpPostForm("getRoleMenuList.do",{EMP_ROLE_ID:role.id}, function(data){
            		//-----获得的数据是表记录的列表，两层菜单数据；没有树形化处理；
            		var tmp = [];
            		for(var i = 0;i<data.list.length;i++ ){
            			
            			var one = data.list[i];
            			if (one.menu1_id=="manage"){
            				one.menu1_id="manage";
            			}
            			//------------找到一级菜单名称
            			var m1= findModuleLabel ($scope.firstMenuList, one.menu1_id);
            			//---找到二级菜单
            			var m2= findModuleLabel ($scope.firstMenuList, one.menu2_id);
            			if(!m1){
            				m1 = {id:one.menu1_id, label:"*未对应"};
            			}
                    	if(!m2){
                    		m2 = {id: one.menu2_id, label:"*未对应" };
                    	}
            			
            			m1.children = [];
            			//----one一级菜单是否已经在目标数组tmp中；在的，加入其children；
                		var isnew=true;
            			for(var j=0; j<tmp.length; j++){
            				if(m1.id == tmp[j].id){
            					tmp[j].children.push(m2);//----重复的，把单元写入children
            					isnew = false;
            					break;
            				}
            			}
            			if(isnew){//----第一次被发现的一级菜单
            				//if(m2){//----加入其子菜单
                				//one.children.push(m2);
                				m1.children.push(m2);
                			//}
            				tmp.push(m1);//----加入目标tmp中
            			}
            		}
            		$scope.groupList = $scope.cloneArray(tmp);
            		$scope.tmpGroupList = $scope.cloneArray(tmp);
            	});
            }
            //---在list数组及其子项children中查找id对应的label
            function findModuleLabel(list,id){
            	var rtn;
            	for(var i=0; i<list.length; i++){
            		console.log(i+":"+list[i].id + " -- " + id);
            		if(list[i].id == id){
            			console.log("----------------ok");
            			rtn =  {id:list[i].id,label:list[i].label,action:list[i].action};
            			break;
            		}else{
	            		var children = list[i].children;
	            		if(children && children.length>0){
	            			//---有子，迭代
	            			rtn = findModuleLabel(children, id );
	            			if(rtn){
	            				break;
	            			}
	            		}
            		}
            	}
            	return rtn;
            }
            //---
    }
    ]);
});
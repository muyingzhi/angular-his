define(['controller/controllers','jquery','services/HealthDBService'
    ],function(controllers,$){
    console.log("mlController start...");
    controllers.controller("mlController", ['$rootScope','$scope','$routeParams','$http','$location','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,$location,HealthDBService){
            document.title = $scope.title="工作台";
            $scope.loginInfo = window.loginInfo; 
            $scope.menu = [];
            $scope.moreMenu = [];
            $scope.isActive = function(route){
            	return route === $location.path();
            };
            $http({
            	url:"taskInfo.do",
            	method:"get"
            }).success(function(xmlstr){
            	var xmldoc = $.parseXML(xmlstr);
            	var $xml = $(xmldoc);
            	var taskModel = $xml.find("TaskModel");
            	var allTask = readTask(taskModel);//----树形结构的菜单项
            	//-----为了顶端长度的控制，做如下处理；
            	for(var i=0;i<allTask.length;i++){
            		if(i<6){
            			$scope.menu.push(allTask[i]);
            		}else{
            			$scope.moreMenu.push(allTask[i]);
            		}
            	}
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
            	return;
            	}
            );
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
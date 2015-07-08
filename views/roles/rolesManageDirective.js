define(['angular','jquery','services/HealthDBService'
    ],function(angular , $){
	angular.module('app.directive.rolesManage',['services'])
    .directive("rolesManage", function(_HealthDBService_){
    		return{
    			scope:{
    				listData:"=rolesList",
    				oneRole:"=",
    				onChangeRole:"&"
    			}
    			,templateUrl:"views/roles/rolesManageDirective.html"
    			,link:function(scope){
    				//----角色列表
    	            _HealthDBService_.httpPostForm("listRoles2Json.do",null,function(data){
    	            	scope.listData = data.list;
    	            });
    				scope.clickRole = function(role,index){
    					scope.nowrow = index;
        					scope.oneRole = role;
        					scope.onChangeRole();
    				}
    			}
    		}//---return End
    	}//---function End
    );//----directive End
});
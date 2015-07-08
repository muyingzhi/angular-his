//----------主要用来设置初始化参数等；app.config()
console.log("app...");
define(['angular','jquery', 'mlController'
        ,'controller/controllers'
        ,'login/loginController'
        ,'main/mainController'
        ,'common/editUserController'
        ,'services/services','directives/directives'
        ,'otherBaseItem/otherBaseItemController'
        ,'govmanage/govEditController'
        ,'roles/rolesAndGroupController'
        ,'drugstore/dispensingController'
        ,'charge/outpchargeController'
	],
	function(angular,$){
    //--------------依赖的模块
	console.log("app 构建...");
    var app = angular.module("app",["controllers","services",'directives','ngRoute'
                                    ,'app.login'
                                    ,'app.main'
                                    ,'app.editUser'
                                    ,'app.otherBaseItemView'
                                    ,'app.govEdit'
                                    ,'app.rolesAndGroup'
                                    ,'app.dispensing'
                                    ,'app.outpcharge'
                                    ]);
    app.config(['$routeProvider',function($routeProvider){
    	$routeProvider.
    		when("/first",{
    			templateUrl:"views/main/first.html",
    			controller:""
    	})
    	.otherwise({
    		redirectTo:"/first"
    	});
    }]);
    //-----http请求发起，显示#httpMsg,应答后，隐藏#httpMsg
    app.config(['$httpProvider',function ($httpProvider) {
		$httpProvider.defaults.transformRequest.push(function (data, headersGetter) {
    		angular.element('#httpMsg').show(500);
    		return data;
		});
		$httpProvider.defaults.transformResponse.push(function (data, headersGetter) {
			angular.element('#httpMsg').hide(100);
    		return data;
		});
	}]);
    return app;
});
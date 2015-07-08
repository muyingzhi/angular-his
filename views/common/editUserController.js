define(['angular','jquery'],function(angular , $){
	angular.module('app.editUser',['ngRoute'])
    .config(['$routeProvider' , function($routeProvider){
    	$routeProvider
    	.when("/userEdit",{
            templateUrl:"views/common/editUser.html",
            controller:"editUserController"
        });
    }])
    .controller("editUserController", ['$rootScope','$scope','$http','$location',
        function($rootScope,$scope,$http,$location){
            document.title = $scope.title="注册用户";
            //---------设置顶端菜单
            $rootScope.topNav = [
            ];
            $scope.saveUser = function(){
                $http.post("saveUser",$scope.user)
                .success(function(data,status,headers,config){
                    $scope.result4save = {code:1,message:"注册成功"};
                });
            };
            $scope.reset = function(){
                $scope.user = {};
                $scope.result4save = "";
            };
        }
    ]);
})
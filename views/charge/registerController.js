define(['angular','jquery','services/HealthDBService','directives/registerPatient','directives/pinyinCollapse','directives/burkPagination'
    ],function(angular,$){
    angular.module('app.register',['ngRoute'])
    .config(['$routeProvider' , function($routeProvider){
    	$routeProvider.when("/register",{
        	templateUrl:"charge/register.html",
        	controller:"registerController"
        });
    }])
    .controller("registerController", ['$rootScope','$scope','$routeParams','$http','HealthDBService',
        function($rootScope,$scope,$routeParams,$http,HealthDBService){
    		
    		$scope.patient = { };
    		
    	}
    ]);
});
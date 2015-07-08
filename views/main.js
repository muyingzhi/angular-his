//----主要用来设置“前端路由”
require.config({
	baseUrl:"",
    paths:{
        jquery:  'vendor/jquery/dist/jquery.min',
        angular: 'vendor/angular/angular',
        angularRoute: 'vendor/angular-route/angular-route',
        respond: 'vendor/javascripts/respond.min',
        domReady:"vendor/javascripts/domReady",
        twitter: "vendor/javascripts/bootstrap.min",
        indexedDB:"vendor/javascripts/indexeddb"
    },
    shim:{
        'twitter' : {
            deps : ['jquery','respond']
        }
        ,angular:{
            deps:['jquery','twitter'],
            exports:'angular'
        }
        ,angularRoute:{
        	deps:['angular']
        }
        ,indexedDB : {
            deps : ['angular']
        }
    }
});
require([  'angular','angularRoute','app'  ] , function(angular,ngRoute,app){
	    'use strict';
	    //----加载样式文件
//        addStyle("views/vendor/stylesheets/bootstrap.min.css"); 
//        addStyle("views/vendor/stylesheets/dropdownMenu.css");
	    //----设置ng-app给<body>
	    angular.element(document).ready(function(){
	        angular.bootstrap("body",["app"]);
        });
	    //-----内置函数，加载样式
	    function addStyle(stylePath) {
            var container = document.getElementsByTagName("head")[0];
            var addStyle = document.createElement("link");
            addStyle.rel = "stylesheet";
            addStyle.type = "text/css";
            addStyle.media = "screen";
            addStyle.href = stylePath;
            container.appendChild(addStyle);
        }
    }
);

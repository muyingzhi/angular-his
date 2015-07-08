//---将 spec.js 或者 test.js 结尾的文件去掉后缀，实际上为模块化测试文件，后续使用 requirejs 加载
var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});
//----主要用来设置“前端路由”
require.config({
  baseUrl:"/base",
  paths:{
    jquery:  'vendor/jquery-1.11.3.min',
    angular: 'vendor/angular/angular.min',
    angularRoute: 'vendor/angular-route/angular-route.min',
    angularMocks: 'vendor/angular-mocks/angular-mocks',
    domReady:"vendor/javascripts/domReady",
    twitter: "vendor/javascripts/bootstrap.min",
    indexedDB:"vendor/javascripts/indexeddb"
  },
  deps: allTestFiles,
  shim:{
    'twitter' : {
      deps : ['jquery']
    }
    ,
      angular:{
      deps:['jquery','twitter'],
      exports:'angular'
    }
    ,angularRoute : {
      deps : ['angular']
    }
    ,angularMocks : {
      deps : ['angular']
    }
    ,indexedDB : {
      deps : ['angular']
    }
  },
  callback: window.__karma__.start
});
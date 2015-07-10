define(['jquery','services/services'],function($,services){
	services.factory("HttpInterceptor",function($q){
		var interceptor = {
				'request' : function(config){
					angular.element('#httpMsg').show(500);
					//console.log("HTTP request:" + config.url);
		    		return config;
				},
				'response': function(config){
					angular.element('#httpMsg').hide(100);
		    		return config;
				},
				'responseError': function(rejection){
					if (rejection.status === 401) {
						alert("访问("+rejection.config.url+")错误("+rejection.status+")："+"拒绝访问");
			    	} else if (rejection.status >= 400 && rejection.status < 500) {
			    		alert("访问("+rejection.config.url+")错误("+rejection.status+")："+rejection.statusText);
			    	}
					return $q.reject(rejection);
				}
		}
		return interceptor;
	});
});
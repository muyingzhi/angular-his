define(['directives/directives'],function(directives){
        directives.directive('radioYesNo',[function(){
	        return {
	            restrict:"EA",
                scope :{
                    ngModel:"=",
                    id:"@",
                    name:"@"
                },
                template : '<span ng-repeat="item in datas">' +
                        '<input id="{{id}}" name="{{name}}"type="radio" value="{{item.id}}" ng-click="click(item.id)" ng-checked="ngModel==item.id">{{item.text}}' +
                        '</span>',
	            replace:true,
                link : function(scope){
                    scope.datas = [{id:"1",text:"是"},{id:"0",text:"否"}];
                    scope.click = function(code){
                        scope.ngModel = code;
                    }
                }
	        };
	    }]);
    }
);

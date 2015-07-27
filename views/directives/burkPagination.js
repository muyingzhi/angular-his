/*指令burkPagination,实现分页模块的渲染显示
1、html引用方法：
html中加入<burk-pagination ng-model="pageInfo" ></burk-pagination>
2、controller中引用'directives/burkPagination'
	其中检索数据成功后，需提供分页信息给pageInfo，比如：执行$scope.pageInfo = data.pageInfo;
	另外当分页中点击时，改变pageInfo.curPage的值，
	要求使用此指令的controller中$watch("pageInfo.curPage"),并按请求页获取数据
	pageInfo = {curPage:1, //当前页
						countPageNumber:0, //总页数,
						pageItemNumber:10, //每页记录数
						sumItemNumber: 0 }//总记录数
*/
define(['directives/directives'],function(directives){
        directives.directive('burkPagination',[function(){
	        return {
	            restrict:"EA",
                scope :{
                    ngModel:"="
                },
                templateUrl:"directives/templates/burkPagination.html",
	            replace:true,
	            require:'ngModel',
                link : function(scope,ele,attrs,c){
                    //----有变化时执行
                    scope.$watch("ngModel",function(){
                    	if(!scope.ngModel){
                    		scope.ngModel = {};
                    	}
                    	scope.ngModel.pageItems = [];
                    	var ngModel = scope.ngModel;
                    	var startPage = 2; 
                    	var showNum = 5;
                    	if(!ngModel || !ngModel.countPageNumber){return;}
                    	//-----一次显示(首页、尾页、中间从2开始最多7页)
                    	//---当前页及前面的
                    	startPage = ngModel.curPage - showNum >1? ngModel.curPage - showNum + 1 : 2 ;
                    	for(var i = startPage; i<=ngModel.curPage;i++){
                    		if(scope.ngModel.pageItems.length< showNum  && i<ngModel.countPageNumber){
                    			scope.ngModel.pageItems.push({text:i, num:i });
                    		}else{
                    			break;
                    		}
                    	}
                    	//----当前页后面的
                    	for(var i = ngModel.curPage+1;i<ngModel.countPageNumber;i++){
                    		if(scope.ngModel.pageItems.length< showNum ){
                    			scope.ngModel.pageItems.push({text:i, num:i });
                    		}else{
                    			break;
                    		}
                    	}
                    });
                    scope.pageChange = function(pagenum){
                    	scope.ngModel.curPage = pagenum;
                    };
                    //----下一页、前一页，转换
                	scope.pageGroupChange = function(fx){
                		var pagenum=0;
                		if(fx==1){
                			//next
                			pagenum = scope.ngModel.curPage + 1;
                		}else{
                			pagenum = scope.ngModel.curPage - 1;
                		}
                		if(pagenum>scope.ngModel.countPageNumber){
                			//alert("已经到达最后一页了");
                			return;
                		}if(pagenum<1){
                			//alert("已经到达第一页了");
                			return;
                		}
                		scope.ngModel.curPage = pagenum;
                	};
                }
	        };
	    }]);
    }
);
/*指令RegisterPatient,完成病人注册或挂号
1、html引用方法：
html中加入
	<pinyin-collapse selectedItem="xxxx" ></pinyin-collapse>
	这是<div class="row"></div>,其中还包括一个按钮、一个病人信息显示，和一个modal的编辑窗口
2、controller中引用'directives/registerPatient'
	ngModel:与控制器交互的数据对象patient；
	  在指令中选中一个人后执行：为ngModel=设置此人，onSelected()函数（实现 控制器的getOnePatient()函数的运行）；
*/
define(['directives/directives','services/HealthDBService'],function(directives){
        directives.directive('pinyinCollapse',['HealthDBService',function(HealthDBService){
	        return {
	            restrict:"EA",
                scope :{
                	selectedItem:"=",
                	cols:"=",
                	title:"=",
                	datasUrl:"="
                },
                templateUrl:"directives/templates/pinyinCollapse.html",
	            replace:true,
                link : function(scope,ele,attrs,c){
                	scope.row=0;
                    if(scope.$parent.$parent.DEBUG){
                       	scope.title = "价表项目";
                       	scope.list=[ 
                       	             {pinyin:"XCG",item_name:"血常规", price:22.1 ,spec:'/', yc2:222},
                       	             {pinyin:"NGG",item_name:"尿常规", price:22.1 ,spec:'/', yc2:222},
                       	             {pinyin:"SHQX",item_name:"生化全项", price:22.1 ,spec:'/', yc2:222},
                       	             {pinyin:"XZ",item_name:"血脂", price:22.1 ,spec:'/', yc2:222},
                       	             {pinyin:"XT",item_name:"血糖", price:22.1 ,spec:'/', yc2:222}];
                       	scope.cols = [
                       	              {title:"拼音",id:"pinyin",show:true},
                       	              {title:"名称",id:"item_name",show:true},
                       	              {title:"单价",id:"price",show:true},
                       	              {title:"规格",id:"spec",show:false},
                       	              {title:"隐藏2",id:"yc2",show:false}
                       	              ]
                    }
                	scope.pageInfo = {curPage:1, //当前页
    						countPageNumber:1, //总页数,
    						pageItemNumber:10, //每页记录数
    						sumItemNumber: 1//总记录数
    						};
                  //-----做数据请求
                    function httpDataRequest(pagenum){
                    	var param = {
                    			currentPage: pagenum,
                    			recordSize: scope.pageInfo.pageItemNumber
                    	};
                		HealthDBService.httpPostForm(scope.datasUrl,param,function(data){
                    		scope.list=data.list;
                    		scope.pageInfo = data.pageInfo;//---分页信息；
                    	});
                    }
                    //----页码变化，更新请求
                    if(!(scope.$parent 
                        && scope.$parent.$parent 
                        && scope.$parent.$parent.DEBUG)){
                        scope.$watch("pageInfo.curPage",function(newNum){
                     	   if(newNum>0){
                     		   httpDataRequest(newNum);
                     	   }
                        });
                    }
                	//----输入框获得焦点时，显示数据列表区域
                	ele.find("input").bind("focusin",function(){
                		setCollapse();
                		ele.find(".collapse").collapse('show');
                	});
                	//----取消
                	scope.doCancle = function(){
                		ele.find(".collapse").collapse('hide');
                	};
                	//---点击选中一个
                	scope.clickItem = function(item){
                		scope.selectedItem = $.extend({},item);
                		//----状态初始
                		scope.pinyin = "";
                		scope.row = 0;
                		ele.find(".collapse").collapse('hide');
                	};
                	scope.clickRow = function(index){
                		scope.row = index;
                	}
                	//---设置数据列表区域的位置（在输入框的下边）
                	function setCollapse(){
                		var p = ele.find("input").position();
                		var h = ele.find("input").outerHeight();
                		ele.find(".collapse").css({top:(p.top+h)+"px",left:p.left+"px"});
                	}
                }
	        };
	    }]);
    }
);
/*指令RegisterPatient,完成病人注册或挂号
1、html引用方法：
html中加入
	<register-patient  patient="patient"></register-patient>
	这是<div class="row"></div>,其中还包括一个按钮、一个病人信息显示，和一个modal的编辑窗口
2、controller中引用'directives/registerPatient'
	ngModel:与控制器交互的数据对象patient；
	  在指令中选中一个人后执行：为ngModel=设置此人，onSelected()函数（实现 控制器的getOnePatient()函数的运行）；
*/
define(['directives/directives'],function(directives){
        directives.directive('registerPatient',[function(){
	        return {
	            restrict:"EA",
                scope :{
                    patient:"="
                },
                templateUrl:"views/directives/templates/registerPatient.html",
	            replace:true,
                link : function(scope,ele,attrs,c){
                	//scope.patient = scope.ngModel;
                	scope.patientsList = [
                	                      {name:"张三",sex:"男",age:"22",regDate:"2015-01-01",pid:"001"},
                	                      {name:"张三1",sex:"男",age:"23",regDate:"2015-01-01",pid:"002"},
                	                      {name:"张三2",sex:"男",age:"24",regDate:"2015-01-01",pid:"003"},
                	                      {name:"张三3",sex:"男",age:"25",regDate:"2015-01-01",pid:"004"}
                	                      ]
                    //----打开注册窗口
                    scope.openRegister = function(){
                    	ele.find(".modal").modal({show:true});
                    };
                    //----选中一个
                   scope.doThisPatient = function(patient){
                	   if(!patient || !patient.name){return}
                	   scope.patient = patient;

                	   ele.find(".modal").modal('toggle');
                   };
                }
	        };
	    }]);
    }
);
define(['jquery','services/services'],function($,services){
	var http ;
	var HealthDB = function($http){
		http = $http;
	};
	HealthDB.prototype.listHospital = function(){
		return http.post("../getHospitals");
	};
	HealthDB.prototype.listDeptDict = function(){
		return ["内科","外科","儿科","妇科","中医科","康复科"];
	}
	HealthDB.prototype.saveHospital = function(hospital){
		return http.post("../saveHospital", hospital);
	}
	HealthDB.prototype.govList = function(){
		return http.post("getGovList4Tree.do");
	}
	//----------------------------
	HealthDB.prototype.httpPostForm = function(url,data,callback){
		//----form模式提交
		var transform = function(data,getHeaders){
			var headers = getHeaders();
			headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8";
		    return $.param(data);
		};
		var options = {
				url:url,
				method:"post"
		};
		if(data){
			options.data = data;
			options.transformRequest = transform;
		}
		//----进行提交
		http(options)
		.success(function(data,code,getHeaders,a){
			var headers = getHeaders();
			if(headers["content-type"]=="application/json;charset=UTF-8"){
				//----返回的是json
				if(callback){
					callback(data);//---有回调函数的，交给其处理；
				}
			}else{
				//----后台返回的是html，所以在对话框中显示
				if(callback){
					callback(data);//---有回调函数的，交给其处理；
				}else{
					//----这里直接输出html，为了避免有js错误而不能显示；正确的做法应该是用callback自己写处理；
					$("#myModal .modal-body")[0].innerHTML = data;
					$("#myModalLabel").html("");
					$("#myModal").modal();
				}
			}
		}).error(function(data){
			alert("HealthDBService Error:");
		});
	};
	//--------------------------取权限功能列表
	HealthDB.prototype.getTaskInfoByRoleID = function(roleid,callback){
		var param = {};

		if(!callback){
			alert("取权限功能列表处理中，没有回调函数，请修改。")
			return;
		}
		if(roleid){
			param = {roleid: roleid};
		}else{
			param = null;
		}
		httpPostForm("taskInfo.do", param ,function(xmlstr){
	    		var parser = new DOMParser();
	    		var xmldom = parser.parseFromString(xmlstr,"text/xml");
	    		var taskModel = xmldom.documentElement;
	    		var children = taskModel.children;
	    		var resultMenu = [];
	    		for(var i = 0;i<children.length;i++){
	    			//---一级
	    			var obj = children[i];
	    			var m1 = {label:obj.attributes.label.value,
	    					action:obj.attributes.action?obj.attributes.action.value:"",
	    					children:[]};
	    			if(obj.children.length>0){
	        			for(var j=0;j<obj.children.length;j++){
	        				//----二级
	        				var obj2 = obj.children[j];
	        				var m2 = {label:obj2.attributes.label.value,
	            					action:obj2.attributes.action?obj2.attributes.action.value:"",
	                    					children:[]}
	        				if(obj2.children.length>0){
	        					for(var k=0;k<obj2.children.length;k++){
	        						//----三级
	        						var obj3 = obj2.children[k];
	        						var m3 = {label:obj3.attributes.label.value,
		                					action:obj3.attributes.action?obj3.attributes.action.value:"",
		                        					children:[]};
	        						m2.children.push(m3);
	        					}
	        				}
	        				m1.children.push(m2);
	        			}
	    			}
	    			resultMenu.push(m1);
	            }
	    		callback(resultMenu);
	    	}
	    );
	};
	
	services.service("HealthDBService",['$http',HealthDB]);
});
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
		}).error(function(response,status,headers,datas){
			alert("HealthDBService 处理请求失败:("+status+")"+datas.url);
		});
	};
	//--------------------------取权限功能列表
	HealthDB.prototype.getTaskInfo= function(callback){
		var menu=[],moreMenu=[];
		http({
	    	url:"taskInfo.do",
	    	method:"get"
	    }).success(function(xmlstr){
	    	var xmldoc = $.parseXML(xmlstr);
	    	var $xml = $(xmldoc);
	    	var taskModel = $xml.find("TaskModel");
	    	var allTask = readTask(taskModel);//----树形结构的菜单项
	    	//-----为了顶端长度的控制，做如下处理；
	    	for(var i=0;i<allTask.length;i++){
	    		if(i<6){
	    			menu.push(allTask[i]);
	    		}else{
	    			moreMenu.push(allTask[i]);
	    		}
	    	}
	    	callback(menu, moreMenu);
	    });
    	function readTask(taskModel){
    		var result = [];
        	var taskGroup = taskModel.children();
        	if(taskGroup){
        		for(var i=0;i<taskGroup.length;i++){
        			var t = taskGroup[i];
        			var obj = {};
        			//------设置id，label，action
        			for(var ai = 0; ai<t.attributes.length; ai++ ){
        				obj[t.attributes[ai].nodeName]=t.attributes[ai].nodeValue;
        			}
        			if(t.nodeName=="TaskGroup"){
        				//递归
        				obj.children = readTask($(t));
        			}else if(t.nodeName=="TaskInfo"){
        				//---叶子
        			}
        			result.push(obj);
        		}
        	}
        	return result;
    	}
	};
	
	services.service("HealthDBService",['$http',HealthDB]);
});
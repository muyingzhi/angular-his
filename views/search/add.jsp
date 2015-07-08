<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page pageEncoding="UTF-8" %>
<html>
  <head>
    <title>编辑详细内容</title>
		<style type="text/css" media="all">
			@import url("<c:url value='/resources/css/display/site.css'/>");
			@import url("<c:url value='/resources/css/display/screen.css'/>");
		</style> 
		<link href="<c:url value='/resources/css/uploadify.css'/>" type="text/css" rel="stylesheet" />
		<script type="text/javascript" src="<c:url value='/resources/js/jquery-1.6.2.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/json.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/jquery.uploadify-3.1.min.js'/>"></script>
		<script type="text/javascript">
		
			$(document).ready(function() {

				$("#disease").submit(function() {
					if($("#diseaseName").val() == ""){
						alert("疾病名称不能为空!");
						return false;
						
					}
					var disease = $(this).serializeObject();
					$.postJSON("<c:url value='/disease'/>", disease, function(data) {
						$("#id").val(data.id);
						alert("保存成功!");
					});
					return false;				
				});
				$("#file_upload").uploadify({
					swf           : '<c:url value='/resources/js/uploadify.swf'/>',
					uploader      : '<c:url value='/fileup/one'/>',
					'cancelImg' : "<c:url value='/resources/images/uploadify-cancel.png'/>",
					removeTimeout : 0,
					file_post_name : "file",
					onUploadSuccess : function(file,data,response){
						$("#files").val($("#files").val()+"<img src='"+data+"' alt=''/>\r\n");
					}
				});
			
				$("#diseasesubFrm").submit(function() {
					var did = $("#disease #id").val();
					$("#warnMessage > font").remove();
				    var warnMessage="";
				    try{
					if(did == 0){
						warnMessage=$('<font color="red" class="STYLE9">请先添加疾病！</font>');
						$("#warnMessage").append(warnMessage);
						return false;
					}

					var patrn=/^[0-9]*[1-9][0-9]*$/;
					if($("#seq").val() != 0 && !patrn.exec($("#seq").val())){
						warnMessage=$('<font color="red" class="STYLE9">序列号只能为正整数！</font>');
						$("#warnMessage").append(warnMessage);
						return false;
					}
					
					if($("#seq").val().length > 3){
						warnMessage=$('<font color="red" class="STYLE9">序列号过长，请重新填写！</font>');
						$("#warnMessage").append(warnMessage);
						return false;
					}
					if($("#content").val().length > 2000){
						warnMessage=$('<font color="red" class="STYLE9">填写内容过多，请重新填写！</font>');
						$("#warnMessage").append(warnMessage);
						return false;
					}
					}catch(e){alert(e);}
					$("#diseaseId").val(did);
					var disease = $(this).serializeObject();
					$.postJSON("<c:url value='/disease/sub'/>", disease, function(data) {
						$("#diseasesubFrm #id").val(data.id);
						
						alert("保存成功!");
						$("#newForm").attr("action","<c:url value='/disease'/>/"+did +"-${disease.catalogId}");
						$("#newForm").submit();
					});
					return false;				
				});
				
				$(window).scroll(function() {   // 页面发生scroll事件时触发  
		            var bodyTop = bodyTop = document.documentElement.scrollTop + document.body.scrollTop;
	             	$("#treeboxbox_tree2").css("top",25 + bodyTop);
       			}); 
			});
			// 点击节点事件
			function doOnClickHandler(id,n){
					
					var diseaseIdValue = $("#disease #id").val();
					window.location.hash=id+"_anchor";
					
					var seq = $("#"+id+"_table table").length;
				
					$("#subDiseaseId").val("")
					$("#content").val("");
					$("#seq").val(seq+1);
					$("#fieldId").val(n);
					
					$("#newDisease").insertAfter("#"+id);
					//设置锚点
					$("#content").focus();
					$("#newDisease").show();
			}
			
			function editDisease(subDiseaseId){
				$("#warnMessage > font").remove();
				$("#diseasesubFrm #id").val($("#"+subDiseaseId+"_id").val());
				$("#diseaseId").val($("#"+subDiseaseId+"_diseaseId").val());
				$("#mainKey").val($("#"+subDiseaseId+"_labelTopic").val());
				$("#content").val($("#"+subDiseaseId+"_content").val());
				$("#titleName").val($("#"+subDiseaseId+"_titleName").val());
				$("#seq").val($("#"+subDiseaseId+"_sequenceNum").val());
				$("#fieldId").val($("#"+subDiseaseId+"_fieldId").val());
				
				$("#newDisease").show();
				$("#content").focus();
				//调整位置
				$("#newDisease").insertAfter("#"+subDiseaseId+"_tr");
					
				//设置锚点
				$("#content").focus()
			}
			
			function doDelSubDisease(subDiseaseId){
				if(!confirm("删除后数据不可恢复，确认删除吗？")){
					return;
				}
				
				$.get("<c:url value='/disease/sub/'/>"+subDiseaseId,
				  function(data){
				    	$("#"+subDiseaseId+"_tr").remove();
				    	$("#newDisease").hide();
				  });
			}
			
			function gotoList(){
				
				top.location = "<c:url value='/search/${disease.catalogId}'/>";
			}
			
		</script>
  </head>
  <body>
 <% 
    request.setAttribute("vEnter", "\n");   
    
%>
  <c:set var="ctx" value="${pageContext.request.contextPath}"/>
   <form action="${ctx}/disease/2100-1" id="newForm"></form>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td width="20%" valign="top">
					<div id="field_tree">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td align="center" valign="top">
									<div id="treeboxbox_tree2" style="overflow: auto;">
										<ul style="list-style:none;font-style:oblique;font-size:xx-large">
										<c:choose>
											<c:when test="${empty(list1)}">
												<li onclick="doOnClickHandler('000',0)">点击新增</li>
											</c:when>
											<c:otherwise>
												<c:forEach items="${list1}" var="e">
													<li onclick="doOnClickHandler('${e.code}',${e.id})">${e.name}</li>
												</c:forEach>											
											</c:otherwise>
										</c:choose>

										</ul>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</td>
				<td width="75%" valign="top" align="center">
					<form:form modelAttribute="disease" action="disease" method="post">
					<form:hidden path="id"/>
					<form:hidden path="catalogId"/>
				  
					<table width="95%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="46" >
								
							</td>
							<td align="center">
								<table width="95%" border="0" cellspacing="0" cellpadding="0">
									<tr align="left">
										<td width="12%">
											<span class="STYLE11"> 疾病名称</span>
										</td>
										<td width="20%">
											<span class="STYLE11">
											<form:input  path="diseaseName" maxlength="50"/> 
											</span>
										</td>
										<td width="12%">
											<span class="STYLE11"> 疾病别名</span>
										</td>
										<td width="20%">
											<span class="STYLE11">
											<form:input  path="aliasName" maxlength="100"/> 
											</span>
										</td>										
										<c:choose>
											<c:when test="${disease.catalogId == 2 || disease.catalogId == 4 || disease.catalogId == 5}">
												<td width="8%" class="STYLE11">
													科 室
												</td>
												<td width="12%">
													<form:select path="dept">
														<form:options items="${list}" itemLabel="name" itemValue="id"/>
													</form:select>
												</td>												
											</c:when>
											<c:otherwise>
												<input type="hidden" value="0" name="dept"/>
											</c:otherwise>
										</c:choose>
										<td width="30%">
										<input value="提交" type="submit"/>
										<input value="返回" type="button" onclick="gotoList();"/>
										</td>
									</tr>
								</table>
							</td>
							<td width="18" >
							</td>
						</tr>
					</table>
					</form:form>
					<c:if test="${empty(list1)}">
						<div id="000" style="display: ">
							<a name="000_anchor"></a>
							<input type="hidden" id="000_name" value="000">
							<table width="95%" border="0" cellspacing="0" cellpadding="0">
								<tbody id="000_table">
								<tr>
									<td>
										<c:forEach items="${list2}" var="e1">
											<c:if test="${0 == e1.fieldId}">
												<table id="${e1.id}_tr" width="95%" border="0" cellspacing="0" cellpadding="0">
													<tr align="left">
														<td>${e1.titleName}</td>
													</tr>	
													<tr align="left">
														<td>${fn:replace(fn:replace(e1.content,vEnter,"<br/>"),".imgPath.",imgPath)}
														<input type="hidden" id="${e1.id}_id" value="${e1.id}"/>
														<input type="hidden" id="${e1.id}_titleName" value="${e1.titleName}"/>
														<input type="hidden" id="${e1.id}_content" value="${e1.content}"/>
														<input type="hidden" id="${e1.id}_fieldId" value="${e1.fieldId}"/>
														<input type="hidden" id="${e1.id}_imgFile" value="${e1.imgFile}"/>
														<input type="hidden" id="${e1.id}_labelTopic" value="${e1.labelTopic}"/>
														<input type="hidden" id="${e1.id}_sequenceNum" value="${e1.sequenceNum}"/>
														</td>
													</tr>
													<tr align="right">
														<td><a href="javascript:editDisease(${e1.id});">编辑</a>&nbsp;&nbsp;<a href="javascript:doDelSubDisease(${e1.id});">删除</a></td>
													</tr>
												</table>
											</c:if>
										</c:forEach>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</c:if>
					<c:forEach items="${list1}" var="e">
						<div id="${e.code}" style="display: ">
							<a name="${e.code}_anchor"></a>
							<input type="hidden" id="${e.code}_name" value="${e.code}">
							<table width="95%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td colspan="2" valign="top" align="left">
										<p class="STYLE12">
											【${e.name}】
										</p>
									</td>
								</tr>
								<tbody id="${e.code}_table">
								<tr>
									<td>
										<c:forEach items="${list2}" var="e1">
											<c:if test="${e.id == e1.fieldId}">
												<table id="${e1.id}_tr" width="95%" border="0" cellspacing="0" cellpadding="0">
													<tr align="left">
														<td>${e1.titleName}</td>
													</tr>	
													<tr align="left">
														<td>
														${fn:replace(fn:replace(e1.content,vEnter,"<br/>"),".imgPath.",imgPath)}
														<input type="hidden" id="${e1.id}_id" value="${e1.id}"/>
														<input type="hidden" id="${e1.id}_titleName" value="${e1.titleName}"/>
														<input type="hidden" id="${e1.id}_content" value="${e1.content}"/>
														<input type="hidden" id="${e1.id}_fieldId" value="${e1.fieldId}"/>
														<input type="hidden" id="${e1.id}_imgFile" value="${e1.imgFile}"/>
														<input type="hidden" id="${e1.id}_labelTopic" value="${e1.labelTopic}"/>
														<input type="hidden" id="${e1.id}_sequenceNum" value="${e1.sequenceNum}"/>
														</td>
													</tr>
													<tr align="right">
														<td><a href="javascript:editDisease(${e1.id});">编辑</a>&nbsp;&nbsp;<a href="javascript:doDelSubDisease(${e1.id});">删除</a></td>
													</tr>
												</table>
											</c:if>
										</c:forEach>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
 					</c:forEach>
					<div id="newDisease" style="display:none;">
						<form action="${ctx}/disease/sub" method="post" id="diseasesubFrm">
						<input type="hidden" id="id" name="id"
							value="0">
						<input  type="hidden" id="diseaseId" name="diseaseId"
							value="0">	
						<input  type="hidden" id="fieldId" name="fieldId"
							value="0">	
						<table width="95%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td bgcolor="#e7e7e7">
									<br>
									<table width="80%" border="0" cellspacing="0" cellpadding="0" align="left">
										<tr>
											<td colspan="2" id="warnMessage">
												&nbsp;
											</td>
										</tr>									
										<tr>
											<td>
												<span class="STYLE13 STYLE9">主关键词</span>
											</td>
											<td align="left">
												<input type="text" name="labelTopic" size="50" id="mainKey" value="">
											</td>
										</tr>
										<tr>
											<td>
												<span class="STYLE13 STYLE9">序列号</span>
											</td>
											<td align="left">
												<input id="seq" name="sequenceNum" size="10" value="1">
											</td>
										</tr>										
										<tr>
											<td>
												<span class="STYLE13 STYLE9">文件上传</span>
											</td>
											<td align="left">
												<div id="file_upload"></div>
											</td>
										</tr>
										<tr>
											<td>
												<span class="STYLE13 STYLE9">文件上传</span>
											</td>
											<td align="left">
												<textarea name="imgFile" id="files" rows="2" cols="70"></textarea>
											</td>
										</tr>
										<tr>
											<td>
												<span class="STYLE13 STYLE9">标题</span>
											</td>
											<td align="left">
												<input type="text" name="titleName" id="titleName" size="50" value="">
											</td>
										</tr>																													
										<tr>

										</tr>
										
										<tr>
											<td>
												<span class="STYLE13 STYLE9">内容</span>
											</td>
											<td align="left">
												<textarea rows="7" cols="70" id="content" name="content"></textarea>
											</td>
										</tr>
										<tr>
											<td colspan="2">
												<input value="提交" type="submit"/>
												<input value="取消" type="button"/>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						</form>
					</div>
				</td>
			</tr>
		</table>
  </body>
</html>

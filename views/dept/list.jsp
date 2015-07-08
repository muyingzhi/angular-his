<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://displaytag.sf.net" prefix="display"%>
<html>
	<head>
		<title>科室</title>
		<style type="text/css" media="all">
			@import url("<c:url value='/resources/css/display/site.css'/>");
			@import url("<c:url value='/resources/css/display/screen.css'/>");
		</style>
		<script type="text/javascript" src="<c:url value='/resources/js/jquery-1.6.2.js'/>"></script>
		<script type="text/javascript">
		
			function checkAll(n){
				if($("#allbox").attr("checked") == "checked"){
					$("#"+n+" :checkbox").attr("checked","checked");
				}else{
					$("#"+n+" :checkbox").removeAttr("checked");
				}
			}
			
			function del(){
				if($("input[name='ids']:checked").length > 0){
					$("#delForm").submit();
				}
			}
			
			function save(){
				$("#id").val("0");
				$("#code").val("");
				$("#name").val("");
			}
			
			function edit(id,code,name){
				$("#id").val(id);
				$("#code").val(code);
				$("#name").val(name);
			}
		</script>		
	</head>
	<body>
	<c:set var="ctx" value="${pageContext.request.contextPath}"/>
	<c:set var="checkAll">
    <input type="checkbox" id="allbox" name="allbox" onclick="checkAll('delForm')" style="margin: 0 0 0 4px" />
	</c:set>
	<form action="<c:url value='/dept/save'/>" id="addForm" method="post">
		<input id="id" name="id" type="hidden" value="0"/>
		<table>
			<tr>
				<td>编码:</td>
				<td><input id="code" value="" name="code"/></td>
			</tr>
			<tr>
				<td>名称:</td>
				<td><input id="name" value="" name="name"/></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="提交"/></td>
			</tr>			
		</table>
	</form>
	<div style="width: 98%">
		<form id="delForm" action="<c:url value='/dept/del'/>" method="post">
		<display:table requestURI="${ctx}/dept" cellpadding="1"
			partialList="true" list="${list}" cellspacing="1" style="width:99%;"
			pagesize="${page.pageSize}" size="${page.total}" class="its" htmlId="dept" id="dept">
			<display:column style="width: 5%" title="${checkAll}">
			 	<input type="checkbox" name="ids" value="${dept.id}"/>
			</display:column>
			<display:column title="编码" property="code" />
			<display:column title="名称" property="name" />
			<display:column title="操作">
				<a href="javascript:edit(${dept.id},'${dept.code}','${dept.name}');">编辑</a>
			</display:column>
		</display:table>
		</form>
	</div>	
		<input value="新增" type="button" onclick="save()"/>
		<input value="删除" type="button" onclick="del()"/> 
	</body>
</html>

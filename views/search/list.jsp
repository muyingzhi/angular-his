<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://displaytag.sf.net" prefix="display"%>
<html>
	<head>
		<title>内容列表</title>
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
				window.location = "<c:url value='/disease/0-${pid}'/>";
			}
		</script>		
	</head>
	<body>
	<c:set var="ctx" value="${pageContext.request.contextPath}"/>
	<c:set var="checkAll">
    <input type="checkbox" id="allbox" name="allbox" onclick="checkAll('delForm')" style="margin: 0 0 0 4px" />
	</c:set>
	<form action="${ctx}/search/${pid}" method="post">
		<table>
			<tr>
				<td>疾病名称:</td>
				<td><input type="text" name="diseaseName" value=""/></td>
			</tr>
			<tr>
				<td colspan="2">
					<input type="submit" value="提交">
				</td>
			</tr>
		</table>
	</form>
	<div style="width: 98%">
		<form id="delForm" action="<c:url value='/disease/del/${pid}'/>" method="post">
		<display:table requestURI="${ctx}/search/${pid}" cellpadding="1"
			partialList="true" list="${list}" cellspacing="1" style="width:99%;"
			pagesize="${page.pageSize}" size="${page.total}" class="its" htmlId="disease" id="disease">
			<display:column style="width: 5%" title="${checkAll}">
			 	<input type="checkbox" name="ids" value="${disease.id}"/>
			</display:column>
			<display:column title="疾病名称" property="diseaseName" />
			<display:column title="操作">
				<a href="<c:url value='/disease/${disease.id}-${pid}'/>">编辑</a>
			</display:column>
		</display:table>
		</form>
	</div>	
		<input value="新增" type="button" onclick="save()"/>
		<input value="删除" type="button" onclick="del()"/> 
	</body>
</html>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>欢迎使用本系统</title>
   	<style type="text/css" media="all">
		@import url("<c:url value='/resources/css/display/site.css'/>");
		@import url("<c:url value='/resources/css/display/screen.css'/>");
	</style>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
  <body>
  <form action="${ctx}/search/list" method="post">
  	<select name="catalog">
  		<option value="001">辅助诊断</option>
  		<option value="002">疾病治理</option>
  		<option value="003">临床技能</option>
  		<option value="004">经验病案</option>
  		<option value="005">健康教育</option>
  		<option value="006">体格检查</option>
  	</select>
  	<select name="dept">
  		<option value="">无科室</option>
  		<option value="001">内科</option>
  		<option value="002">外科</option>
  		<option value="003">妇科</option>
  		<option value="004">儿科</option>
  		<option value="005">全科</option>
  	</select>
  	<input name="key" value="病"/>
  	
  	<input name="" type="submit" value="提交"/>
  </form>
  
  <form action="${ctx}/search/view" method="get">
  	<input name="id" value="1"/>
  	<input name="" type="submit" value="提交"/>
  </form>
  </body>
</html>

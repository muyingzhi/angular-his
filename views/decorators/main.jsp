<%@	page contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
	prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><decorator:title /></title>
		<decorator:head />

		<script type="">
</script>
	</head>
	<body>
		<table border="0" cellspacing="0" cellpadding="0" width="100%"
			height="100%">
			<tbody>
				<tr>
					<td valign="top" colspan="3">
						<center><h3><decorator:title /></h3></center>
					</td>
				</tr>
				<tr>
					<td valign="top" width="10%">
						<ul style="list-style:none;">
							<li>
								<a href="<c:url value='/search/1'/>">辅助诊断</a>
							</li>
							<li>
								<a href="<c:url value='/search/2'/>">疾病治疗</a>
							</li>
							<li>
								<a href="<c:url value='/search/3'/>">临床技能</a>
							</li>
							<li>
								<a href="<c:url value='/search/4'/>">经验病案</a>
							</li>
							<li>
								<a href="<c:url value='/search/5'/>">健康教育</a>
							</li>
							<li>
								<a href="<c:url value='/search/60'/>">体格检查</a>
							</li>
							<li>
								<a href="<c:url value='/dept'/>">科室管理</a>
							</li>
							<li>
								<a href="<c:url value='/catalog'/>">章节管理</a>
							</li>
						</ul>
					</td>
					
					<td valign="top" width="100%">
						<decorator:body />
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<table border="0" cellspacing="0" cellpadding="5" width="100%">
							<tbody>
								<tr>
									<td bgcolor="#3d80be" height="1"></td>
								</tr>
								<tr>
									<td class="copyright"></td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</body>
</html>
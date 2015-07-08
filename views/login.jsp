<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page pageEncoding="UTF-8" %>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <c:if test="${not empty param.login_error}">
      <font color="red">
      	<c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
      </font>
    </c:if>

    <form name="f" action="<c:url value='j_spring_security_check'/>" method="POST">
      <table>
        <tr><td>用户名:</td><td><input type='text' name='j_username' value='<c:if test="${not empty param.login_error}"><c:out value="${SPRING_SECURITY_LAST_USERNAME}"/></c:if>'/></td></tr>
        <tr><td>密&nbsp;&nbsp;码:</td><td><input type='password' name='j_password'></td></tr>
        <tr><td colspan='2'><input name="submit" type="submit" value="登录"></td></tr>
      </table>
    </form>
  </body>
</html>

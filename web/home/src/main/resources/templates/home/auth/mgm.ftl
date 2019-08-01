<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
       <head>
           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
           <title>data-work tools</title>
           <#include "/common/head.ftl"/>
       </head>

<body style="background:#eee;padding-left:2px;padding-right:2px;">

<!--主页面-->
<div>
	<div>
		<div id="sform" data-options="cls:'c6'"></div>
	</div>
	<div>
		<table id="dg"></table>
	</div>
</div>

<!--管理员列表弹窗-->
<div id="win1" data-options="cls:'c6'">
    <div><div id="wform1" data-options="cls:'c6'"></div></div>
	<div><table id="dgwin1"></table></div>
</div>

<!--新增管理员弹窗-->
<div id="win2" data-options="cls:'c6'">
    <div><div id="wform2" data-options="cls:'c6'"></div></div>
</div>



</body>
</html>

<script src="/pagejs/home/auth/mgm.js"></script>

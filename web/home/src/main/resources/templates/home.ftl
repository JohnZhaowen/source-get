<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
       <head>
           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
           <title>data-work tools</title>
           <#include "/common/head.ftl"/>

           <script src="/ui/hcharts/highcharts.js"></script>
           <script src="/ui/hcharts/exporting.js"></script>
           <script src="/ui/hcharts/CN.js"></script>

       </head>

       <body class="easyui-layout">

       <div data-options="region:'north'" style="height:60px">
            <div style="padding-left:0px;float:left">
            <a href="http://cloud.yonghui.cn/" title="永辉鉴权系统" target="_blank">
            <img style="height:55px;" src="http://cloud.yonghui.cn/images/yh.png" alt="永辉云计算科技有限公司">
            </a>
            </div>
            <div style="float:right ">
                 <div class="aui-head-login">
                    <span id="wl"></span> ! &nbsp;&nbsp;
                    <a class="aui-head-register" href="/loginout">登出</a>
                </div>
                <span id="wl"></span>
           </div>
       </div>
       <div data-options="region:'south',split:true" style="height:0px;"></div>
       <div data-options="region:'west',split:true,cls:'c6'" title="鉴权系统" style="width:200px;">
           <div class="easyui-accordion" data-options="fit:true,border:false">
               <div title="super权限组管理" style="padding:10px;" data-options="selected:true,cls:'c6'">
                   <ul id="ul001">
                   </ul>
               </div>
               <div title="admin权限组管理"  style="padding:10px" data-options="cls:'c6'">
                   <ul id="ul002">
                   </ul>
               </div>
               <div title="普通权限组管理"  style="padding:10px" data-options="cls:'c6'">
                  <ul id="ul003">
                  </ul>
              </div>
           </div>
       </div>
       <div data-options="region:'center',cls:'c6'">
           <div id="center_tab" class="easyui-tabs" data-options="fit:true,border:false,plain:true,cls:'c6'">
               <div title="权限管理平台">
               </div>
           </div>
       </div>

       </body>
       </html>
       <script type="text/javascript">

            $("#ul001").tree({
               data:[{
                     "text":"super组成员/资源",
                     "attributes":{
                         "url":"/home/super/index"
                     },
                     "iconCls":"icon-ok"
                 },{
                     "text":"组类型/资源类型管理",
                     "attributes":{
                         "url":"/home/super/type"
                     },
                     "iconCls":"icon-ok"
                 },{
                     "text":"admin组成员管理",
                     "attributes":{
                         "url":"/home/super/admin"
                     },
                     "iconCls":"icon-ok"
                 }],
               onClick: function(node){
                   click(node);
               }
           });

           $("#ul002").tree({
               data:[{
                    "text":"admin组成员",
                    "attributes":{
                        "url":"home/admin/member"
                    },
                    "iconCls":"icon-ok"
                },{
                    "text":"admin管理普通权限组",
                    "attributes":{
                        "url":"home/admin/group"
                    },
                    "iconCls":"icon-ok"
                }],
               onClick: function(node){
                   click(node);
               }
           });

           $("#ul003").tree({
              data:[{
                   "text":"普通权限管理组",
                   "attributes":{
                       "url":"home/auth/mgm"
                   },
                   "iconCls":"icon-ok"
               },{
                   "text":"普通权限组",
                   "attributes":{
                       "url":"home/auth/group"
                   },
                   "iconCls":"icon-ok"
               },{
                   "text":"资源管理",
                   "attributes":{
                       "url":"home/auth/source"
                   },
                   "iconCls":"icon-ok"
               }],
              onClick: function(node){
                  click(node);
              }
          });

       </script>
       <script src="/pagejs/a-index.js"></script>
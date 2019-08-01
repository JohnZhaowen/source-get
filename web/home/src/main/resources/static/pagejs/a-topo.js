jsPlumb.ready(function () {
   var sourceEndpoint = {
       endpoint: "Dot",
       paintStyle: {
           stroke: "#7AB02C",
           fill: "transparent",
           radius: 7,
           strokeWidth: 1
       },
       maxConnections: 1,
       isSource: true,
       connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
       connectorStyle: connectorPaintStyle,
       hoverPaintStyle: endpointHoverStyle,
       connectorHoverStyle: connectorHoverStyle,
       dragOptions: {},
       overlays: [
           [ "Label", {
               location: [0.5, 1.5],
               label: "Drag",
               cssClass: "endpointSourceLabel",
               visible:false
           } ]
       ]
   };
   var targetEndpoint = {
       endpoint: "Dot",
       paintStyle: { fill: "#7AB02C", radius: 7 },
       hoverPaintStyle: endpointHoverStyle,
       maxConnections: 1,
       dropOptions: { hoverClass: "hover", activeClass: "active" },
       isTarget: true,
       overlays: [
           [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
       ]
   };

   var instance = window.jsp = jsPlumb.getInstance({
       DragOptions: { cursor: 'pointer', zIndex: 2000 },
       ConnectionOverlays: [
           [ "Arrow", {
               location: 1,
               visible:true,
               width:11,
               length:11,
               id:"ARROW",
               events:{
                   click:function() {}
               }
           } ],
           [ "Label", {
               location: 0.1,
               id: "label",
               cssClass: "aLabel",
               events:{
                   tap:function() {}
               }
           }]
       ],
       Container: "canvas"
   });

   var basicType = {
       connector: "StateMachine",
       paintStyle: { stroke: "red", strokeWidth: 4 },
       hoverPaintStyle: { stroke: "blue" },
       overlays: [
           "Arrow"
       ]
   };

   instance.registerConnectionType("basic", basicType);

   var connectorPaintStyle = {
       strokeWidth: 2,
       stroke: "#61B7CF",
       joinstyle: "round",
       outlineStroke: "white",
       outlineWidth: 2
   };
   var connectorHoverStyle = {
       strokeWidth: 3,
       stroke: "#216477",
       outlineWidth: 5,
       outlineStroke: "white"
   };
   var endpointHoverStyle = {
       fill: "#216477",
       stroke: "#216477"
   };

   init = function (connection) {
       connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
   };

    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            instance.addEndpoint(toId, sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }

        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint(toId, targetEndpoint,
                { anchor: targetAnchors[j], uuid: targetUUID });
        }
    };

    instance.batch(function () {

        _().basicAjaxT({
             data:{actionRoute:thisPage.routeKey},
             url: "/a-ajax.json?&queryId=aengine.aAction.selectScript",
             success:function(data){
                var i =0;
                for(i;i<data.length;i++){
                    var actionOne = data[i];
                    var text = actionOne.actionDesc;
                    if(text.length>8){
                        text = text.substr(0,8)+"...";
                    }
                    var topoExt ={};
                    try{
                      topoExt = $.parseJSON(actionOne.topoExt);
                    }catch(err){
                        console.log(err.message);
                    }
                    addOneNode("simpleNode",
                                "<strong class=\"in_strong\" ascript=\""+actionOne.ascript+"\" judge=\""+actionOne.judge+"\" title=\""+
                                    actionOne.actionDesc +"\">"+text+"</strong><br/><br/>",
                                actionOne.actionKey,topoExt.topoTop,topoExt.topoLeft,true);
                }

                 _().basicAjaxT({
                     data:{routeKey:thisPage.routeKey},
                     url: "/a-ajax.json?&queryId=aengine.aRoute.select.getConnections",
                     success:function(data){
                        var i =0;
                        for(i;i<data.length;i++){
                            var actionOne = data[i];
                            instance.connect({uuids: [actionOne.begin+"RightMiddle", actionOne.end+"LeftMiddle"],
                             editable: true});
                        }
                     }
                });
             }
        });

        instance.draggable(jsPlumb.getSelector("#right-div .window-flowchart"),{containment:"#right-div"});

        instance.bind("click", function (connection, originalEvent) {
        });

        instance.bind("connection", function (connInfo, originalEvent) {
            if(!thisPage.beginConnectionDrag==true){
                thisPage.beginConnectionDrag=false;
                return;
            }
            var source = connInfo.source;
            var target = connInfo.target;
            var sourceActionKey = $(source).attr("actionkey");
            if(!sourceActionKey || sourceActionKey==""){
                _(connInfo.sourceId).tipsMsg("起始节点（"+$(source).html()+"）的信息尚建立，无法建立连接！");
                instance.deleteConnection(connInfo.connection);
                return false;
            }
            var targetActionKey = $(target).attr("actionkey");
            if(!targetActionKey || targetActionKey==""){
               _(connInfo.targetId).tipsMsg("结束节点（"+$(target).html()+"）的信息尚建立，无法建立连接！");
                instance.deleteConnection(connInfo.connection);
                return false;
            }
            if(connInfo.sourceId==connInfo.targetId){
                _(connInfo.sourceId).tipsMsg("系统限制：不能连接自己！");
                instance.deleteConnection(connInfo.connection);
                return false;
            }

            var sendData={};
            sendData.sourceKey = $(source).attr("actionKey");
            sendData.targetKey = $(target).attr("actionKey");
            sendData.sourceExt='{"topoTop":"'+$(source).css("top")+'","topoLeft":"'+$(source).css("left")+'"}';
            sendData.targetExt='{"topoTop":"'+$(target).css("top")+'","topoLeft":"'+$(target).css("left")+'"}';
            sendData.routeKey = thisPage.routeKey;
             _().basicAjaxT({
                 data:sendData,
                 async:true,
                 url:"/a-ajax.json?beanId=actionManagerService&method=createActionsConnection",
                 success:function(data){
                    if(!data.success){
                        instance.deleteConnection(connInfo.connection);
                         _(connInfo.sourceId).tipsMsg(data.msg);
                    }
                 },
                 error:function(){
                    instance.deleteConnection(connInfo.connection);
                    _(connInfo.sourceId).tipsMsg("操作失败，请重试！");
                 }
             });
        });

        instance.bind("dblclick", function (connection, originalEvent) {
            var source = connection.source;
            var target = connection.target;
            var sendData={};
            sendData.sourceKey = $(source).attr("actionKey");
            sendData.targetKey = $(target).attr("actionKey");
            sendData.routeKey = thisPage.routeKey;
            $.messager.confirm('是否确认?','即将移除（'+$(source).html()+'）到（'+$(target).html()+'）的连接！',function(r){
                if(r){
                     _().basicAjaxT({
                         data:sendData,
                         url:"/a-ajax.json?beanId=actionManagerService&method=removeActionsConnection",
                         success:function(data){
                            if(data.success){
                                thisPage.dbclickDetach=true;
                                instance.deleteConnection(connection);
                            }
                            _(connection.sourceId).tipsMsg(data.msg);
                         },
                         error:function(){
                            _(connection.sourceId).tipsMsg("操作失败，请重试！");
                         }
                     });
                }
            });
        });

        instance.bind("beforeDetach", function (connection) {
            var result =true;
            if(thisPage.dbclickDetach==true){
                thisPage.dbclickDetach=false;
                return;
            }
             var source = connection.source;
             var target = connection.target;
             var sendData={};
             sendData.sourceKey = $(source).attr("actionKey");
             sendData.targetKey = $(target).attr("actionKey");
             if(!sendData.sourceKey || !sendData.targetKey){
                return;
             }
             sendData.routeKey = thisPage.routeKey;
             _().basicAjaxT({
                  async:true,
                  data:sendData,
                  url:"/a-ajax.json?beanId=actionManagerService&method=removeActionsConnection",
                  success:function(data){
                     if(!data.success){
                        _(connection.sourceId).tipsMsg(data.msg);
                        result = false;
                     }
                  },
                  error:function(){
                      _(connection.sourceId).tipsMsg("操作失败，请重试！");
                      result = false;
                  }
              });
              return result;
        });

        instance.bind("connectionDetached", function (connInfo, originalEvent) {});


        instance.bind("connectionDrag", function (connection) {
            thisPage.beginConnectionDrag=true;
        });

        instance.bind("connectionDragStop", function (connection) {
            if(thisPage.beginConnectionDrag==true){
                thisPage.beginConnectionDrag=false;
            }
        });

        instance.bind("connectionMoved", function (params) {

        });
    });


//  jsPlumb.fire("jsPlumbDemoLoaded", instance);

    var i=10;
    var top;
    var left;

    function addOneNode(sourceText,sourceHtml,inNodeId,tops,lefts,isDb){
        if(!inNodeId){
            inNodeId="flowchartWindow"+i;i++;
        }
        var actionsKey = isDb?inNodeId:"";
        var appendHtml;
        if(sourceText == 'simpleNode'){
            targetEndpoint.maxConnections=1;
            sourceEndpoint.maxConnections=1;
            appendHtml='<div class="window-flowchart" actionKey = "'+actionsKey+'" id="'+inNodeId+'">'+sourceHtml+'</div>';
        }
        if(sourceText == 'forkNode'){
            targetEndpoint.maxConnections=5;
            sourceEndpoint.maxConnections=5;
            appendHtml='<div class="window-flowchart radius" actionKey = "'+actionsKey+'" id="'+inNodeId+'">'+sourceHtml+'</div>';
        }

        $("#right-div").append(appendHtml);
        if(!tops){
            tops = top;
        }
        if(!lefts){
            lefts = left;
        }
        if(isDb){
            if(tops && tops.indexOf("px")<=0){
              tops=tops+"px";
            }
            if(left && left.indexOf("px")<=0){
              left=left+"px";
            }
            $("#"+inNodeId).css("top",tops);
            $("#"+inNodeId).css("left",lefts);
        }else{
            $("#"+inNodeId).offset({top:tops,left:lefts});
        }

        _addEndpoints(inNodeId, ["RightMiddle"], ["LeftMiddle"]);

        instance.draggable(jsPlumb.getSelector("#"+inNodeId), {containment:"#right-div"});
    }

    $('#left-div').find(".window-tool").draggable({
        revert:true,
        proxy:'clone',
        onDrag:function(e){
         left=e.clientX;
         top=e.clientY;
        }
    });

    $('#right-div').droppable({
        accept: '.window-tool',
        onDrop:function(e,source){
            var sourceHtml= $(source).html();
            var sourceText = $(source).attr("name");
            addOneNode(sourceText,sourceHtml);
        }
    });

    function getGbBtn(text){
        return "<a href=\"javascript:void(0)\" class=\"gdbut btn\">"+text+"</a>";
    }

    function updateEleActionInfo(eleId,formData){
        $("#"+eleId).attr("actionKey",formData.actionKey);
        var text = formData.actionDesc;
        if(text.length>8){
            text = text.substr(0,8)+"...";
        }
        $("#"+eleId).find(".in_strong").attr("title",formData.actionDesc);
        $("#"+eleId).find(".in_strong").html(text);
        if(formData.ascript){
            $("#"+eleId).find(".in_strong").attr("ascript",formData.ascript);
        }
        if(formData.judge){
            $("#"+eleId).find(".in_strong").attr("judge",formData.judge);
        }
        $("#"+eleId).attr("id",formData.actionKey);
        return formData.actionKey;
    }

    $('#right-div').find(".window-flowchart").die().live("dblclick",function(e){
        var actionKey =$(this).attr("actionKey");
        var eleId =$(this).attr("id");

        var ascript = $(this).find("strong").attr("ascript");
        var judge = $(this).find("strong").attr("judge");

        if(actionKey){
            _().basicAjaxT({
                 data:{actionKey:actionKey},
                 url:"/a-ajax.json?queryId=aengine.aScript.select",
                 success:function(data){
                     var rows= new Array(3);
                     if(data.length == 1){
                        var currentOne = data[0];
                        var scriptKey = currentOne.scriptKey;
                        if(scriptKey==ascript){
                            rows[0] = {scriptKey:"",scriptName:getGbBtn("添加前置脚本")};
                            rows[1] = currentOne;
                        }
                        if(scriptKey==judge){
                            rows[0] = currentOne;
                            rows[1] = {scriptKey:"",scriptName:getGbBtn("添加主体脚本")};
                        }
                    }
                    if(data.length == 2){
                        rows[0] = data[0];
                        rows[1] = data[1];
                    }
                    if(data.length == 0){
                        rows[0] = {scriptKey:"",scriptName:getGbBtn("添加前置脚本")};
                        rows[1] = {scriptKey:"",scriptName:getGbBtn("添加主体脚本")};
                    }

                    rows[2] = {scriptKey:"",scriptName:getGbBtn("编辑动作信息")};

                    var loadData={"total":3,rows:rows};
                    $('#tb_script').datagrid("loadData",loadData);
                    $('#tb_script').data("actionKey",actionKey);
                 }
            });
        }else{
            var loadData={"total":3,rows:[
                {scriptKey:"",scriptName:getGbBtn("添加前置脚本")},
                {scriptKey:"",scriptName:getGbBtn("添加主体脚本")},
                {scriptKey:"",scriptName:getGbBtn("新增动作信息")}
            ]};
            $('#tb_script').datagrid("loadData",loadData);
            $('#tb_script').data("actionKey",null);
        }
        $('#right-div').find(".window-flowchart").css("background", "");
        $(this).css("background", "#6caef5");
        $("#east_accordion").accordion("select","节点信息");

        $('#tb_script').data("eleId",eleId);
    });

    $(".gdbut").die().live("click",function(e){
        var html = $(this).html();
        if(html=="新增动作信息"){
            $("#actions_form").window("setTitle","新增节点信息");
            _("actions_form").form("open");
            _("actions_form").form("clear");
        }
        if(html=="编辑动作信息"){
            var actionKey = $('#tb_script').data("actionKey");
            if(actionKey){
                 _().basicAjaxT({
                     data:{actionKey:actionKey},
                     url:"/a-ajax.json?queryId=aengine.aAction.selectScript",
                     success:function(data){
                        if(data.length==1){
                            var actionOne = data[0];
                             _("actions_form").form("clear");
                             $("#actions_form").window("setTitle","当前处理节点："+actionOne.actionName+"("+actionOne.actionKey+")");
                             _("actions_form").form("open");
                              _("actions_form").form("load",actionOne);
                        }
                     }
                });
            }
        }
        if(html=="添加前置脚本"){
            var actionKey = $('#tb_script').data("actionKey");
            show_script_edi_win(null,function(reback,win){
                if(actionKey){
                    _().basicAjaxT({
                         data:{actionKey:actionKey,judge:reback},
                         url:"/a-ajax.json?beanId=actionManagerService&method=newOrUpdate",
                         success:function(data){
                            $('#se_'+scriptKey).window("close");
                            _("#tb_script").tipsMsg("添加前置脚本成功！");
                         }
                    });
                }else{
                    _("#tb_script").tipsMsg("动作节点尚未建立，请自行编辑关联前置脚本！");
                    $('#'+win).window("close");
                }
            });
        }
        if(html=="添加主体脚本"){
            var actionKey = $('#tb_script').data("actionKey");
            show_script_edi_win(null,function(reback,win){
                if(actionKey){
                    _().basicAjaxT({
                         data:{actionKey:actionKey,ascript:reback},
                         url:"/a-ajax.json?beanId=actionManagerService&method=newOrUpdate",
                         success:function(data){
                            $('#se_'+scriptKey).window("close");
                            _("#tb_script").tipsMsg("添加前置脚本成功！");
                         }
                    });
                }else{
                    _("#tb_script").tipsMsg("动作节点尚未建立，请自行编辑关联前置脚本！");
                    $('#'+win).window("close");
                }
            });
        }
    });

    $(window).resize(function(){
        var height1 = $(window).height();
        $("body").attr("style","width:100%;height:"+height1+"px");
        $("body").layout("resize",{
            width:"100%",
            height:height1+"px"
        });
    });

     _('tb_script').datagrid({
        columns:[[
            {title:'动作基本信息',field:'scriptName',width:80,hfield:'scriptKey'}
        ]],
        onDblClickRow:function(index,row){
            if(row.scriptKey){
                var scriptKey=row.scriptKey;
                show_script_edi_win(scriptKey,function(){
                     $('#se_'+scriptKey).window("close");
                });
            }
        },
        DbInfo:false,pagination:false,rownumbers:false
    });


     var columns=thisPage.layout.action_gd(null);
     _('tb_actions').datagrid(jQuery.extend(true,{},columns,{
            onBeforeLoad:function(param){
                return true;
            },
            onDblClickRow:function(index,row){

            },
            DbInfo:false,pagination:false,rownumbers:false
        })
     );

    _("actions_form").form(jQuery.extend(true,{},thisPage.layout.action_subForm,
        {
           title:"窗口",
           modal:true,
           button:[{
               field:"保存",
               check:true,
               onclick:function(fdata){
                     _().basicAjaxT({
                         data:fdata,
                         url:_("actions_form").form("getFormData").action,
                         success:function(data){
                            if(data.success){
                                var selectActionKey = $('#tb_script').data("actionKey");
                                var selectEleId = $('#tb_script').data("eleId");
                                if(selectActionKey && selectActionKey==fdata.actionKey){
                                    _("actions_form").form("close");
                                    _("#tb_script").tipsMsg("节点（"+selectActionKey+"）的基础信息更新成功！");
                                    var newSelectEleId = updateEleActionInfo(selectEleId,fdata);
                                }else{
                                    var newSelectEleId = updateEleActionInfo(selectEleId,fdata);
                                    $('#'+newSelectEleId).trigger("dblclick");
                                    _("actions_form").form("close");
                                }
                            }else{
                                _("#tb_script").tipsMsg(data.msg);
                            }
                         }
                    });
               }
           },{
               field:"清空",
               check:false,
               onclick:function(){
                   _("actions_form").form("clear");
               }
           }]
       })
    );

});
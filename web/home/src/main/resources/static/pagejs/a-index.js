var thisPage={};

function click(node){
    var href = node.attributes.url;
    var title = node.text;
    addTab(href,title);
}

function addTab(href,title){
    var token = _().requestParameter("token");
    if(token!="" && token!=null && token!=undefined){
        if(href.indexOf("?")>=0){
            href = href + "&token="+token;
        }else{
                href = href + "?token="+token;
        }
    }
    var tt = $('#center_tab');
    if (tt.tabs('exists', title)){
        tt.tabs('select', title);
        //refreshTab({tabTitle:title,url:href});
    } else {
        if (href){
            var content = '<iframe  name="contentFrame" src="'+href+'" style="width: 100%; height: 100%;" frameborder="0"></iframe>';
        } else {
            var content = 'none';
        }
        tt.tabs('add',{
            title:title,
            closable:true,
            content:content
        });
    }
}

function refreshTab(action){
    document.getElementById("contentFrame").src=action;
}

$(window).resize(function(){
    var height1 = $(window).height();
    $("body").attr("style","width:100%;height:"+height1+"px");
    $("body").layout("resize",{
        width:"100%",
        height:height1+"px"
    });
});

$("#mm1").find("div").die().live("click",function(e){
    var html = $(this).html();
    var left=e.clientX;
    var top=e.clientY;
    if(html.indexOf("已有")>=0){
        if($("#route_win").length===0){
            $("body").append("<div id ='route_win'><input id='ss' width:'300px'></input><table id='route_win_dg'></table></div>");
            $("#route_win").window({
                width:300,
                height:200,
                minimizable:false,collapsible:false,maximizable:false,draggable:false,resizable:false,
                border:false,
                modal:false,
                left: left,
                top: top,
                title:'选择已有route',
                closed:true
            });

             $('#route_win_dg').datagrid({
                url:"/a-ajax.json?queryId=aengine.aRoute.select",
                columns:[[
                    {title:'处理流key',field:'routeKey',width:80,hfield:'id'},
                    {title:'处理流名称',field:'routeName',width:80},
                    {title:'处理流描述',field:'routeDesc',width:80}
                ]],
                onClickRow:function(index,row){
                    if(row.routeKey){
                        var href = "/aengine/a-topo.htm?routeKey="+row.routeKey;
                        var title = "处理流名称:"+row.routeName;
                        addTab(href,title);
                        $("#route_win").window("close");

                    }
                }
            });

            $('#ss').searchbox({
                searcher:function(value,name){
                     $('#route_win_dg').datagrid("load");
                },width:300,
                prompt:'Please Input Value'
            });
        }
        $("#route_win").window("open");
        return;
    }

    if(html.indexOf("新建")>=0){
        if($("#route_new_win").length===0){
            _("route_new_win").form(jQuery.extend(true,{},thisPage.layout.route_subForm));
        }
    }
});

 _().basicAjaxT({
        url:"/getLogin",
        data:{},
        success:function(data){
            if(data.login == true || data.login == "true"){
               $("#wl").empty().append("欢迎您："+data.name);
            }

        }
    });

//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;   
    if(eth==="删除"){
    	thisPage.adminUserDel(row.groupId, row.account);
    	return;
    }

    thisPage.pc(f,tabId,row);
};
//<#--回掉函数-->
thisPage.init = function(){
    _("#sform").form({
    	title:'管理员组成员管理',
    	window:false,
    	columnsNun:2,
    	columns:[
    		{field:'成员账号',name:"account",type:'text'}
    	],
    	after:function(){
    	},
    	button:false
    });

    var columns=thisPage.layout.superadmins({title:'操作',field:'operation',width:120,type:'button',button:['删除']});

    _('dg').datagrid(jQuery.extend(true,{},columns,{
            onBeforeLoad:function(param){
                var serForm=_("sform").form("serialize");
                jQuery.extend(param,serForm);
            },
            dtoolbar:[
            	{field:"搜索",icon:"icon-search",
                    click:function(){
                        var validation_form = _("sform").form("validation");
                        if(validation_form){
                            $("#dg").datagrid("load");
                        }
                    }
                },
                {field:"重置",icon:"icon-zoom_out",
                    click:function(){
                        _("sform").form("clear");
                    }
                },
                {field:"新增组成员",icon:"icon-add",
                    click:function(){
                    	thisPage.addAdminUser();
                    	return;
                    }
                }      
            ],
            DbInfo:true
         })
    );

    $(window).resize(function(){
    	$("#dg").datagrid("resize");
    	$("#sform").panel("resize");
    });
};

thisPage.initWin=function(id){
    if($(id).length===0){
        _(id).form(jQuery.extend(true,{
                beforeSubmit:function(subData){
                    var gName = subData.gName;
                    var successJobSvn = subData.successJobSvn;
                    if(successJobSvn==null || successJobSvn.indexOf(gName)!=0){
                        $.messager.alert($.messager.defaults.message,"");
                        return false;
                    }
                    return true;
                }
            },thisPage.layout.groupRef_subForm));
    }
};


thisPage.pc=function(f,id,row){
    var win= id+"_win";
    thisPage.initWin(win);
    var versionKey ="";
    if(row){
       versionKey =row.version;
    }
    _().pageClick({
        window:win,
        row:row,
        dg:id,
        url:"",
        type:f
    });
};

thisPage.c_g = jQuery.extend(true,{

});

thisPage.addAdminUser = function(){
    if($('#form1').data("init") == undefined || $('#form1').data("init") != true){
        $('#form1').window({
            title : 'admin组成员新增',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("form1").form({
            window:false,
            columnsNun:1,
            columns:[
            	{field:'成员账号',name:"account", id:'account', type:'text'}
            ],
            after:function(){
            },
            button:[{
                field:"提交",
                check:true,
                onclick:function(){
                	 $.ajax({
    			         type: "POST",
    			         url: "/home/super/adminUserAdd",
    			         data: {'domain':'admin', 'groupCode' : 'admin', 'account':$('#account').val()},
    			         dataType: "json",
    			         success: function(data){
    			        	$('#form1').window("close");
    			        	if(data){
    			        		$("#dg").datagrid("load");
    			        	} else {
    			        		$.messager.show({
    			        			title:'错误提示: ',
    			        			msg:'新增失败，请稍后重试！',
    			        			timeout:2000,
    			        			showType:'fade'
    			        		});
    			        	}
    				     }
    			     });
                }
            },{
                field:"关闭",
                check:false,
                onclick:function(){
                	$('#form1').window("close");
                	$("#dg").datagrid("load");
                }
            }]
        });

        $('#form1').data("init",true);
    }else{
    	
    }
     $('#form1').window("open");
}

thisPage.adminUserDel = function(groupId, account){
	$.messager.confirm('是否继续？', '是否确定要删除该成员？' ,function(r){
		if (r){
			 $.ajax({
		         type: "POST",
		         url: "/home/super/adminUserDel",
		         data: {'groupId':groupId, 'account':account},
		         dataType: "json",
		         success: function(data){
		        	if(data){
		        		$("#dg").datagrid("load");
		        	} else {
		        		$.messager.show({
		        			title:'错误提示: ',
		        			msg:'删除失败，请稍后重试',
		        			timeout:2000,
		        			showType:'fade'
		        		});
		        		
		        	}
			     }
		     });
		}
	});
};



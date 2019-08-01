//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;   
    if(eth==="组管理员"){
    	thisPage.groupAdmin(row.id);
    	return;
    }  
    if(eth==="删除"){
    	$.messager.confirm('是否继续？', '是否确定要删除该组管理员？' ,function(r){
    		if (r){
    			 $.ajax({
    		         type: "POST",
    		         url: "/home/auth/delGroupAdmin",
    		         data: {'groupId':row.groupId, 'account':row.account},
    		         dataType: "json",
    		         success: function(data){
    		        	if(data.success){
    		        		if(data.other){
    		        			$('#win1').window("close");
    		        			$("#dg").datagrid("load");
    		        		} else {
    		        			$("#dgwin1").datagrid("load");
    		        		}
    		        	} else {
    		        		$.messager.show({
    		        			title:'错误提示: ',
    		        			msg:data.msg,
    		        			timeout:2000,
    		        			showType:'fade'
    		        		});
    		        		
    		        	}
    			     }
    		     });
    		}
    	});
    	return;
    }  
    
    thisPage.pc(f,tabId,row);
};
//<#--回掉函数-->
thisPage.init = function(){
    _("#sform").form({
    	title:'权限管理组',
    	window:false,
    	columnsNun:2,
    	columns:[
    		{field:'组ID',name:"id",type:'text'},
    		{field:'组编号',name:"groupCode",type:'text'},
    		{field:'分组名',name:"groupName",type:'text'},
    		{field:'业务域',name:"domain",type:'text'},
    		{field:'组信息',name:'groupInfo',type:'text'},
    		{field:'组类型编号',name:"typeId",type:'text'},
    		{field:'组类型名称',name:"typeName",type:'text'},
    		{field:'所辖分组ID',name:"mgmId",type:'text'}
    	],
    	after:function(){
    	},
    	button:false
    });

    var columns=thisPage.layout.authmgm({title:'操作',field:'operation',width:120,type:'button',button:['组管理员']});

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

thisPage.groupAdmin = function(groupId){
    if($('#win1').data("init") == undefined || $('#win1').data("init") != true){
        $('#win1').window({
            title : '组管理员列表',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("#wform1").form({
            window:false,
            columnsNun:4,
            columns:[
            	{field:'成员账号', name:"account", type:'text'},
            	{field:'组ID', name:"groupId", id:'groupId', type:'hidden'} 
            ],
            after:function(){
            	_("wform1").form("setValue","groupId",groupId);
            },
            button:false
        });

        _('dgwin1').datagrid({
            url:"/home/auth/adminList",
            columns:[[
            	{title:'组ID',field:'groupId',width:200},
				{title:'组编号',field:'groupCode',width:200},
				{title:'分组名',field:'groupName',width:200},
				{title:'成员账号',field:'account',width:200},
            	{title:'操作',field:'operation',width:120,type:'button',id:'sourceModify',button:['删除']}
            ]],
            dtoolbar:[
                {field:"搜索",icon:"icon-search",
                    click:function(){
                        var validation_form = _("wform1").form("validation");
                        if(validation_form){
                        	$("#dgwin1").datagrid("load");
                        }
                    }
                },
                {field:"重置",icon:"icon-zoom_out",
                    click:function(){
                        _("wform1").form("clear");
                    }
                },
                {field:"新增组管理员",icon:"icon-add",
                    click:function(){
                    	thisPage.addGroupAdmin();
                    	return;
                    }
                }                
            ],
            pagination:true,
            onBeforeLoad:function(param){
                var serForm=_("wform1").form("serialize");
                jQuery.extend(param, serForm);
            },
            DbInfo:false
        });
        $('#win1').data("init",true);
    }else{
    	_("wform1").form("clear");
    	_("wform1").form("setValue","groupId",groupId);
		$("#dgwin1").datagrid("load", {
			groupId: groupId
		});
    }
    $('#win1').window("open");
}

thisPage.addGroupAdmin = function(){
    if($('#win2').data("init") == undefined || $('#win2').data("init") != true){
        $('#win2').window({
            title : '组管理员新增',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("wform2").form({
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
                	var account = $.trim($('#account').val());
                	var groupId =$("#dg").datagrid("getSelected").id;
                	if(account.length == 0){
                		$.messager.show({
		        			title:'错误提示: ',
		        			msg:'成员账号不能为空',
		        			timeout:2000,
		        			showType:'fade'
		        		});
                		return false;
                	}
                	 $.ajax({
    			         type: "POST",
    			         url: "/home/auth/addGroupAdmin",
    			         data: {
    			        	 'groupId':groupId, 
    			        	 'account':account
    			         },
    			         dataType: "json",
    			         success: function(data){
    			        	$('#win2').window("close");
    			        	if(data.success){
    			        		$("#dgwin1").datagrid("load");
    			        	} else {
    			        		$.messager.show({
    			        			title:'错误提示: ',
    			        			msg:data.msg,
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
                	$('#win2').window("close");
                }
            }]
        });

        $('#win2').data("init",true);
    }else{
    	
    }
     $('#win2').window("open");
}


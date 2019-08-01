//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;   
    thisPage.pc(f,tabId,row);
};
//<#--回掉函数-->
thisPage.init = function(){
    _("#sform").form({
    	title:'权限组管理',
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
    		{field:'父组ID',name:"parentId",id:'parentId', type:'combogrid', comboData:$.extend(true,{},thisPage.data.comgrid_parentForSearch)},
    		
    	],
    	after:function(){
    	},
    	button:false
    });

    var columns=thisPage.layout.admingroup();

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
                {field:"新增权限组",icon:"icon-add",
                    click:function(){
                    	thisPage.addGroup();
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

thisPage.addGroup = function(){
    if($('#form1').data("init") == undefined || $('#form1').data("init") != true){
        $('#form1').window({
            title : '权限组新增',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("form1").form({
            window:false,
            columnsNun:2,
            columns:[
            	{field:'组编号(*)',name:"groupCode", id:'groupCode', type:'text'},
            	{field:'分组名(*)',name:"groupName", id:'groupName', type:'text'},
            	{field:'业务域(*)',name:"domain", id:'domainA', type:'text'},
            	{field:'组类型(*)',name:"typeId",id:'typeIdA', type:'combogrid', comboData:$.extend(true,{},thisPage.data.comgrid_type)},
            	{field:'父组',name:"parent",id:'parentA', type:'combogrid', comboData:$.extend(true,{},thisPage.data.comgrid_parent)},
            	{field:'组信息',name:"groupInfo", id:'groupInfo', type:'textarea'}
            ],
            after:function(){
            },
            button:[{
                field:"提交",
                check:true,
                onclick:function(){
                	var groupCode = $.trim($('#groupCode').val());
                	var groupName = $.trim($('#groupName').val());
                	var domain = $.trim($('#domainA').val());
                	var typeId = $.trim($('#typeIdA').val());
                	var parent = $.trim($('#parentA').val());
                	var groupInfo = $.trim($('#groupInfo').val());
                	if(groupCode.endsWith('-01') || groupCode.length == 0){
                		$.messager.show({
		        			title:'错误提示: ',
		        			msg:'组编号不能以"-01"结尾或者为空',
		        			timeout:2000,
		        			showType:'fade'
		        		});
                		return false;
                	}
                	if(domain.length == 0){
                		$.messager.show({
		        			title:'错误提示: ',
		        			msg:'业务域不能为空',
		        			timeout:2000,
		        			showType:'fade'
		        		});
                		return false;
                	}
                	if(typeId.length == 0){
                		$.messager.show({
                			title:'错误提示: ',
                			msg:'组类型不能为空',
                			timeout:2000,
                			showType:'fade'
                		});
                		return false;
                	}
                	if(groupName.length == 0){
                		$.messager.show({
                			title:'错误提示: ',
                			msg:'分组名不能为空',
                			timeout:2000,
                			showType:'fade'
                		});
                		return false;
                	}
                	
                	
                	 $.ajax({
    			         type: "POST",
    			         url: "/home/admin/addGroup",
    			         data: {
    			        	 'groupCode':groupCode, 
    			        	 'groupName':groupName, 
    			        	 'domain':domain, 
    			        	 'typeId':typeId, 
    			        	 'parent':parent, 
    			        	 'groupInfo':groupInfo
    			         },
    			         dataType: "json",
    			         success: function(data){
    			        	$('#form1').window("close");
    			        	if(data.success){
    			        		$("#dg").datagrid("load");
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


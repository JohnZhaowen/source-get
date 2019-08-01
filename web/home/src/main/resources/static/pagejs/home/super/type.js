//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;   
    if(eth==="查看资源类型"){
    	thisPage.sourceTypes(row.typeId);
    	return;
    }
    
    if(eth==="修改"){
    	thisPage.groupTypeModify(row.tag, row.typeId, row.typeName);
    	return;
    }
    
    if(eth==="删除"){
    	var msg;
    	var id;
    	if(row.tag === '0'){//组类型
    		msg = '删除组类型会导致该组类型对应的所有资源类型也被删除；删除前，请确保该组类型没有被使用，否则会导致删除失败。是否确定要删除该组类型?';
    		id = '#dg';
    	} else if(row.tag === '1'){
    		msg = '删除前，请确保该资源类型没有被使用，否则会导致删除失败。是否确定要删除该资源类型？';
    		id = '#dgwin1';
    	}
    	thisPage.typeDel(row.typeId, msg, id);
    	return;
    }

    thisPage.pc(f,tabId,row);
};
//<#--回掉函数-->
thisPage.init = function(){
    _("#sform").form({
    	title:'组类型/资源类型管理',
    	window:false,
    	columnsNun:2,
    	columns:[
    		{field:'组类型id',name:"typeId",type:'text'},
    		{field:'组类型名称',name:"typeName",type:'text'}
    	],
    	after:function(){
    	},
    	button:false
    });

    var columns=thisPage.layout.supertype({title:'操作',field:'operation',width:120,type:'button',button:['查看资源类型','删除','修改']});

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
                {field:"新增组类型",icon:"icon-add",
                    click:function(){
                    	thisPage.addGroupType();
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

thisPage.addGroupType = function(){
    if($('#form1').data("init") == undefined || $('#form1').data("init") != true){
        $('#form1').window({
            title : '组类型新增',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("form1").form({
            window:false,
            columnsNun:1,
            columns:[
            	{field:'组类型名称',name:"groupTypeName", id:'groupTypeName', type:'text'},
            ],
            after:function(){
            },
            button:[{
                field:"提交",
                check:true,
                onclick:function(){
                	 $.ajax({
    			         type: "POST",
    			         url: "/home/super/typeAdd",
    			         data: {'tag':'0', 'typeName':$('#groupTypeName').val()},
    			         dataType: "json",
    			         success: function(data){
    			        	_("form1").form("clear");
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

thisPage.addSourceType = function(){
	if($('#form2').data("init") == undefined || $('#form2').data("init") != true){
		$('#form2').window({
			title : '资源类型新增',
			width : $(window).width() * 0.5,
			height: $(window).height() * 0.8,
			closed : true,
			modal : true
		});
		
		_("form2").form({
			window:false,
			columnsNun:1,
			columns:[
				{field:'资源类型名称',name:"sourceTypeName", id:'sourceTypeName', type:'text'}           	
			],
			after:function(){
			},
			button:[{
				field:"提交",
				check:true,
				onclick:function(){
					$.ajax({
						type: "POST",
						url: "/home/super/typeAdd",
						data: {'tag':'1', 'typeName':$('#sourceTypeName').val(), "parentId":$("#dg").datagrid("getSelected").typeId},
						dataType: "json",
						success: function(data){
							$('#form2').window("close");
							_("form2").form("clear");
							if(data){
								$("#dgwin1").datagrid("load");
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
					$('#form2').window("close");
					$("#dgwin1").datagrid("load");
				}
			}]
		});
		
		$('#form2').data("init",true);
	}else{
	}
	
	$('#form2').window("open");
}

thisPage.sourceTypes = function(parentId){
    if($('#win1').data("init") == undefined || $('#win1').data("init") != true){
        $('#win1').window({
            title : '资源类型',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("#wform1").form({
            window:false,
            columnsNun:4,
            columns:[
            	{field:'资源类型Id',name:"typeId",type:'text'},      
            	{field:'资源类型名称',name:"typeName",type:'text'},   
            	{field:'组类型Id',name:"parentId",type:'hidden'} 
            ],
            after:function(){
            	_("wform1").form("setValue","parentId",parentId);
            },
            button:false
        });

        _('dgwin1').datagrid({
            url:"/home/super/typeList?tag=1",
            columns:[[
            	{title:'标签',field:'tag',hidden:true},
            	{title:'资源类型Id',field:"typeId", width:80},      
            	{title:'资源类型名称',field:"typeName",width:80},
            	{title:'操作',field:'operation',width:120,type:'button',id:'sourceModify',/*selfClick:true, */button:['修改','删除']}
            ]],
            /*onClickCell : function(rowIndex, field, value, e){
            	alert($('#sourceTypeId111').val());
            	console.log($('#sourceTypeId111'));
            	if(field==='operation'){
            		var html = e.target.innerHTML;
            		if(html==="修改"){
            			//thisPage.sourceTypeModify();
            		}
            	}
            },*/
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
                {field:"新增资源类型",icon:"icon-add",
                    click:function(){
                    	thisPage.addSourceType();
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
    	_("wform1").form("setValue","parentId",parentId);
		$("#dgwin1").datagrid("load", {
			parentId: parentId
		});
    }
    $('#win1').window("open");
};

thisPage.groupTypeModify = function(tag, typeId, typeName){
	
	if($('#form3').data("init") == undefined || $('#form3').data("init") != true){
		$('#form3').window({
			title : '类型修改',
			width : $(window).width() * 0.5,
			height: $(window).height() * 0.8,
			closed : true,
			modal : true
		});
		
		_("#form3").form({
			window:false,
			columnsNun:1,
			columns:[
				{field:'标识',name:"tagForModify", id:'tagForModify', type:'hidden'},          	
				{field:'类型id',name:"typeIdForModify", id:'typeIdForModify', type:'text', readOnly:'true'},          	
				{field:'类型名称',name:"typeNameForModify", id:'typeNameForModify', type:'text'}         	
			],
			after:function(){
			},
			button:[{
				field:"提交",
				check:true,
				onclick:function(){
					var sumbitTag = $('#tagForModify').val()
				
					$.ajax({
						type: "POST",
						url: "/home/super/typeModify",
						data: {'tag': sumbitTag, 'typeName':$('#typeNameForModify').val(), "typeId":$("#typeIdForModify").val()},
						dataType: "json",
						success: function(data){
							$('#form3').window("close");
							_("form3").form("clear");
							if(data.success){
								if('0' === sumbitTag){
									$("#dg").datagrid("load");
								} else if('1' === sumbitTag){
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
			},{
				field:"关闭",
				check:false,
				onclick:function(){
					$('#form3').window("close");
				}
			}]
		});
		
		$('#form3').data("init",true);
	}else{
	
	}
	_("form3").form("setValue","typeIdForModify",typeId);
	_("form3").form("setValue","typeNameForModify",typeName);
	_("form3").form("setValue","tagForModify",tag);
	$('#form3').window("open");
};

thisPage.typeDel = function(typeId, msg, id){
	$.messager.confirm('是否继续？', msg ,function(r){
		if (r){
			 $.ajax({
		         type: "POST",
		         url: "/home/super/typeDel",
		         data: {'typeId':typeId},
		         dataType: "json",
		         success: function(data){
		        	if(data.success){
		        		$(id).datagrid("load");
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
};



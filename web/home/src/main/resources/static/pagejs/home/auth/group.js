//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;
    if(eth==="资源"){
    	thisPage.groupSource(row.id);
        return;
    } 
    if(eth==="修改"){
    	thisPage.groupUpdate(row);
    	return;
    }  
    if(eth==="组成员"){
    	thisPage.groupUsers(row.id);
    	return;
    }  
    if(eth==="删除"){
    	$.messager.confirm('是否继续？', '是否确定要删除该权限组？' ,function(r){
    		if (r){
    			 $.ajax({
    		         type: "POST",
    		         url: "/home/auth/delGroup",
    		         data: {'groupId':row.id},
    		         dataType: "json",
    		         success: function(data){
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
    	});
    	return;
    } 
    if(eth==="删除组资源"){
    	
    	var groupId = $("#dg").datagrid("getSelected").id;
    	var parentId = row.groupId;
    	console.log(row);
    	
    	if(groupId != parentId){
    		$.messager.show({
				title:'错误提示: ',
				msg:'父组资源不可删除',
				timeout:2000,
				showType:'fade'
			});
    		
    		return false;
    	}
    	
    	$.messager.confirm('是否继续？', '是否确定要删除该组资源？' ,function(r){
    		if (r){
    			
    			$.ajax({
    				type: "POST",
    				url: "/home/auth/delGroupSource",
    				data: {'groupId':groupId, 'sourceId':row.id},
    				dataType: "json",
    				success: function(data){
    					console.log(data);
    					if(data.success){
    						$("#dgwin3").datagrid("load");
    						
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
    if(eth==="删除组用户"){
    	$.messager.confirm('是否继续？', '是否确定要删除该用户？' ,function(r){
    		if (r){
    			$.ajax({
    				type: "POST",
    				url: "/home/auth/delGroupUser",
    				data: {'groupId':row.groupId, 'account':row.account},
    				dataType: "json",
    				success: function(data){
    					if(data.success){
    						$("#dgwin5").datagrid("load");
    						
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
    	title:'权限组',
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

    var columns=thisPage.layout.authgroup({title:'操作',field:'operation',width:120,type:'button',button:['删除','修改','资源','组成员']});

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

thisPage.groupUpdate = function(row){
	if($('#form2').data("init") == undefined || $('#form2').data("init") != true){
		$('#form2').window({
			title : '权限组修改',
			width : $(window).width() * 0.5,
			height: $(window).height() * 0.8,
			closed : true,
			modal : true
		});
		
		_("#form2").form({
			window:false,
			columnsNun:1,
			columns:[
				{field:'分组ID',name:"idU", id:'idU', type:'text', readOnly:'true'},
				{field:'分组编号',name:"groupCodeU", id:'groupCodeU', type:'text'},
        		{field:'分组名',name:"groupNameU",id:'groupNameU', type:'text'},
        		{field:'业务域',name:"domainA",id:'domainA', type:'text', readOnly:'true'},
        		{field:'组信息',name:'groupInfoU',id:'groupInfoU', type:'text'},
        		{field:'父组ID',name:"parentA",id:'parentA', type:'combogrid', comboData:$.extend(true,{},thisPage.data.comgrid_parent)},
        		{field:'组类型',name:"typeIdA",id:'typeIdA', type:'text', readOnly:'true'}
        		],
				after:function(){
				},
				button:[{
					field:"提交",
					check:true,
					onclick:function(){
						var id = $('#idU').val();
						var groupCode = $('#groupCodeU').val();
						var groupName = $('#groupNameU').val();
						var domain = $('#domainA').val();
						var groupInfo = $('#groupInfoU').val();
						var parent = $('#parentA').val();
						var typeId = $('#typeIdA').val();
						
						if(typeId.length == 0){
							$.messager.show({
			        			title:'错误提示: ',
			        			msg:'必输参数(已用"*"号标记)不能为空',
			        			timeout:2000,
			        			showType:'fade'
			        		});
	                		return false;
						}
												
						
						$.ajax({
							type: "POST",
							url: "/home/auth/groupUpdate",
							data: {'id':id, 'groupCode':groupCode, 'groupName':groupName, 'domain':domain,
								'groupInfo':groupInfo, 'parent':parent, 'typeId':typeId
							},
							dataType: "json",
							success: function(data){
								$('#form2').window("close");
								_("form2").form("clear");
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
						_("form2").form("clear");
						$('#form2').window("close");
					}
				}]
		});
		
		$('#form2').data("init",true);
	}else{
		
	}
	_("form2").form("setValue","idU",row.id);
	_("form2").form("setValue","groupCodeU",row.groupCode);
	_("form2").form("setValue","groupNameU",row.groupName);
	_("form2").form("setValue","domainA",row.domain);
	_("form2").form("setValue","typeIdA",row.typeId);
	_("form2").form("setValue","groupInfoU",row.groupInfo);
	_("form2").form("setValue","sourcePropertyU",row.sourceProperty);
	$('#form2').window("open");
	
};

thisPage.groupSource=function(groupId){
	if($('#win3').data("init") == undefined || $('#win3').data("init") != true){
		$('#win3').window({
			title : '组关联的资源列表',
			width : $(window).width() * 0.8,
			height: $(window).height() * 0.7,
			closed : true,
			modal : true
		});
		
		_("#wform3").form({
			window:false,
			columnsNun:4,
			columns:[
				{field:'分组id',name:"groupId",type:'hidden', value:groupId},      
				{field:'资源编号',name:"sourceCode",type:'text'},      
				{field:'资源名称',name:"sourceName",type:'text'},      
				{field:'业务域',name:"domain",type:'text'},  
				{field:'类型编号',name:"typeId",type:'text'},  
				{field:'类型名称',name:"typeName",type:'text'},  
				{field:'资源信息',name:"sourceInfo",type:'text'},      
				{field:'资源属性',name:"sourceProperty",type:'text'}  
				],
				after:function(){
					// _("#wform1").form("setValue","account",account);
				},
				button:false
		});
		
		_('dgwin3').datagrid({
			url:"/home/auth/groupSource",
			columns:[[                
				{title:'资源Id',field:'id',width:200},
				{title:'组Id',field:'groupId',width:200},
				{title:'资源编号',field:'sourceCode',width:200},
				{title:'资源名称',field:'sourceName',width:200},
				{title:'业务域',field:'domain',width:200},
				{title:'类型编号',field:'typeId',width:200},
				{title:'类型名称',field:'typeName',width:200},
				{title:'资源信息',field:'sourceInfo',width:200},
				{title:'资源属性',field:'sourceProperty',width:200},
				{title:'操作',field:'operation',width:300,type:'button',id:'sourceModify',button:['删除组资源']}
				]],
				dtoolbar:[
					{field:"搜索",icon:"icon-search",
						click:function(){
							var validation_form = _("wform3").form("validation");
							_("#wform3").form("setValue","groupId",groupId);
							if(validation_form){
								$("#dgwin3").datagrid("load");
							}
						}
					},
					{field:"重置",icon:"icon-zoom_out",
						click:function(){
							_("wform3").form("clear");
						}
					},
	                {field:"新增关联资源",icon:"icon-add",
	                    click:function(){
	                    	thisPage.addGroupSource();
	                    	return;
	                    }
	                }               
					],
					pagination:true,
					onBeforeLoad:function(param){
						var serForm=_("wform3").form("serialize");
						jQuery.extend(param, serForm);
					},
					DbInfo:false
		});
		$('#win3').data("init",true);
	}else{
	}
	
	$('#win3').window("open");
	
};

thisPage.groupUsers=function(groupId){
	if($('#win5').data("init") == undefined || $('#win5').data("init") != true){
		$('#win5').window({
			title : '组成员列表',
			width : $(window).width() * 0.8,
			height: $(window).height() * 0.7,
			closed : true,
			modal : true
		});
		
		_("#wform5").form({
			window:false,
			columnsNun:4,
			columns:[
				{field:'分组id',name:"groupId",type:'hidden', value:groupId},      
				{field:'用户账号',name:"account",type:'text'}			 
				],
				after:function(){
					// _("#wform1").form("setValue","account",account);
				},
				button:false
		});
		
		_('dgwin5').datagrid({
			url:"/home/auth/groupUser",
			columns:[[                
				{title:'分组id',field:'groupId',width:200},
				{title:'用户账号',field:'account',width:200},
				{title:'操作',field:'operation',width:300,type:'button',id:'sourceModify',button:['删除组用户']}
				]],
				dtoolbar:[
					{field:"搜索",icon:"icon-search",
						click:function(){
							var validation_form = _("wform5").form("validation");
							_("#wform5").form("setValue","groupId",groupId);
							if(validation_form){
								$("#dgwin5").datagrid("load");
							}
						}
					},
					{field:"重置",icon:"icon-zoom_out",
						click:function(){
							_("wform5").form("clear");
						}
					},
					{field:"新增组用户",icon:"icon-add",
						click:function(){
							thisPage.addGroupUser();
							return;
						}
					}               
					],
					pagination:true,
					onBeforeLoad:function(param){
						var serForm=_("wform5").form("serialize");
						jQuery.extend(param, serForm);
					},
					DbInfo:false
		});
		$('#win5').data("init",true);
	}else{
		_("#wform5").form("setValue","groupId",groupId);		
		$("#dgwin5").datagrid("load");
	}
	
	$('#win5').window("open");
	
};
thisPage.addGroupSource = function(){
	if($('#form4').data("init") == undefined || $('#form4').data("init") != true){
		$('#form4').window({
			title : '新增分组资源',
			width : $(window).width() * 0.5,
			height: $(window).height() * 0.8,
			closed : true,
			modal : true
		});
		
		_("#form4").form({
			window:false,
			columnsNun:1,
			columns:[
				{field:'分组ID',name:"groupIdA", id:'groupIdA', type:'text', readOnly:'true'},
        		{field:'资源ID(*)',name:"sourceIdA",id:'sourceIdA', type:'combogrid', comboData:$.extend(true,{},thisPage.data.comgrid_source)}
        	],
			after:function(){
			},
			button:[{
				field:"提交",
				check:true,
				onclick:function(){
					var groupId = $('#groupIdA').val();
					var sourceId = $('#sourceIdA').val();
					
					if(sourceId.length == 0){
						$.messager.show({
		        			title:'错误提示: ',
		        			msg:'必输参数(已用"*"号标记)不能为空',
		        			timeout:2000,
		        			showType:'fade'
		        		});
                		return false;
					}
											
					
					$.ajax({
						type: "POST",
						url: "/home/auth/addGroupSource",
						data: {'groupId':groupId, 'sourceId':sourceId},
						dataType: "json",
						success: function(data){
							$('#form4').window("close");
							_("form4").form("clear");
							if(data.success){
								$("#dgwin3").datagrid("load");
								
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
					$('#form4').window("close");
				}
			}]
		});
		
		$('#form4').data("init",true);
	} else {
		
		
	}
	_("form4").form("setValue","groupIdA",$("#dg").datagrid("getSelected").id);
	$('#form4').window("open");
	
};
thisPage.addGroupUser = function(){
	if($('#form6').data("init") == undefined || $('#form6').data("init") != true){
		$('#form6').window({
			title : '新增分组用户',
			width : $(window).width() * 0.5,
			height: $(window).height() * 0.8,
			closed : true,
			modal : true
		});
		
		_("#form6").form({
			window:false,
			columnsNun:1,
			columns:[
				{field:'分组ID',name:"groupIdB", id:'groupIdB', type:'text', readOnly:'true'},
				{field:'用户账号',name:"accountB", id:'accountB', type:'text'}
				],
				after:function(){
				},
				button:[{
					field:"提交",
					check:true,
					onclick:function(){
						var groupId = $('#groupIdB').val();
						var account = $('#accountB').val();
						
						if(account.length == 0){
							$.messager.show({
								title:'错误提示: ',
								msg:'必输参数不能为空',
								timeout:2000,
								showType:'fade'
							});
							return false;
						}
						
						
						$.ajax({
							type: "POST",
							url: "/home/auth/addGroupUser",
							data: {'groupId':groupId, 'account':account},
							dataType: "json",
							success: function(data){
								$('#form6').window("close");
								_("form6").form("clear");
								if(data.success){
									$("#dgwin5").datagrid("load");
									
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
						$('#form6').window("close");
					}
				}]
		});
		
		$('#form6').data("init",true);
	} else {
		
		
	}
	_("form6").form("setValue","groupIdB",$("#dg").datagrid("getSelected").id);
	$('#form6').window("open");
	
};




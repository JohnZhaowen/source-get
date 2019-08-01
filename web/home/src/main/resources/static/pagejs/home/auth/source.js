//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;  
    if(eth==="删除"){
    	thisPage.sourceDel(row.id);
    	return;
    }
    if(eth==="修改"){
    	thisPage.sourceUpdate(row);
    	return;
    }

    thisPage.pc(f,tabId,row);
};
//<#--回掉函数-->
thisPage.init = function(){
    _("#sform").form({
    	title:'资源列表',
    	window:false,
    	columnsNun:2,
    	columns:[
    		{field:'资源ID',name:"id",type:'text'},
    		{field:'资源编号',name:"sourceCode",type:'text'},
    		{field:'资源名',name:"sourceName",type:'text'},
    		{field:'业务域',name:"domain",type:'text'},
    		{field:'资源信息',name:'sourceInfo',type:'text'},
    		{field:'资源属性',name:'sourceProperty',type:'text'},
    		{field:'资源类型编号',name:"typeId",type:'text'},
    		{field:'资源类型名称',name:"typeName",type:'text'}
    	],
    	after:function(){
    	},
    	button:false
    });

    var columns=thisPage.layout.authsource({title:'操作',field:'operation',width:200,type:'button',button:['删除', '修改']});

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
                {field:"新增资源",icon:"icon-add",
                    click:function(){
                    	thisPage.addSource();
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

thisPage.addSource = function(){
    if($('#form1').data("init") == undefined || $('#form1').data("init") != true){
        $('#form1').window({
            title : '资源新增',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.8,
            closed : true,
            modal : true
         });
        
        _("form1").form({
            window:false,
            columnsNun:2,
            columns:[
        		{field:'资源编号(*)',name:"sourceCode", id:'sourceCode', type:'text'},
        		{field:'资源名(*)',name:"sourceName",id:'sourceName', type:'text'},
        		{field:'业务域(*)',name:"domain",id:'domain', type:'text'},
        		{field:'资源信息(*)',name:'sourceInfo',id:'sourceInfo', type:'text'},
        		{field:'资源属性',name:'sourceProperty',id:'sourceProperty', type:'text'},
        		{field:'资源类型(*)',name:"typeId",id:'typeId', type:'combogrid', comboData:$.extend(true,{},thisPage.data.comgrid_source_type)}
            ],
            after:function(){
            },
            button:[{
                field:"提交",
                check:true,
                onclick:function(){
                	var sourceCode = $.trim($('#sourceCode').val());
                	var sourceName = $.trim($('#sourceName').val());
                	var domain = $.trim($('#domain').val());
                	var sourceInfo = $.trim($('#sourceInfo').val());
                	var typeId = $.trim($('#typeId').val());
                	var sourceProperty = $.trim($('#sourceProperty').val());
                	
                	if(sourceCode.length == 0 || sourceName.length == 0 || domain.length == 0
                			|| sourceInfo.length == 0 || typeId.length == 0){
                		$.messager.show({
		        			title:'错误提示: ',
		        			msg:'必输参数(已用"*"号标记)不能为空',
		        			timeout:2000,
		        			showType:'fade'
		        		});
                		return false;
                	}
                	
                	if(domain == 'admin' || domain == 'super'){
                		$.messager.show({
                			title:'错误提示: ',
                			msg:'业务域不可为"super"或"admin"',
                			timeout:2000,
                			showType:'fade'
                		});
                		return false;
                	}
                	
                	
                	$.ajax({
    			         type: "POST",
    			         url: "/home/auth/addSource",
    			         data: {
    			        	 'sourceCode':sourceCode, 
    			        	 'sourceName':sourceName, 
    			        	 'domain':domain, 
    			        	 'typeId':typeId, 
    			        	 'sourceProperty':sourceProperty, 
    			        	 'sourceInfo':sourceInfo
    			         },
    			         dataType: "json",
    			         success: function(data){
    			        	$('#form1').window("close");
    			        	$("#form1").form("clear");
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
};


thisPage.sourceDel = function(id){
	$.messager.confirm('是否继续？', '是否确定要删除该资源？' ,function(r){
		if (r){
			 $.ajax({
		         type: "POST",
		         url: "/home/auth/sourceDel",
		         data: {'id':id},
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
};

thisPage.sourceUpdate = function(row){
	if($('#form2').data("init") == undefined || $('#form3').data("init") != true){
		$('#form2').window({
			title : '资源修改',
			width : $(window).width() * 0.5,
			height: $(window).height() * 0.8,
			closed : true,
			modal : true
		});
		
		_("#form2").form({
			window:false,
			columnsNun:1,
			columns:[
				{field:'资源ID',name:"idU", id:'idU', type:'text', readOnly:'true'},
				{field:'资源编号',name:"sourceCodeU", id:'sourceCodeU', type:'text'},
        		{field:'资源名',name:"sourceNameU",id:'sourceNameU', type:'text'},
        		{field:'业务域',name:"domainU",id:'domainU', type:'text', readOnly:'true'},
        		{field:'资源信息',name:'sourceInfoU',id:'sourceInfoU', type:'text'},
        		{field:'资源属性',name:'sourcePropertyU',id:'sourcePropertyU', type:'text'},
        		{field:'资源类型',name:"typeIdU",id:'typeIdU', type:'text', readOnly:'true'}
				],
				after:function(){
				},
				button:[{
					field:"提交",
					check:true,
					onclick:function(){
						var typeId = $('#typeIdU').val();
						var id = $('#idU').val();
						var sourceCode = $('#sourceCodeU').val();
						var sourceName = $('#sourceNameU').val();
						var domain = $('#domainU').val();
						var sourceInfo = $('#sourceInfoU').val();
						var sourceProperty = $('#sourcePropertyU').val();
						
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
							url: "/home/auth/sourceUpdate",
							data: {'typeId':typeId, 'id':id, 'sourceCode':sourceCode, 'sourceName':sourceName, 'domain':domain,
								'sourceInfo':sourceInfo, 'sourceProperty':sourceProperty
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
						$('#form2').window("close");
					}
				}]
		});
		
		$('#form2').data("init",true);
	}else{
		
	}
	_("form2").form("setValue","idU",row.id);
	_("form2").form("setValue","typeIdU",row.typeId);
	_("form2").form("setValue","sourceCodeU",row.sourceCode);
	_("form2").form("setValue","sourceNameU",row.sourceName);
	_("form2").form("setValue","domainU",row.domain);
	_("form2").form("setValue","sourceInfoU",row.sourceInfo);
	_("form2").form("setValue","sourcePropertyU",row.sourceProperty);
	$('#form2').window("open");
	
};


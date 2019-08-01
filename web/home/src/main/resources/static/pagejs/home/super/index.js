//<#--回掉函数-->
thisPage.pageClick=function(f,tabId,selected){
    thisPage.pc(f,tabId,selected);
};
//<#--回掉函数-->
thisPage.tabOperation=function(field,row,eth,e,tabId){
	
	var currentStatus = row.currentStatus;
    var f;   
    if(eth==="成员"){
    	thisPage.member(row.id);
    	return;
    }
    
    if(eth==="资源"){
    	thisPage.source(row.id);
        return;
    }
    thisPage.pc(f,tabId,row);
};
//<#--回掉函数-->
thisPage.init = function(){
    _("#sform").form({
    	title:'成员/资源管理',
    	window:false,columnsNun:2,
    	columns:[
    	],
    	after:function(){
    	},
    	button:false
    });

    var columns=thisPage.layout.superindex({title:'操作',field:'operation',width:120,type:'button',button:['成员', '资源']});

    _('dg').datagrid(jQuery.extend(true,{},columns,{
            onBeforeLoad:function(param){
                var serForm=_("sform").form("serialize");
                jQuery.extend(param,serForm);
            },
            dtoolbar:[
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
                        $.messager.alert($.messager.defaults.message,"job名称必须以分组名开头！");
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

thisPage.member=function(groupId){
    if($('#win1').data("init") == undefined || $('#win1').data("init") != true){
        $('#win1').window({
            title : 'super组成员',
            width : $(window).width() * 0.5,
            height: $(window).height() * 0.7,
            closed : true,
            modal : true
         });
        
        _("#wform1").form({
            window:false,
            columnsNun:4,
            columns:[
            	{field:'成员账号',name:"account",type:'text'},      
            	{field:'组编号',name:"groupId",type:'hidden'}       
            ],
            after:function(){
                // _("#wform1").form("setValue","account",account);
            },
            button:false
        });

        _('dgwin1').datagrid({
            url:"/home/super/member",
            columns:[[                
            	 {title:'分组id',field:'groupId',width:80},               
                 {title:'成员账号',field:'account',width:80}                
                
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
                }               
            ],
            pagination:true,
            onBeforeLoad:function(param){
                var serForm=_("wform1").form("serialize");
                param.groupId = groupId;
                jQuery.extend(param, serForm);
            },
            DbInfo:false
        });
        $('#win1').data("init",true);
    }else{
    	//_("#wform1").form("setValue","account",account);
		$("#dgwin1").datagrid("load");
    }

     $('#win1').window("open");

};

thisPage.source=function(groupId){
	if($('#win2').data("init") == undefined || $('#win2').data("init") != true){
		$('#win2').window({
			title : 'super组资源',
			width : $(window).width() * 0.8,
			height: $(window).height() * 0.7,
			closed : true,
			modal : true
		});
		
		_("#wform2").form({
			window:false,
			columnsNun:4,
			columns:[
				{field:'资源编号',name:"sourceCode",type:'text'},      
				{field:'资源名称',name:"sourceName",type:'text'},      
				{field:'业务域',name:"domain",type:'text'},  
				{field:'资源信息',name:"sourceInfo",type:'text'},      
				{field:'资源属性',name:"sourceProperty",type:'text'}    
				],
				after:function(){
					// _("#wform1").form("setValue","account",account);
				},
				button:false
		});
		
		_('dgwin2').datagrid({
			url:"/home/super/source",
			columns:[[                
				{title:'资源编号',field:'sourceCode',width:200},
				{title:'资源名称',field:'sourceName',width:200},
				{title:'业务域',field:'domain',width:200},
				{title:'资源信息',field:'sourceInfo',width:200},
				{title:'资源属性',field:'sourceProperty',width:200}
				]],
				dtoolbar:[
					{field:"搜索",icon:"icon-search",
						click:function(){
							var validation_form = _("wform2").form("validation");
							if(validation_form){
								$("#dgwin2").datagrid("load");
							}
						}
					},
					{field:"重置",icon:"icon-zoom_out",
						click:function(){
							_("wform2").form("clear");
						}
					}               
					],
					pagination:true,
					onBeforeLoad:function(param){
						var serForm=_("wform2").form("serialize");
						param.groupId = groupId;
						jQuery.extend(param, serForm);
					},
					DbInfo:false
		});
		$('#win2').data("init",true);
	}else{
		//_("#wform1").form("setValue","account",account);
		$("#dgwin2").datagrid("load");
	}
	
	$('#win2').window("open");
	
};


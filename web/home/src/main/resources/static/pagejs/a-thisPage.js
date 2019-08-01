if(!thisPage.data){
    thisPage.data={};
}

thisPage.data.comgrid_type={
     url:"/home/admin/typesAvailable",
     /*onBeforeLoad:function(param){
    	if(!param.groupId){
    		
    		return false;
    	}
     },*/
     columns:[[
         {title:'组类型', field:'typeName', width:80, hfield:'typeId'}
     ]],
     idField: 'typeId',
     textField: 'typeName'
};

thisPage.data.comgrid_source_type={
	url:"/home/auth/sourceTypesAvailable",
	columns:[[
		{title:'资源类型', field:'typeId', width:80, hfield:'typeId'},
		{title:'所属组类型', field:'groupTypeId', width:80, hfield:'groupTypeId'}
	]],
	idField: 'typeId',
	textField: 'typeId'
};

thisPage.data.comgrid_source={
		
	url:"/home/auth/sourceAvailable",
	onShowPanel : function(){
		var getSelected = $("#dg").datagrid("getSelected");
		var g = $('#sourceIdA').combogrid('grid');	// get datagrid object
		g.datagrid('load',{
			groupId : getSelected.id,
			parent : getSelected.parent,
			domain : getSelected.domain,
			groupType : getSelected.typeId
		});
	   		 
    },
	columns:[[
		{title:'资源', field:'sourceId', width:80, hfield:'sourceId'}
	]],
	idField: 'sourceId',
	textField: 'sourceId'
};


thisPage.data.comgrid_parentForSearch={
	url:"/home/admin/parentsAvailable",
	columns:[[
		{title:'父组ID', field:'parent', width:80, hfield:'parent'}
	]],
	textField: 'parent',
	idField: 'parent'
};
thisPage.data.comgrid_parent={
     url:"/home/admin/parentsAvailable",
     onShowPanel : function(){
    	 if(!$.trim($('#typeIdA').val()) || !$.trim($('#domainA').val())){
    		 $.messager.show({
     			title:'错误提示: ',
     			msg:'请先填写业务域和组类型',
     			timeout:2000,
     			showType:'fade'
     		});
      		return false;    		 
    	 } else {
    		 var g = $('#parentA').combogrid('grid');	// get datagrid object
    			g.datagrid('load',{
    				typeId : $.trim($('#typeIdA').val()),
    				domain : $.trim($('#domainA').val()),
    				groupId : $.trim($('#idU').val())
    			});
    	 }
     },
     onBeforeLoad:function(param){
    	 if(!$.trim($('#typeIdA').val()) || !$.trim($('#domainA').val())){
    		 $.messager.show({
     			title:'错误提示: ',
     			msg:'请先填写业务域和组类型',
     			timeout:2000,
     			showType:'fade'
     		});
      		return false;    		 
    	 } else {
    		
    		param.typeId=$.trim($('#typeIdA').val());
    		param.domain=$.trim($('#domainA').val());
    		param.groupId=$.trim($('#idU').val());
    		
    	 }
     },
     columns:[[
         {title:'父组ID', field:'parent', width:80, hfield:'parent'}
     ]],
     textField: 'parent',
     idField: 'parent'
};

thisPage.data.comgrid_delTag={
     columns:[[
         {title:'状态', field:'delTag', width:180, hfield:'key'}
     ]],
     idField: 'key',
     textField: 'delTag',
     data: [
 		{delTag:'正常', key:'1'},
 		{delTag:'已删除', key:'0'}
 	]
};

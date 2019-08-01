if(!thisPage.layout){
    thisPage.layout={};
}

//super组成员与资源
thisPage.layout.superindex=function(opcl){
	if(!opcl){
		opcl={field:"sys_error_cs",hidden:true};
	}
	var obj={
			url:"/home/super/info",
			columns:[[
				{title:'组id',field:'id',width:200},
				{title:'组编号',field:'groupCode',width:200},
				{title:'分组名',field:'groupName',width:200},
				{title:'业务域',field:'domain',width:200},
				{title:'组信息',field:'groupInfo',width:200},
				opcl
				]]
	};
	return obj;
};

//组类型与资源类型管理
thisPage.layout.supertype=function(opcl){
	if(!opcl){
		opcl={field:"sys_error_cs",hidden:true};
	}
	var obj={
			url:"/home/super/typeList?tag=0",
			columns:[[
				{title:'标签',field:'tag',hidden:true},
				{title:'组类型id',field:'typeId',width:200},
				{title:'组类型名称',field:'typeName',width:200},				
				opcl
				]]
	};
	return obj;
};

//admin组成员管理
thisPage.layout.superadmins=function(opcl){
	if(!opcl){
		opcl={field:"sys_error_cs",hidden:true};
	}
	var obj={
			url:"/home/super/adminUsers",
			columns:[[
				{title:'组ID',field:'groupId',width:200},
				{title:'组编号',field:'groupCode',width:200},
				{title:'分组名',field:'groupName',width:200},
				{title:'成员账号',field:'account',width:200},				
				opcl
				]]
	};
	return obj;
};

//admin组成员列表
thisPage.layout.adminmembers=function(){
	var obj={
			url:"/home/admin/memberList",
			columns:[[
				{title:'组ID',field:'groupId',width:200},
				{title:'组编号',field:'groupCode',width:200},
				{title:'分组名',field:'groupName',width:200},
				{title:'成员账号',field:'account',width:200}				
				]]
	};
	return obj;
};

//权限组管理
thisPage.layout.admingroup=function(){
	var obj={
			url:"/home/admin/groupList",
			columns:[[
				{title:'组ID',field:"id",width:200},
	    		{title:'组编号',field:"groupCode",width:200},
	    		{title:'分组名',field:"groupName",width:200},
	    		{title:'业务域',field:"domain",width:200},
	    		{title:'组信息',field:'groupInfo',width:200},
	    		{title:'组类型编号',field:"typeId",width:200},
	    		{title:'组类型名称',field:"typeName",width:200},
				{title:'父组编号',field:"parent",width:80}
				]]
	};
	return obj;
};

//权限管理组
thisPage.layout.authmgm=function(opcl){
	if(!opcl){
		opcl={field:"sys_error_cs",hidden:true};
	}
	var obj={
			url:"/home/auth/mgmList",
			columns:[[
				{title:'组ID',field:"id",width:200},
				{title:'组编号',field:"groupCode",width:200},
				{title:'分组名',field:"groupName",width:200},
				{title:'业务域',field:"domain",width:200},
				{title:'组信息',field:'groupInfo',width:200},
				{title:'组类型编号',field:"typeId",width:200},
				{title:'组类型名称',field:"typeName",width:200},	
				{title:'所辖分组',field:"mgmId",width:80},
				opcl
				]]
	};
	return obj;
};
thisPage.layout.authgroup=function(opcl){
	if(!opcl){
		opcl={field:"sys_error_cs",hidden:true};
	}
	var obj={
			url:"/home/auth/groupList",
			columns:[[
				{title:'组ID',field:"id",width:20},
				{title:'组编号',field:"groupCode",width:80},
				{title:'分组名',field:"groupName",width:80},
				{title:'业务域',field:"domain",width:80},
				{title:'组信息',field:'groupInfo',width:80},
				{title:'组类型编号',field:"typeId",width:80},
				{title:'组类型名称',field:"typeName",width:80},
				{title:'父组编号',field:"parent",width:80},
				opcl
				]]
	};
	return obj;
};
thisPage.layout.authsource=function(opcl){
	if(!opcl){
		opcl={field:"sys_error_cs",hidden:true};
	}
	var obj={
			url:"/home/auth/sourceList",
			columns:[[
				{title:'资源ID',field:"id",width:100},
	    		{title:'资源编号',field:"sourceCode",width:200},
	    		{title:'资源名',field:"sourceName",width:200},
	    		{title:'业务域',field:"domain",width:200},
	    		{title:'资源信息',field:'sourceInfo',width:200},
	    		{title:'资源属性',field:'sourceProperty',width:200},
	    		{title:'资源类型编号',field:"typeId",width:200},
	    		{title:'资源类型名称',field:"typeName",width:200},  
	    		{title:'所属组类型编号',field:"groupTypeId",width:200},
				opcl
				]]
	};
	return obj;
};



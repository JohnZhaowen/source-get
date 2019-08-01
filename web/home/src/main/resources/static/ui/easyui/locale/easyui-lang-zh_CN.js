if ($.fn.pagination) {
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共 {pages} 页';
	$.fn.pagination.defaults.displayMsg = '显示 {from} 到 {to}，共 {total} 记录';
}

if ($.fn.datagrid) {
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍等……';
}

if ($.fn.treegrid && $.fn.datagrid) {
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}

if ($.messager) {
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
	$.messager.defaults.reset = '重置';
	$.messager.defaults.operate='操作';
	$.messager.defaults.message='消息';
	$.messager.defaults.deleted='删除';
	$.messager.defaults.date='日期不能为空！';
	$.messager.defaults.leavetype='休假配额类型不能为空!';
	$.messager.defaults.configure='配置';
	$.messager.defaults.selectR='请选择一条数据！';
	$.messager.defaults.read='请阅读公司相关政策！';
	$.messager.defaults.delR='您将删除本条数据，且不可回滚，是否继续？';
	$.messager.defaults.my97lan='zh-cn';
	$.messager.defaults.msg = '消息';
	$.messager.defaults.warning = '警告';
	$.messager.defaults.error = '错误';
	$.messager.defaults.confirm = '确定';
	$.messager.defaults.loading = '加载中……';
	$.messager.defaults.column='列';
	$.messager.defaults.order='排序';
	$.messager.defaults.asc='正序';
	$.messager.defaults.desc='倒序';
	$.messager.defaults.no='无';
	$.messager.defaults.condition='条件';
	$.messager.defaults.value='值';
	$.messager.defaults.fliter='筛选';
	$.messager.defaults.like='类似';
	$.messager.defaults.equal='相同';
	$.messager.defaults.greater ='大于';
	$.messager.defaults.less ='小于';
	$.messager.defaults.doOperation="您没有进行任何操作！";
	$.messager.defaults.startEnd="结束时间不能小于开始时间！";
	$.messager.defaults.firstSelect=function(v){
		return "请先填写字段："+v+" 的值再操作！"
	};
	$.messager.defaults.elsuccess = '公式格式正确！';
	$.messager.defaults.elfailed = '公式格式错误！';
	$.messager.defaults.noOutData = '当前没有可导出数据！';
}

if ($.fn.validatebox) {
	$.fn.validatebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的 URL 地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于 {0} 和 {1} 之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
	$.fn.validatebox.defaults.p = '请输入搜索条件……';
}

if ($.fn.numberbox) {
	$.fn.numberbox.defaults.missingMessage = '该输入项为必输项';
}

if ($.fn.combobox) {
	$.fn.combobox.defaults.missingMessage = '该输入项为必输项';
}

if ($.fn.combotree) {
	$.fn.combotree.defaults.missingMessage = '该输入项为必输项';
}

if ($.fn.combogrid) {
	$.fn.combogrid.defaults.missingMessage = '该输入项为必输项';
}

if ($.fn.calendar) {
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}

if ($.fn.datebox) {
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.datebox.defaults.formatter = function (date) {
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y + '- '+ (m < 10 ? ('0' + m) : m) + '- '+ (d < 10 ? ('0' + d) : d);
	};

//	$.fn.datebox.defaults.parser = function(s){
//		return s;
//	};
}

if ($.fn.datetimebox && $.fn.datebox) {
	$.extend($.fn.datetimebox.defaults, {
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText,
		missingMessage: $.fn.datebox.defaults.missingMessage
	});
}

var $lang = {
	TitleView: "查看",
	TitleDelete: "删除",
	TitleUpdate: "修改",
	TitleAdd: "新增",
	errAlertMsg: "不合法的日期格式，或日期超出限定范围。需要撤销吗？",
	aWeekStr: ["周","日","一","二","三","四","五","六"],
	aLongWeekStr:["周","星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
	aMonStr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一","十二"],
	aLongMonStr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	dayNamesShort:['星期日', '星期一', '星期二', '星期三','星期四', '星期五', '星期六'],
	clearStr: "清空",
	todayStr: "今天",
	okStr: "确定",
	updateStr: "确定",
	timeStr: "时间",
	quickStr: "快速选择",
	err_1: '最小日期不能大于最大日期！',
	search: '查找',
	add:"新增",
	del:"删除",
	selectemp:"选择员工",
	selinfotype : "选择信息类型",
	initdata:"初始化错误，缺少参数",
	confirmdelete:"确定删除？",
	hasdeleted:"数据已被删除",
	YES:"是",
	NO:"否",
	valiCode:"代码字段不能为空",
	valiName:"名称字段不能为空",
	valiStart:"开始日期字段不能为空",
	valiStartEnd:"开始日期不能大于结束日期",
	valiStartError:"开始日期格式错误",
	valiEndError:"结束日期格式错误",
	load:"数据加载中……",
	cancel:'取消',
	uploadError:"上传错误",
	sizeLimited:"大小为 0",
	overSize:"大小超过限制",
	cannotUpload:"无法上传",
	fileIsReadyToUpload:"成功加载到上传队列",
	uploading:"正在上传……",
	uploadSuccessful:"上传完成",
	allFilesUploadSuccessful:"所有文件上传完毕！",
	exitUpload:"取消上传！",
	stopUpload:"停止上传！",
	status1:'待审批',
	status2:'审批拒绝',
	status3:'审批通过',
	uploadFile:"上传文件:",
	chooseFile:"选择文件",
	selected:'请选择一条数据！',
	changeback:'变更后已填写部分信息将丢失!',
	chooseExportVersion:'导出设置',
	chooseVersion:'请选择导出版本',
	delaction:"是否确认删除异动/离职及其关联记录?"
		
};

if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'Page';
	$.fn.pagination.defaults.afterPageText = 'of {pages}';
	$.fn.pagination.defaults.displayMsg = 'Displaying {from} to {to} of {total} items';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'Processing, please wait ...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'Ok';
	$.messager.defaults.cancel = 'Cancel';
	$.messager.defaults.reset = 'Reset';
	$.messager.defaults.operate='operate';
	$.messager.defaults.message='message';
	$.messager.defaults.configure='configure';
	$.messager.defaults.deleted='delete';
	$.messager.defaults.selectR='please select one data first!';
	$.messager.defaults.delR='you will delete this data but  cannot rollback,are you sure?';
	$.messager.defaults.my97lan='en';
	$.messager.defaults.msg = 'Message';
	$.messager.defaults.warning = 'Warning';
	$.messager.defaults.error = 'Error';
	$.messager.defaults.loading = 'Loading...';
	$.messager.defaults.column='Column';
	$.messager.defaults.order='Order';
	$.messager.defaults.asc='Asc';
	$.messager.defaults.desc='Desc';
	$.messager.defaults.no='No';
	$.messager.defaults.condition='Condition';
	$.messager.defaults.value='Value';
	$.messager.defaults.fliter='Fliter';
	$.messager.defaults.like='Like';
	$.messager.defaults.equal='Equal';
	$.messager.defaults.greater ='Greater';
	$.messager.defaults.less ='Less';
	$.messager.defaults.startEnd="The end time cannot be less than the start time!";
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = 'This field is required.';
	$.fn.validatebox.defaults.rules.email.message = 'Please enter a valid email address.';
	$.fn.validatebox.defaults.rules.url.message = 'Please enter a valid URL.';
	$.fn.validatebox.defaults.rules.length.message = 'Please enter a value between {0} and {1}.';
	$.fn.validatebox.defaults.rules.remote.message = 'Please fix this field.';
	$.fn.validatebox.defaults.p = 'please input the search conditions...';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = 'This field is required.';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.missingMessage = 'This field is required.';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = 'This field is required.';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = 'This field is required.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['S','M','T','W','T','F','S'];
	$.fn.calendar.defaults.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = 'Today';
	$.fn.datebox.defaults.closeText = 'Close';
	$.fn.datebox.defaults.okText = 'Ok';
	$.fn.datebox.defaults.missingMessage = 'This field is required.';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText,
		missingMessage: $.fn.datebox.defaults.missingMessage
	});
}
var $lang={
		errAlertMsg: "Invalid date or the date out of range,redo or not?",
		aWeekStr: ["wk", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		aLongWeekStr:["wk","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
		aMonStr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		aLongMonStr: ["January","February","March","April","May","June","July","August","September","October","November","December"],
		clearStr: "Clear",
		todayStr: "Today",
		okStr: "OK",
		updateStr: "OK",
		timeStr: "Time",
		quickStr: "Quick Selection",
		err_1: 'MinDate Cannot be bigger than MaxDate!',
		search: 'Search',
		add:"Add",
		del:"Delete",
		selectemp:"Select Employee",
		selinfotype : "Select Info Type"
		}


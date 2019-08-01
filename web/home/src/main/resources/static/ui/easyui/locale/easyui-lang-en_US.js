if ($.fn.pagination) {
	$.fn.pagination.defaults.beforePageText = 'Page';
	$.fn.pagination.defaults.afterPageText = 'of {pages}';
	$.fn.pagination.defaults.displayMsg = 'Displaying {from} to {to} of {total} items';
}

if ($.fn.datagrid) {
	$.fn.datagrid.defaults.loadMsg = 'Processing, please wait...';
}

if ($.fn.treegrid && $.fn.datagrid) {
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}

if ($.messager) {
	$.messager.defaults.ok = 'OK';
	$.messager.defaults.cancel = 'Cancel';
	$.messager.defaults.reset = 'Reset';
	$.messager.defaults.operate='Operate';
	$.messager.defaults.message='Message';
	$.messager.defaults.deleted='delete';
	$.messager.defaults.date='Date can not be empty';
	$.messager.defaults.leavetype='Vacation quota type can not be empty!';
	$.messager.defaults.configure='Configure';
	$.messager.defaults.selectR='Please select a piece of data first!';
	$.messager.defaults.read='Please read the relevant company policy!';
	$.messager.defaults.delR = "The data will be deleted forever! This operation is unrecoverable. Continue or not?";
	$.messager.defaults.my97lan = "zh-cn";
	$.messager.defaults.msg = 'Message';
	$.messager.defaults.warning = 'Warning';
	$.messager.defaults.error = 'Error';
	$.messager.defaults.confirm = 'Confirm';
	$.messager.defaults.loading = 'Loading...';
	$.messager.defaults.column = "Column";
	$.messager.defaults.condition = "Condition";
	$.messager.defaults.value = "Value";
	$.messager.defaults.order='Order';
	$.messager.defaults.asc='Asc';
	$.messager.defaults.desc='Desc';
	$.messager.defaults.no='No';
	$.messager.defaults.fliter = "Filter";
	$.messager.defaults.like = "Similar";
	$.messager.defaults.equal = "Same";
	$.messager.defaults.greater  = "Greater than";
	$.messager.defaults.less  = "Less than";
	$.messager.defaults.doOperation="You haven't done any operation.";
	$.messager.defaults.startEnd="The end time cannot be less than the start time!";
}

if ($.fn.validatebox) {
	$.fn.validatebox.defaults.missingMessage = 'This field is required.';
	$.fn.validatebox.defaults.rules.email.message = 'Please enter a valid email address.';
	$.fn.validatebox.defaults.rules.url.message = 'Please enter a valid URL.';
	$.fn.validatebox.defaults.rules.length.message = 'Please enter a value between {0} and {1}.';
	$.fn.validatebox.defaults.rules.remote.message = 'Please correct this field.';
  $.fn.validatebox.defaults.p = 'Please enter search conditions:';
}

if ($.fn.numberbox) {
	$.fn.numberbox.defaults.missingMessage = 'This field is required.';
}

if ($.fn.combobox) {
	$.fn.combobox.defaults.missingMessage = 'This field is required.';
}

if ($.fn.combotree) {
	$.fn.combotree.defaults.missingMessage = 'This field is required.';
}

if ($.fn.combogrid) {
	$.fn.combogrid.defaults.missingMessage = 'This field is required.';
}

if ($.fn.calendar) {
	$.fn.calendar.defaults.weeks = ['S','M','T','W','T','F','S'];
	$.fn.calendar.defaults.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

if ($.fn.datebox) {
	$.fn.datebox.defaults.currentText = 'Today';
	$.fn.datebox.defaults.closeText = 'Close';
	$.fn.datebox.defaults.okText = 'OK';
	$.fn.datebox.defaults.missingMessage = 'This field is required.';
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
	TitleView: "View",
	TitleDelete: "Delete",
	TitleUpdate: "Change",
	TitleAdd: "Create",
	errAlertMsg: "Invalid date. Or the date is out of range. Redo or not?",
	aWeekStr: ["wk", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	aLongWeekStr:["wk","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
	aMonStr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	aLongMonStr: ["January","February","March","April","May","June","July","August","September","October","November","December"],
	dayNamesShort:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	clearStr: "Clear",
	todayStr: "Today",
	okStr: "OK",
	updateStr: "OK",
	timeStr: "Time",
	quickStr: "Quick Selection",
	err_1: 'Min Date can not be later than Max Date!',
	search: 'Search',
	add:"Add",
	del:"Delete",
	selectemp:"Select Employee",
	selinfotype : "Select Info Type",
	initdata:"Initialization error. Parameters are missing.",
	confirmdelete:"Are you sure to delete?",
	hasdeleted:"Data has been deleted.",
	YES:"Yes",
	NO:"No",
	valiCode:"Please enter the code.",
	valiName:"Please enter the name.",
	valiStart:"Please enter the start date.",
	valiStartEnd:"The end date must go after the start date.",
	valiStartError:"The start date is not correct.",
	valiEndError:"The end date is not correct.",
	load:"Loading data...",
	cancel:"Cancel",
	uploadError:"Upload error!",
	sizeLimited:"The size of the file is 0!",
	overSize:"Total uploaded file size has exceeded the limit!",
	cannotUpload:"Unable to upload!",
	fileIsReadyToUpload:"Successfully added to the uploading queue.",
	uploading:"Uploading...",
	uploadSuccessful:"Uploading completed!",
	allFilesUploadSuccessful:"All files have been uploaded!",
	exitUpload:"Cancel the upload!",
	stopUpload:"Stop the upload!",
	uploadFile:"Upload files:",
	chooseFile:"Choose files",
	status1:'Pending',
	status2:'Rejected',
	status3:'Approved',
	selected:'Please select a piece of data first!',
	changeback:'Some data entered will be lost after change!',
	chooseExportVersion:'Export Settings',
	chooseVersion:'Please select a version!',
	delaction:"Are you sure to delete the record?"
};

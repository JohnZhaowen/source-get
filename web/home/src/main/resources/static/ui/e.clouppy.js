/**
 * Copyright (c) 2017 zihong.cll
 */
 $.ajaxSetup({
     　　　　beforeSend: function (XMLHttpRequest) {
     　　　　    //可以设置自定义标头
                 var uri = window.location.search;
                 var re = new RegExp("" +"token"+ "=([^&?]*)", "ig");
                 var token =  ((uri.match(re))?(uri.match(re)[0].substr("token".length+1)):null);
                 if(token!="" && token!=null && token!=undefined){
                     XMLHttpRequest.setRequestHeader('Authorization', token);
                 }
     　　　　}
     　　});

(function(window,undefined){
	this.onload = function() {
		if(typeof thisPage!=='undefined'){
			if(thisPage.init){
				thisPage.init();
			}
		}
	};
	//plugins
	(function ($) {
		$.fn.my97 = function (options, params) {
			if (typeof options == "string") {
				return $.fn.my97.methods[options](this, params);
			}
			options = options || {};
			if (!WdatePicker) {
				return;
			}
			return this.each(function () {
				var data = $.data(this, "my97");
				var newOptions;
				if (data) {
					newOptions = $.extend(data.options, options);
					data.opts = newOptions;
				} else {
					newOptions = $.extend({}, $.fn.my97.defaults, $.fn.my97.parseOptions(this), options);
					$.data(this, "my97", {
						options : newOptions
					});
				}
				$(this).addClass('Wdate').click(function () {
					WdatePicker(newOptions);
				});
			});
		};
		$.fn.my97.methods = {
			options:function(target){
				return $(target).data("my97").options;
			},
			setValue : function (target, params) {
				target.val(params);
			},
			getValue : function (target) {
				return target.val();
			},
			clearValue : function (target) {
				target.val('');
			}
		};
		$.fn.my97.parseOptions = function (target) {
			return $.extend({}, $.parser.parseOptions(target,
			 ["el", "vel", "weekMethod", "lang", "skin", "dateFmt", "realDateFmt", "realTimeFmt", "realFullFmt", "minDate", "maxDate", "startDate", {
                    doubleCalendar : "boolean",
                    enableKeyboard : "boolean",
                    enableInputMask : "boolean",
                    autoUpdateOnChanged : "boolean",
                    firstDayOfWeek : "number",
                    isShowWeek : "boolean",
                    highLineWeekDay : "boolean",
                    isShowClear : "boolean",
                    isShowToday : "boolean",
                    isShowOthers : "boolean",
                    readOnly : "boolean",
                    errDealMode : "boolean",
                    autoPickDate : "boolean",
                    qsEnabled : "boolean",
                    autoShowQS : "boolean",
                    opposite : "boolean",
                    lang:'en'
                }
            ]));
		};
		$.fn.my97.defaults = {
			//dateFmt : 'yyyy-MM-dd HH:mm:ss'
			dateFmt : 'yyyy-MM-dd'
		};

		$.parser.plugins.push('my97');
	})(jQuery);
	$.extend($.fn.datebox.defaults,{
		formatter: function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+m+'-'+d;
		},
		editable:false
	});
	//defult value
	$.fn.setDefauleValue = function(defauleValue) {
//	    var defauleValue = $(this).val();
		$(this).val(defauleValue).css("color","#999");

	    return this.each(function() {
	        $(this).focus(function() {
	            if ($(this).val() == defauleValue) {
	                $(this).val("").css("color","#000");//输入值的颜色
	            }
	        }).blur(function() {
	            if ($(this).val() == "") {
	                $(this).val(defauleValue).css("color","#999");//默认值的颜色
	            }
	        });
	    });
	};
	//rewrite  can  get  disabled value
	$.fn.extend({
			serializeArray:function(){
		var p=$;
		var cc=/%20/g,cd=/\[\]$/,ce=/\r?\n/g,cf=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,cg=/^(?:select|textarea)/i;
		return this.map(function(){
				return this.elements?p.makeArray(this.elements):this}).filter(function(){
					return this.name&&(this.checked||cg.test(this.nodeName)||cf.test(this.type))
					}).map(
							function(a,b){
		var o=this;
		var c=p(this).val();
		return c==null?null:p.isArray(c)?p.map(c,function(a,c){
			return{o:o,name:b.name,value:a.replace(ce,"\r\n")}
			}):{o:o,name:b.name,value:c.replace(ce,"\r\n")}}).get();}
	});
	//rewrite
	$.extend($.fn.form.methods, {
	    serializeCs: function(jq){
	        var arrayValue = $(jq[0]).serializeArray();
			var json = {};
			$.each(arrayValue, function() {
				var item = this;
				if(item["value"]==undefined || item["value"]==""){return;}
				if (json[item["name"]]) {
					if(_().utils.is_date(item["value"])){
						var str=item["value"].replace(/-/g,'/');
						var lsDate=new Date(str).setHours(0, 0, 0, 0);
						if(item["name"]=="sysEnd"){
							lsDate=new Date(str).setHours(23,59,59,0);
						}
					    var s=lsDate.valueOf()/1000;
						json[item["name"]] = json[item["name"]] + "," +s;
						return;
					}
					json[item["name"]] = json[item["name"]] + "," + item["value"];
				} else {
					if(_().utils.is_date(item["value"])){
						var str=item["value"].replace(/-/g,'/');
						var lsDate=new Date(str).setHours(0, 0, 0, 0);
						if(item["name"]=="sysEnd"){
							lsDate=new Date(str).setHours(23,59,59,0);
						}
					    var s=lsDate.valueOf()/1000;
						json[item["name"]] = s;
						return;
					}
					json[item["name"]] = item["value"];
				}
			});
			return json;
	    },
	    serialize: function(jq){
	        var arrayValue = $(jq[0]).serializeArray();
			var json = {};
			$.each(arrayValue, function() {
				var item = this;
				if(item["value"]==undefined || item["value"]==""){return;}
				if (json[item["name"]]) {
					json[item["name"]] = json[item["name"]] + "," + item["value"];
				} else {
					if(_().utils.is_date(item["value"])){
						var str=item["value"].replace(/-/g,'/');
						var lsDate=new Date(str);
						json[item["name"]] = lsDate;
						return;
					}
					json[item["name"]] = item["value"];
				}
			});
			return json;
	    },
	    check:function(jq,c){
	        var arrayValue = $(jq[0]).serializeArray();
	        var combArray={};
	        var result=true;
	        var ajaxCheck= $(jq[0]).attr("ajaxCheck");
	        var formCode=$(jq[0]).attr("formCode");
	        var ajaxCheckData=$("body").data(formCode);
	        if(ajaxCheck && !ajaxCheckData){
	        	ajaxCheckData=_().basicAjax({
	        		url:"",
	        		data:{"formCode":formCode}
	        	});
	        	$("body").data(formCode,ajaxCheckData);
	        }
			$.each(arrayValue, function() {
				var item = this;
				var name=$(item["o"]).attr("name");
				if(combArray[name]){return;}
				combArray[name]=true;
				var value=$(item["o"]).val();
				var cla=$(item["o"]).attr("class");
				var oj;
				var cfunc=$(item["o"]).attr("cfunc");
				if($(item["o"]).is(":hidden")){
					var numBcfunc=$(jq[0]).find("input[numberboxname="+name+"]").attr("numberboxname");
					if(cla=="combo-value"){
						var combo=$(item["o"]).parent("span[class=combo]");
						if(combo.is(":hidden")){
							return;
						}
						cfunc=combo.prev("input[comboname="+name+"]").attr("cfunc");
					}else if(numBcfunc){
						var combo=$(jq[0]).find("input[numberboxname="+name+"]");
						if(combo.is(":hidden")){
							return;
						}
						cfunc=combo.attr("cfunc");
						cla="numberbox";
					}else{
						return;
					}
				}

				var func=(cfunc)?eval(cfunc):new Array();
				if(ajaxCheckData[name] && func.length==0){
					func=ajaxCheckData[name];
				}
				for(var m=0;m<func.length;m++){
					var fun=func[m]["fun"];
					var msg=func[m]["msg"];
					if(fun!=undefined){
						if(!_().checkFunction[fun](value)){
							if(cla=="combo-value"){
								oj=$(item["o"]).parent("span[class='combo']");
								oj.bind("click",function(){
									$(this).next("a").remove();
									$(this).removeClass("form_check_input");
								});
							}else if(cla=="numberbox"){
								oj=$(jq[0]).find("input[numberboxname="+name+"]");
								oj.bind("click",function(){
									$(this).next("a").remove();
									$(this).removeClass("form_check_input");
								});
							}else{
								oj=$(item["o"]);
								oj.bind("click",function(){
									$(this).next("a").remove();
									$(this).removeClass("form_check_input");
								});
							}
							oj.addClass("form_check_input");
							oj.next("a").remove();
							oj.after("<a style=\"display:inline-block;\" class=\"chingsung_exclamation\" title=\""+msg+"\"></a>");
							oj.next("a").tipTip();
							result=false;
							break;
						}
					}
				}
			});
			$.each( $(jq[0]).find("input[class*='combo-f']"), function() {
				var comboname=$(this).attr("comboname");
	        	var isc=combArray[comboname];
	        	if(!isc){
	        		var cfunc=$(this).attr("cfunc");
	        		cfunc=(cfunc)?eval(cfunc):new Array();
	        		if(ajaxCheckData[comboname] && cfunc.length==0){
	        			cfunc=ajaxCheckData[comboname];
					}
					if(cfunc){
						for(var m=0;m<cfunc.length;m++){
							var fun=cfunc[m]["fun"];
							var msg=cfunc[m]["msg"];
							var value="";
							if(!_().checkFunction[fun](value)){
								oj=$(this).next("span[class='combo']");
				        		oj.unbind( "click" ).bind("click",function(){
									$(this).next("a").remove();
									$(this).removeClass("form_check_input");
								});
				        		oj.addClass("form_check_input");
								oj.next("a").remove();
								oj.after("<a style=\"display:inline-block;\" class=\"chingsung_exclamation\" title=\""+msg+"\"></a>");
								oj.next("a").tipTip();
								result=false;
								break;
							}
						}
					}
	        	}
		    });
			return result;
	    },
	    getValue:function(jq,name){
	        var jsonValue = $(jq[0]).form("serialize");
			return jsonValue[name];
	    },
	    setValue:function(jq,name,value){
			return jq.each(function () {
					var data = {};
					data[name] = value;
					$(this).form("load",data);
			});
		}
	});
	//plugins
	$.fn.collapse = function(options) {
		var defaults = {
			closed : false
		}
		settings = $.extend({}, defaults, options);

		return this.each(function() {
			var obj = $(this);
			obj.find("legend").addClass('collapsible');
			obj.find("span").find("a").click(function() {
				if (obj.hasClass('collapsed')){
					obj.removeClass('collapsed').addClass('collapsible');
				}
				$(this).removeClass('collapsed');
				obj.children().not('legend').toggle("slow", function() {
					 if ($(this).is(":visible")){
						obj.find("legend").addClass('collapsible');
					 }else{
						obj.addClass('collapsed').find("legend").addClass('collapsed');
					 }
				 });
			});
			if (settings.closed) {
				obj.addClass('collapsed').find("legend").addClass('collapsed');
				obj.children().filter("p,img,table,ul,div,span,h1,h2,h3,h4,h5").css('display', 'none');
			}
		});
	};
	//rewrite
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter
			"S" : this.getMilliseconds() //millisecond
		};
		if(/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return format;
	};
	
	String.prototype.toBase64 = function(){
		 var b=new Base64();
	     return b.encode(this);
	}
	
	String.prototype.fBase64 = function(){
		var b=new Base64();
	     return b.decode(this);
	}

var j = (function() {
			var j = function(selector) {return new j.fn.init(selector);}
			var _d;
			var cache={};
			var mnum=0;
			j.fn = j.prototype = {
				constructor: j,
				init: function(selector) {
					_d=selector;
					return j.fn;
				},
				closeCurrentTab: function () {
					var $tabHolder = window.parent.$("#mytabs"),
							$tabHeaders = $tabHolder.find(".tabs > li"),
							$currentHeader = $tabHeaders.filter(".tabs-selected"),
							currentIndex = $tabHeaders.index($currentHeader);

					$tabHolder.tabs("close", currentIndex);
				},
				requestParameter:function(val){
					var uri = window.location.search;
					var re = new RegExp("" +val+ "=([^&?]*)", "ig");
					return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
				},
				iframeLoad:function(htmlCode){
					var d=_d;
					d=d.replace("#","");
					$.ajax({
			              type: "post",
			              url: "",
			              dataType: "json",
			              success: function (data) {
			            	  parent.document.getElementById(d).src=data.success;
			              }
			          });
				},
				divLoad:function(htmlCode){
					var d=_d;
					if(d.indexOf("#")<0){
						d="#"+d;
					}
					$.ajax({
			              type: "post",
			              url: "",
			              dataType: "json",
			              success: function (data) {
			            	$(d).load(data.success);
			              }
			          });
				},
		        loading: function (div, msg) {
		          div=div.replace("#","");
		          var panel = $("#"+div),
		          msg = (msg !== undefined) ? msg : $.fn.datagrid.defaults.loadMsg;

		          $("<div class='datagrid-mask'></div>").css({
		                display: "block",
		                width: panel.width(),
		                height: panel.height() + 30,
		                top: 0
		              })
		              .appendTo(panel);

		          $("<div class='datagrid-mask-msg'></div>").html(msg)
		              .appendTo(panel).css({
		                display: "block",
		                left: (panel.width() - $("div.datagrid-mask-msg", panel).outerWidth()) / 2,
		                top: (panel.height() - $("div.datagrid-mask-msg", panel).outerHeight()) / 2 + 30
		              });
		        },
				loaded:function (div) {
					div=div.replace("#","");
	                var panel = $("#"+div);
	                panel.find("div.datagrid-mask-msg").remove();
	                panel.find("div.datagrid-mask").remove();
		        },
		        tipsMsg:(function(msg){
		        	var d=_d;
		        	if(typeof d==="string" && d.indexOf("#")<0){
		        		d="#"+d;
		        	}
		        	var top=document.body.scrollTop+document.documentElement.scrollTop;
		        	var left=0;
		        	if(d!=undefined){
		        		top=$(d).offset().top;
		        		left=$(d).offset().left;
		        	}
		        	jQuery.messager.show({
		                title:$.messager.defaults.message,
		                msg:msg,
		                timeout:2000,
	                	showType:'show',
	                	style:{
	                		right:'',
	                		left:left,
	                		top:top+20,
	                		bottom:''
	                	}
	            	});
		        }),
				basicPageClickFilter:function(f){
					switch (f) {
					case 'lok':
						if(thisPage && thisPage.mainWin){
						}
						break;
					case 'add' :
					    break;
					case 'edi':
					    break;
					}
				},
				divided:function(x,y){
				    var z =  x%y;
				    if(z==0){
				    	return true;
				    }
				    return false;
				},
				basicSub:function(o){
					function dmsg(data){
						$.messager.show({
        	                title:$.messager.defaults.message,
        	                msg:data.msg,
        	                timeout:2000,
        	                showType:'show',
        	            	style:{
        	            		right:'',
        	            		top:'50%',
        	            		bottom:''
        	            	}
            	        });
					}
					if(o.loadId){
						_().loading(o.loadId);
					}
					$.ajax({
		                type: "post",
		                async:false,//同步
		                url: o.url,
		                dataType: "json",
		                data:o.data,
		                success: function (data) {
		                	if(o.loadId){
								_().loaded(o.loadId);
							}
		                	dmsg(data);
		                	if(typeof o.success=="function"){
		                		o.success(data);
		                	}
		                }
		              });
				},
				basicAjax:function(o,async,dataType){
					var requestData="error";
					$.ajax({
		                type: "post",
		                async:async?async:false,//同步
		                url: o.url,
		                dataType: dataType?dataType:"json",
		                data:o.data,
		                success: function (data) {
		                	requestData=data;
		                },
		                error: function (XMLHttpRequest, textStatus, errorThrown) {return "error";}
		              });
					return requestData;
				},
				basicAjaxT:function(o,async,dataType){
					$.ajax({
		                type: "post",
		                async:async?async:false,//同步
		                url: o.url,
		                dataType: dataType?dataType:"json",
		                data:o.data,
		                success: function (data) {
		                    o.success(data);
		                },
		                error: function (XMLHttpRequest, textStatus, errorThrown) {
		                    if(typeof o.error =="function"){
		                        o.error(XMLHttpRequest, textStatus, errorThrown);
		                    }
		                }
		              });
				},
				getGridColumnType:function(key){
					var d=_d;
					var data=$('#'+d).datagrid("options").columns;
					var ldata=data[data.length-1];
					for(var i=0;i<ldata.length;i++){
						var o=ldata[i];
						if(o.field==key){
							return o.type;
						}
					}
					return undefined;
				},
				pageClick:function(o){
					var type=typeof o;
					var window=o.window===undefined?"window":o.window;
					if(window.indexOf("#")<0){window="#"+window;}
					var dg=o.dg===undefined?"dg":o.dg;
					if(dg.indexOf("#")<0){dg="#"+dg;}
					$(window).data("dg",dg);
					var ff_search=o.search===undefined?"ff_search":o.search;
					var form=o.form===undefined?("chingsung_form_"+window):o.form;
					_(window).form('showButton');
					(function(type,o,dg,window,ff_search,form){
					switch (type) {
					case 'object':
						var typeO=o.type;
						switch (typeO) {
						case 'out' :
							$(dg).datagrid("getExcel");
							return true;
						case 'add' :
							var fi=$('#'+form).form("serialize");
							for(var o in fi){
								if($("#"+o).attr("disabled")=="disabled"){
									$("#"+o).removeAttr("disabled");
									$("#"+o).parent().prev().css('color','black');
								}
							}
							_(window).form("clearAll");
							_(window).form("open","add");
							break;
						case 'ser' :
							$(dg).datagrid('load',{});
							break;
						case 'del' :
							var selectedData=$(dg).datagrid('getSelected');
							var fliterDg={};
							if(selectedData==null){
								$.messager.alert($.messager.defaults.message,$.messager.defaults.selectR);
								return false;
							}else{
								function  success(data){
									if(data.success==true){
						            	  $(dg).datagrid('reload');
				                	}else{
				                		$.messager.alert($.messager.defaults.message,data.msg);
				                	}
								}

								function saveself(){
									$.ajax({
							              type: "post",
							              url: o.url,
							              dataType: "json",
							              data:fliterDg,
							              success: function (data) {
							            	  success(data);
							              }
									});
								}
								var dgD=$(dg).datagrid("options");
								var getChecked=$(dg).datagrid('getChecked');
								if(dgD.singleSelect===false && getChecked.length>0){
									if(!o.pk){
										for(var k in selectedData){
											if(k.length==7 && k.indexOf("Id")==5){
												o.pk=k;
												break;
											}
										}
									}
									var delPkColumn=new Array();
									for(var ci in getChecked){
										var c=getChecked[ci];
										delPkColumn.push(c[o.pk]);
									}
									fliterDg.selfP={delPkColumn:$.toJSON(delPkColumn)};
									$.messager.confirm($.messager.defaults.ok+'?',$.messager.defaults.delR,function(r){
									    if(r){
									    	saveself();
									    }
									});
									return true;
								}
								for(var k in selectedData){
									if(k.indexOf("Key")>0){
									    fliterDg[k]=selectedData[k];
									}
								}
								if(selectedData["id"]){
								    fliterDg["id"]=selectedData["id"];
								}
								if(o.param){
								    $.extend(fliterDg,o.param);
								}

								$.messager.confirm($.messager.defaults.ok+'?',$.messager.defaults.delR,function(r){
								    if (r){
								    	saveself();
								    }
								});
							}
							break;
						case 'edi' :
							var selectedData=$(dg).datagrid('getSelected');
							var fliterDg=selectedData;
							if(selectedData==null){
								$.messager.alert($.messager.defaults.message,$.messager.defaults.selectR);
								return false;
							}else{
								for(var k in selectedData){
									var value=selectedData[k];
									var type= typeof value;
									if(value==="string" && value.indexOf(",")>0 ){
										var strs= new Array();  
										strs=value.split(",");  
										fliterDg[k]=strs;
									}else{
										fliterDg[k]=selectedData[k];
									}
								}
								_(window).form("clear");
								_(window).form('open',"edi");
								_(window).form('load',fliterDg);
							}
							break;
						};
						if(o.filter){
							o.filter($('#'+dg).datagrid('getSelected'));
						}
						if(o.bFilter===undefined || o.bFilter===true){
							_().basicPageClickFilter(typeO);
						}
					}
					}(type,o,dg,window,ff_search,form));

					if(type==="string"){
						return eval(o)(arguments);
					}
				},
				dialog:(function(){
					var o=arguments[0];
					var type=typeof o;
					var d=_d;
					(function(type){
					switch(type){
					case 'object':
						var id=d.replace("#","");
						var fname=_(d).dialog("getIframeName");
						if($(d).attr("id")==undefined){
							$("body").append("<div id=\""+id+"\"></div>");
							if(o.iframe){
								$(d).append('<iframe name="'+fname+'" src="'+o.iframe+'" style="width: 100%; height: 100%;" frameborder="0"></iframe>');
							}
							
						}else{
							$(d).dialog("open");
							break;
						}
						if(o.width && o.width<=1){
							o.width=$(window).width()*(o.width);
						}
						if(o.height && o.height<=1){
							o.height=$(window).height()*(o.height);
						}
						$.extend(o,{
							title:o.title?o.title:$.messager.defaults.operate,
						    width:o.width?o.width:$(window).width()*0.9,
						    height:o.height?o.height:$(window).height()*0.9,
						    closed:o.closed===true?true:false,
						    modal:true,
						    cache: false,
						    resizable:true
						});
						$(d).dialog(o);
						if(!o.closed===true){
							$(d).dialog("open");
						}
						$(d).dialog('refresh', o.href); 
						break;
					}
					})(type);
					if(type==="string"){
						return eval(o)(arguments);
					}
					
					function open(){
						var d=_d;
						var arguments=arguments[0];
						$(d).dialog("open");
					}
					
					function close(){
						var d=_d;
						var arguments=arguments[0];
						$(d).dialog("close");
					}
					
					function getIframeName(){
						var d=_d;
						var arguments=arguments[0];
						var id=d.replace("#","");
						return "contentFrame_"+id;
					}
					
					function iframe(){
						var d=_d;
						var arguments=arguments[0];
						var iname=_(d).dialog("getIframeName");
						return document.getElementsByName(iname)[0].contentWindow;
					}
				}),
				singleForm:(function(){
					var o=arguments[0];
					var type=typeof o;
					var d=_d;
					(function(type){
					switch(type){
					case 'object':
						function getSingle(fco){
							var columnsHtml="";
							if(fco.selfId || fco.selfId===undefined){
								fco.id=d+"_"+fco.name+(mnum++);
							}
							if(fco.html){
								if(fco.html.indexOf("#")>=0){
									columnsHtml+=$(fco.html).html();
									$(fco.html).remove();
								}else{
									columnsHtml+=fco.html;
									}
							}
							if(fco.type && fco.type!="hidden"){
								if(fco.type=="text"){
									columnsHtml+="<input ";
								}else if(fco.type=="textarea"){
									columnsHtml+="<textarea ";
								}else{
									columnsHtml+="<input ";
								}
								if(fco.id){
									columnsHtml+="id=\""+fco.id+"\" ";
								}else{
									fco.id=fco.name+(mnum++);
									columnsHtml+="id=\""+fco.id+"\" ";
								}
								if(fco.width){
									columnsHtml+="style=\"width:"+fco.width+"px\" ";
								}
								if(fco.height){
									columnsHtml+="style=\"height:"+fco.height+"px\" ";
								}
								if(fco.type){
									columnsHtml+="type=\""+fco.type+"\" ";
								}
								if(fco.name){
									columnsHtml+="name=\""+fco.name+"\" ";
								}
								if(fco._class){
									columnsHtml+="class=\""+fco._class+"\" ";
								}
								if(fco._onfocus){
									columnsHtml+="onfocus=\""+fco._onfocus+"\" ";
								}
								if(fco.options){
									columnsHtml+="data-options=\""+fco.options+"\" ";
								}
								if(fco.cfunc){
									if((typeof fco.cfunc)=="string"){
										columnsHtml+="cfunc="+fco.cfunc+" ";
									}else{
										columnsHtml+="cfunc="+$.toJSON(fco.cfunc)+" ";
									}
								}else{
									columnsHtml+="cfunc=\"[{'fun':'isNotEmpty','msg':'"+$.fn.validatebox.defaults.missingMessage+"'}]\" ";
								}
								if(fco.type.indexOf("combo")>=0){
									columnsHtml+=" /><span class=\"btn clear-select\" id=\"clear_"+fco.id+"\">×</span>";
									clearComboValue(fco);
								}else{
									columnsHtml+="/>";
								}									
							  }
							return columnsHtml;
						}
						function clearComboValue(f){
							$("#clear_"+f.id).die().live("click",function(e){
								var disabled=$("#"+f.id).attr("disabled");
								if(disabled==="disabled" || disabled===true){
									return false;
								}
								$("#"+f.id)[f.type]('clear');
							});
						}	
						var html=getSingle(o);
						$("#"+d).empty().append(html);
						$("#"+d).data("o",o);
						$.parser.parse($("#"+d).parent());
						
						if(o.comboData){
							_("#"+o.id)[o.type](o.comboData);
						}
						break;
					}
					})(type);
					
					if(type==="string"){
						return eval(o)(arguments);
					}

					function getValue(){
						var getvalue;
						var d=_d;
						var arguments=arguments[0];
						var op=$("#"+d).data("o");
						if(op.type.indexOf("combo")>=0){
							getvalue= $("#"+op.id)[op.type]('getValue');
						}else{
							getvalue= $("#"+op.id).val();
						}
						if(_().utils.is_date(getvalue)){
							getvalue=_().utils.date2Timestamp(getvalue,op.name)
						}
						return getvalue;
					}
					
					function setValue(){
						var d=_d;
						var arguments=arguments[0];
						var op=$("#"+d).data("o");
						if(op.type.indexOf("combo")>=0){
							$("#"+op.id)[op.type]('setValue',arguments[1]);
						}else{
							$("#"+op.id).val(arguments[1]);
						}
					}
				}),
				form:(function(){
					var o=arguments[0];
					var type=typeof o;
					if(_d.indexOf("#")<0){_d="#"+_d}
					var d=_d;
					(function(type){
					switch (type) {
						case 'object':
							d=d.replace("#","");
							if($("#"+d).length===0 && o.window===false){
								return false;
							}
							o.window=(o.window==undefined || o.window==true)?true:o.window;

							o.lazyOpen=(o.lazyOpen==undefined || o.lazyOpen==true)?true:false;

							var expandData={};

							function getInput(fco){
								var columnsHtml="";
								if(fco.head){
									columnsHtml+=fco.head;
								}
								if(fco.type=="text"){
									columnsHtml+="<input ";
								}else if(fco.type=="textarea"){
									columnsHtml+="<textarea ";
								}else{
									columnsHtml+="<input ";
								}
								if(o.selfId){
									fco.id=d+"_"+fco.name+(mnum++);
								}
								if(o.nameHead){
									fco.name=o.nameHead+"-"+fco.name;
								}
								if(fco.id){
									columnsHtml+="id=\""+fco.id+"\" ";
								}else if(o.idName){
									fco.id=fco.name;
									columnsHtml+="id=\""+fco.id+"\" ";
								}else{
									fco.id=fco.name+(mnum++);
									columnsHtml+="id=\""+fco.id+"\" ";
								}
								var style="";
								if(fco.width){
									style+="width:"+fco.width+";";
								}else if(fco.type=="textarea"){
									style+="width:71%; ";
								}
								if(fco.height){
									style+="height:"+fco.height+"px;";
								}
								if(o && o.columnsNun===1){
									style+="max-width:95%; ";
								}
								columnsHtml+="style=\""+style+"\" ";
								if(fco.type==="text"){
									fco._class="validatebox";
								}
								if(fco.type==="date"){
									fco._class="datebox";
								}
								if(fco.type==="money"){
									fco.type="text";
									fco._class="numberbox";
									fco.options="precision:2,groupSeparator:','";
								}
								if(fco.type==="numberZ"){
									fco.type="text";
									fco._class="numberbox";
									fco.options="min:0";
								}
								if(fco.type){
									columnsHtml+="type=\""+fco.type+"\" ";
								}
								if(fco.name){
									columnsHtml+="name=\""+fco.name+"\" ";
								}
								if(fco._class){
									columnsHtml+="class=\"easyui-"+fco._class+"\" ";
								}
								if(fco._onfocus){
									columnsHtml+="onfocus=\""+fco._onfocus+"\" ";
								}
								if(fco.value){
									columnsHtml+="value=\""+fco.value+"\" ";
								}
								if(fco.readOnly){
									columnsHtml+="readOnly=\""+fco.readOnly+"\" ";
								}
								if(fco.disabled){
									columnsHtml+="disabled=\""+fco.disabled+"\" ";
								}
								if(fco.options){
									columnsHtml+="data-options=\""+fco.options+"\" ";
								}
								if(fco.selfValue){
									columnsHtml+="readOnly=\""+true+"\" ";
									selfValue(fco.selfValue,fco,formcolumns);
								}
								if(fco.linkage){
									linkage(fco.linkage,fco,formcolumns);
								}
								if(fco.cfunc){
									if((typeof fco.cfunc)=="string"){
										columnsHtml+="cfunc="+fco.cfunc+" ";
									}else{
										columnsHtml+="cfunc="+$.toJSON(fco.cfunc)+" ";
									}

								}else{
									columnsHtml+="cfunc=\"[{'fun':'isNotEmpty','msg':'"+$.fn.validatebox.defaults.missingMessage+"'}]\" ";
								}
								if(fco.type.indexOf("combo")>=0 || fco.type.indexOf("date")>=0){
									columnsHtml+=" /><span class=\"btn clear-select\" id=\"clear_"+fco.id+"\">×</span>";
									clearComboValue(fco);
								}else{
									columnsHtml+=" />";
								} 
								if(fco.hfield){
									 columnsHtml+="<input type=\"hidden\" name=\""+fco.hfield+"\" /></input>";
								}
								var unit="";
								if(fco.unit){
									var left=40;
									if(fco.type.indexOf("combo")<0){
										left=20;
									}
									if(typeof fco.unit==='string'){
										unit="<span style=\"margin-left:"+left+"px\">"+fco.unit+"</span>";
									}
									if(typeof fco.unit==='object'){
										unit="<span style=\"margin-left:"+left+"px\">"+getInput(fco.unit)+"</span>";
									}
								}
								return (columnsHtml+unit);
							}

							function getColumnsHtml(oc){
								var formcolumns=oc["columns"];
								var columnsNun=oc.columnsNun!=null?oc.columnsNun:2;
								var columnsHtml="";
								var i=0;
								var j=0;
								while(i<formcolumns.length){
									if(_().divided(j,columnsNun)){
										columnsHtml+="<tr valign='middle'>";
									}
									var fco=formcolumns[i];
									if(fco.expand){
										expandData[fco.name]=fco.columnIndex;
									}
									if(fco.html){
										if(fco.html.indexOf("#")>=0){
											columnsHtml+=$(fco.html).html();
											$(fco.html).remove();
										}else{
											columnsHtml+=fco.html;
											}
										i++;j++;
										continue;
									}
									var cfunc=fco.cfunc
									var mustTag="";
									if(cfunc && $.toJSON(cfunc).indexOf("isNotEmpty")>=0){
										mustTag="<span style=\"color:red\">*</span>";
									}
									if(fco.type && fco.type!="hidden"){
										columnsHtml+="<td class=\"form_table_title\"><label>"+fco.field+":"+mustTag+"</label></td>";
										if(fco.type==="checkBok" || fco.type==="radio"){
											var g=fco[fco.type];
											columnsHtml+="<td  valign='middle'>";
											for(var n=0;n<g.length;n++){
												var gl=g[n];
												var id=fco.name+n;
												if(fco.type==="groupCheckBok"){
													columnsHtml+="<input style=\"display:inline-block;\" type=\""+fco.type+"\" name=\""+gl.name+"\" id=\""+gl.name+"\" />";
												}
												if(fco.type==="radio"){
													columnsHtml+="<input style=\"display:inline-block;\" id=\""+id+"\" type=\""+fco.type+"\" name=\""+fco.name+"\"  value=\""+gl.value+"\"/>";
												}
												columnsHtml+="<label style=\"display:inline-block;\" for=\""+id+"\">"+gl.field+"</label><span style='width:5px;'></span>";
											}
											columnsHtml+="</td>";
											i++;j++;
											continue;
										}
										if(fco.type==="group"){
											columnsHtml+="<td  valign='middle'>";
											var g=fco[fco.type];
											for(var index=0;index<g.length;index++){
												columnsHtml+=g[index].field+":"+getInput(g[index]);
											}
											columnsHtml+="</td><td valign='middle' field=\""+fco.name+"\" width=\"20px\"><div></div></td>";
											i++;j++;
											continue;
										}
										columnsHtml+="<td  valign='middle'> ";
										columnsHtml+=getInput(fco)+"</td><td valign='middle' field=\""+fco.name+"\" width=\"20px\"><div></div></td>";
										j++;
									  }
									 if(fco.type && fco.type=="hidden" || fco.hidden){
										 if(o.nameHead){
												fco.name=o.nameHead+"-"+fco.name;
										 }
										 columnsHtml+="<input type=\"hidden\" name=\""+fco.name+"\" ";
										 if(fco.value){
											columnsHtml+="value=\""+fco.value+"\" ";
										 }
										 if(fco.name=="reftable"){
												columnsHtml+="reftable=\""+fco.value+"\" ";
										 }
										 if(fco.id){
												columnsHtml+="id=\""+fco.id+"\" ";
											 }
										 columnsHtml+=" /></input>";
									 }
									 if(_().divided(j,columnsNun)){
										 columnsHtml+="</tr>";
									 }
									 i++;
							}
							return columnsHtml;
						}
							
						function clearComboValue(f){
							$("#clear_"+f.id).die().live("click",function(e){
								var disabled=$("#"+f.id).attr("disabled");
								if(disabled==="disabled" || disabled===true){
									return false;
								}
								$("#"+f.id)[f.type]('clear');
								clearChild(f.name);
							});
						}
						
						function getChildObj(name){
							var i=0;
							while(i<formcolumns.length){
								var linkage=formcolumns[i].linkage;
								if(linkage && linkage.getValue===name){
									return formcolumns[i];
									break;
								}
								i++;
							}
							return null;
						}
						
						function clearChild(name){
							var f=getChildObj(name);
							if(f!=null){
								$("#"+f.id)[f.type]('clear');
								clearChild(f.name);
							}
						}
						
						function linkage(t,f,fc){
							if(typeof t==="string"){
								t=eval(t);
							}
							
							if(f.type.indexOf("combo")===0){
								var comboData=f.comboData;
								var getValue=t.getValue;
								var getObject;
								var i=0;
								while(i<fc.length){
									if(fc[i].name===getValue){
										getObject= fc[i];
										break;
									}
									i++;
								}
								if(getObject){
									var sonShowPanel=false;
									$.extend(comboData,{
										sonBeforeLoad:function(param){
											var getRv;
											if(getObject.type.indexOf("combo")===0){
												if($("#"+getObject.id).hasClass("combo-f")){
													getRv=$("#"+getObject.id)[getObject.type]("getValue");
												}
											}else{
												getRv=$("#"+getObject.id).val();
											}
											if(getRv==="" || getRv===null || getRv===undefined){
												$("#"+f.id)[f.type]("hidePanel");
												if(sonShowPanel){
													 _(f.id+"_").tipsMsg($.messager.defaults.firstSelect("<b>"+getObject.field+"</b>"));
												}
												return false;
											}else{
												param[getObject.name]=getRv;
											}
										},
										sonShowPanel:function(){
											sonShowPanel=true;
											$("#"+f.id)[f.type]('grid').datagrid("reload");
										}
									});
									f.comboData=comboData;
									
								}
								if(getObject && getObject.type.indexOf("combo")===0){
									if(fc[i].name===getValue){
										getObject=fc[i];
										var comboData=getObject.comboData;
										$.extend(comboData,{
											onChange:function(n,o){
												if(n!=o){
													$("#"+f.id)[f.type]("clear");
													clearChild(f.name);
													$("#"+f.id)[f.type]('showPanel');
												}
											}
										});
										fc[i].comboData=comboData;
									}
								}
							}
						}
														
						function selfValue(t,f,fc){
							var selfValueO=eval(t);
							var url =selfValueO.url;
							var post={};
							var cancommit=false;
							var eObject=getEObjectByName(selfValueO.get);

							function getEObjectByName(){
								for(var o1 in fc){
									var oo=fc[o1];
									if(oo.name===selfValueO.get){
										return fc[o1];
									}
								}
								return null;
							}

							$("#"+f.id).die().live("click",function(e){
								var formType=_(d).form("getFormType");
								if(formType==="lok"){
									return false;
								}
								var thisValue=$("#"+f.id).val();
								if(thisValue!==undefined && thisValue!=="" ){
									return false;
								}
								var sysFormType=$("#"+formId).data("sys_formType");
								if(selfValueO.get!==undefined && sysFormType==="add"){
									var get=selfValueO.get;
									var getv=_(d).form("getValue",get);
									if(getv===undefined || getv===""){
										 _(f.id).tipsMsg($.messager.defaults.firstSelect(eObject.field));
									}else{
										post["getk"]=get;
										post["getv"]=getv;
										post["gcode"]=f.code;
										cancommit=true;
									}
								}else{
									post["gcode"]=f.code;
									cancommit=true;
								}

								if(cancommit){
									cancommitF();
								}
							});

							function cancommitF(){
								$.ajax({
					                type: "post",
					                url: url,
					                dataType: "json",
					                data:post,
					                success: function (data) {
					                	if(data.success==="error"){
					                		_(d).form("removeItemType",f.name,"readOnly");
					                		_(d).form("clearItemByName",f.name);
					                	}else{
					                		_(d).form("setItemType",f.name,"readOnly", true);
					                		_(d).form("setValue",f.name,data.success);
					                	}
					                }
					              });
							}


							if(eObject!==null){
								var comboData=eObject.comboData;
								$.extend(comboData,{
									onChange:function(newv,oldv){
										var formType=_(d).form("getFormType");
										if(formType==="lok"){
											return false;
										}
										post["getk"]=selfValueO.get;
										post["getv"]=newv;
										post["gcode"]=f.code;
										cancommitF();
									}
								});
								eObject[comboData]=comboData;
							}

						}

						function sysAfter(){
							var formcolumns=o["columns"];
							function initInput(fco){
								if(typeof _()[fco.type]==='function'){
									if(!fco.comboData){
										fco.comboData={};
									}
									if(o.width){fco.comboData.width=o.width;}
									_("#"+fco.id)[fco.type](fco.comboData);
								}
							}
							for(var i=0;i<formcolumns.length;i++){
								var fco=formcolumns[i];
								initInput(fco);
								if(fco.unit && typeof fco.unit==='object'){
									initInput(fco.unit);
								}
							}

							$("#"+d).panel("doLayout");
						}

							if($("#"+d).attr("id")==undefined){
								$("body").append("<div id=\""+d+"\"></div>");
							}
							var formId="chingsung_form_"+d;
							var html="<form id="+formId+" ";
							if(o.window===false){
								if(o.fstyle){
									o.fstyle=o.fstyle+";margin-top:0px";
								}else{
									o.fstyle="margin-top:0px";
								}
							}
							if(o.fstyle){
								html+=" style='"+o.fstyle+"'";
							}
							html+=">";
							var formcolumns=o["columns"];
							var htmlhidden="";
							var htmlshow="<table class=\"chingsung_font form_table\">";
							var htmlbutton="";
							var columnsNun=o.columnsNun!=null?o.columnsNun:3;
							htmlshow+=getColumnsHtml(o);

							var htmlLan="";

							var htmlcplugins="";
							if(o.cplugins){
								var cplugins=o.cplugins;
								for(var ii=0;ii<cplugins.length;ii++){
									var ocp=cplugins[ii];
									htmlcplugins+="<fieldset class=\"form_fieldset\" name=\""+ocp.name+"\"><legend class=\"chingsung_fontf\">";
									if(ocp.type && ocp.type=="checkboxToggle"){
										htmlcplugins+="<input type=\"checkbox\"  name=\""+ocp.name+"\" ";
										if(!ocp.closed){
											htmlcplugins+=" checked=\"checked\" ";
										}
										htmlcplugins+=" ></input>";
									}
									if(ocp.title){
										htmlcplugins+=ocp.title;
									}
									htmlcplugins+="</legend>";
									htmlcplugins+="<form id=\""+ocp.name+"\" name=\""+ocp.name+"\">";
									if(ocp.html){
										htmlcplugins+="<div class=\" chingsung_f ";
										if(ocp.closed){
											htmlcplugins+=" chingsung_display ";
										}
										htmlcplugins+="\">";
										htmlcplugins+=ocp.html.indexOf("#")>=0?$(ocp.html).html():ocp.html;
										$(ocp.html).remove();
										htmlcplugins+="</div></form></fieldset>";
									}else{
										htmlcplugins+="<table class=\"chingsung_font form_table chingsung_f ";
										if(ocp.closed){
											htmlcplugins+=" chingsung_display ";
										}
										htmlcplugins+="\">";
										htmlcplugins+=getColumnsHtml(ocp);
										htmlcplugins+="</table></form></fieldset>";
									}
									
									if(ocp.type && ocp.type=="checkboxToggle"){
									(function(){
										var bocp=ocp;
										$("#"+d).find("input[name="+ocp.name+"]").live("click",function(){
											var checked=$(this).attr("checked");
											if(bocp.click){
												bocp.click(this,checked);
											}
											if(checked=="checked"){
												$(this).parents("fieldset").find(".chingsung_f").removeClass("chingsung_display");
											}else{
												$(this).parents("fieldset").find(".chingsung_f").addClass("chingsung_display");
											}
										});
									})();
									}
								}
							}

							htmlshow+=htmlLan+"</table></form>";
							htmlshow+=htmlcplugins;
							html+=htmlshow;
							var button=o.button;

							function liveDefultBtClick(){
								$("#chingsung_form_sysbutton_save"+d).die("click").live("click",function(e){
									if($(this).data("click")){
										save();
									}
									$(this).data("click",false);
								});
								$("#chingsung_form_sysbutton_save"+d).die("mouseout").live("mouseout",function(e){
									$(this).data("click",false);
								});
								$("#chingsung_form_sysbutton_save"+d).die("mouseover").live("mouseover",function(e){
									$(this).data("click",true);
								});
								$("#chingsung_form_sysbutton_clear"+d).live("click",function(e){clear();});
							}
							if(button!==false){
								htmlbutton+="<div class=\"chingsung_form_sysbutton\" style=\"text-align:center;padding:15px\">";
							}
							if(button && (typeof button)=="object"){
								var beforeH="";
								var afterH="";
								var middleH="";
								for(var j=0;j<button.length;j++){
									var bo=button[j];
									var position=bo.position;
									var thisid="chingsung_form_seftbutton"+d+j;
									if(bo.id){
										thisid=bo.id;
									}
									var thishtmlbutton="<a id=\""+thisid+"\" href=\"javascript:void(0)\" class=\"btn\">"+bo.field+"</a>";
									(function(){
										var liveid=thisid;
										var livebo=bo;
										$("#"+liveid).die().live("click",function(e){
											if(livebo.check){
												if(!subCheck()){return;}
											}
											var data=serializeB();
											if(livebo.onclick){
												livebo.onclick(data,livebo.field,o,e,this);
											}
											if(livebo.close){
												if((typeof livebo.close)=="function"){
													livebo.close();
												}
												$('#'+d).window("close");
											}
										});
									})();
									if(position=="before"){
										beforeH+=thishtmlbutton;
									}else if(position=="after"){
										afterH+=thishtmlbutton;
									}else if(position=="middle"){
										middleH+=thishtmlbutton;
									}else{
										afterH+=thishtmlbutton;
									}
								}
								if(o.defultButton){
									var amfH=beforeH+"<a id=\"chingsung_form_sysbutton_save"+d+"\" href=\"javascript:void(0)\" class=\"btn\">"+$.messager.defaults.ok+"</a>"+
										middleH+"<a id=\"chingsung_form_sysbutton_clear"+d+"\" href=\"javascript:void(0)\" class=\"btn\">"+$.messager.defaults.reset+"</a>"+
										afterH;
									htmlbutton+=amfH+"</div>";
									liveDefultBtClick();
								}else{
									var amfH=beforeH+middleH+afterH;
									htmlbutton+=amfH+"</div>";
								}

							}else if(button || button==undefined){
								var defultBt="";
								defultBt+="<a id=\"chingsung_form_sysbutton_save"+d+"\"  href=\"javascript:void(0)\" class=\"btn\">"+$.messager.defaults.ok+"</a>";
								defultBt+="<a id=\"chingsung_form_sysbutton_clear"+d+"\" href=\"javascript:void(0)\" class=\"btn\">"+$.messager.defaults.reset+"</a>";
								liveDefultBtClick();
								htmlbutton+=defultBt;
							}
							html+=htmlbutton;

							function onOpen(){
								_().loaded(d);
						    	if(o.lazyOpen && !$("#"+d).data("onOpens")){
						    		sysAfter();
						    		if(o.after){
						    			o.after();
						    		}
						    		$("#"+d).data("onOpens",true);
						    	}
						    	if(o.onOpen){
						    		o.onOpen();
						    	}
							}


							$("#"+d).empty().append(html);
							$("#"+d).data("o",o);
							$("#"+d).data("expandData",expandData);
							if(o.window==true){
								if(o.width && o.width<=1){
									o.width=$(window).width()*(o.width);
								}
								if(o.height && o.height<=1){
									o.height=$(window).height()*(o.height);
								}
								$('#'+d).window({
									tools:o.windowTb?o.windowTb:'#wtb',
									title:o.title?o.title:$.messager.defaults.operate,
								    width:o.width?o.width:$(window).width()*0.7,
								    height:o.height?o.height:$(window).height()*0.6,
								    closed:(o.closed==false)?false:true,
								    minimizable:o.minimizable?true:false,
								    modal:(o.modal==false)?false:true,
								    left: null,  
									top: null,
									cls:'c6',
									onBeforeOpen:function(){
										$(this).window("options").top=null; 
										$(this).window("options").left=null; 
									},
								    onOpen:function(){
								    	onOpen();
								    },
								    onClose:function(){
								    	if(o.onCloseClr===undefined || o.onCloseClr===true){
								    		_(d).form('clear');
										}
									}
								});
							}else if((typeof o.window)=="object"){
								var windowObj=o.window;
								if(windowObj.onClose==undefined){
									$.extend(windowObj,{
								        modal:(o.modal || o.modal==false)?false:true,
										onOpen:function(){
											onOpen();
										},
										onClose:function(){
											if(o.onCloseClr===undefined || o.onCloseClr===true){
												_(d).form('clear');
											}
										}
									});
								}else if(windowObj.onClose!=undefined){
									$.extend(windowObj,{
										onOpen:function(){
											onOpen();
									    },
										modal:true
									});
								}
								$('#'+d).window(windowObj);
							}else{
								if(o.title){
									$("#"+d).panel({ 
										  title: o.title?o.title:"", 
										  collapsible:true,
										  onResize:function(){
										  },
										  bodyCls:'defultbg'
										});
								}
							};

							if(!o.window){
								sysAfter();
								if(o.after!=undefined ){
									o.after();
								}
							}else{
								if(!o.lazyOpen){
									sysAfter();
									if(o.after!=undefined ){
										o.after();
									}
								}
							}

							$.parser.parse($("#"+d).parent());

							function subCheck(){
								var checkresult=_(d).form("validation");
								if(!checkresult){
									return checkresult;
								}else{
									if(o.cpluginsCheck===false){
										return true;
									}else{
										return subCheckCplugins();
									}
								}
							}

							function subCheckCplugins(){
								var checkresult=true;
								if(o.cplugins){
									var cplugins=o.cplugins;
									for(var i=0;i<cplugins.length;i++){
										var ocp=cplugins[i];
										var columns=ocp.columns;
										if(!_(d).form("validation")){
											return false;
										}
									}
								}
								return checkresult;
							}

							function serializeB(){
								var fdoData=$("#"+formId).form("serialize");
								var sysFormType=$("#"+formId).data("sys_formType");
								fdoData["sysFormType"]=sysFormType;
								var expandDataJ={};
								var all_fields = new Array();
								var all_vals = new Array();
								var all_ci = new Array();
								for(var ofdo in expandData){
									all_fields.push(ofdo);
									all_vals.push(fdoData[ofdo]);
									all_ci.push(expandData[ofdo]);
									expandDataJ[ofdo]=fdoData[ofdo];
								}
								if(all_fields.length!=0){
									var pExpand = {"all_fields":all_fields,"all_vals":all_vals,"all_ci":all_ci};
									var pJsonExpand = $.toJSON(pExpand);
									fdoData["expandData"] = pJsonExpand;
									fdoData["expandDataJ"] = $.toJSON(expandDataJ);
								}
								if(o.cplugins){
									fdoData["cplugins"]=$.toJSON(serializeCplugins());
								}
								return fdoData;
							}

							function serializeCplugins(){
								var j={};
								$.each($("#"+d).find("fieldset").find("form"),function(){
									var json = {};
									if($(this).attr("id")==undefined){
										if(!$(this).find("table").is(":hidden")){
											$.extend(json,$(this).form("serializeCdp"));
										}
									}
									j[$(this).attr("name")]=json;
								});
								return j;
							}

							function save(){

								function success(data){
									_().loaded(d);
									if(data.success>=10 && data.success<=19){
					                	$.messager.confirm($.messager.defaults.confirm, data.msg, function(r){
					                		if (r){
					                			fdoData.continuego=true;
					                			saveself();
					                		}
					                	});
				                	}else{
				                		$.messager.show({
		                	                title:$.messager.defaults.message,
		                	                msg:data.msg,
		                	                timeout:2000,
		                	                showType:'show',
		                	            	style:{
		                	            		right:'',
		                	            		top:'50%',
		                	            		bottom:''
		                	            	}
			                	        });
				                		if(data.returnCode=="2000"){
		                					var vMsg=data.result;
		                					_(d).form("validation",vMsg);
				                			return false;
				                		}
				                		if(data.success==true){
				                			if(data.returnCode=="200"){
				                			  if(o.subsuccess==undefined){
												  $('#'+d).window('close');
												  var dg=$("#"+d).data("dg");
									              $(dg).datagrid('reload');
											  }else{
												  o.subsuccess();
											  }
				                			}
				                			return true;
				                		}
				                	}
								}

								function saveself(){
									if(fdoData.sysStart && fdoData.sysEnd
											&& fdoData.sysEnd<fdoData.sysStart){
										$.messager.alert($.messager.defaults.message,$.messager.defaults.startEnd);
										return false;
									}
									_().loading(d);
									$.ajax({
						                type: "post",
						                url: o.action,
						                dataType: "json",
						                data: fdoData,
						                success: function (data) {
						                	success(data);
						                }
						              });
								}

								if(!subCheck()){return;}
								var fdoData=serializeB();

								if(o.beforeSubmit){
									var bs=o.beforeSubmit(fdoData,saveself);
									if(!bs){
										return;
									}else{

									}
								}
								saveself();
							}

							function clear(){
								$('#'+d).find("form").form("clear");
								$('#'+d).find("form").find(".form_check_input").removeClass("form_check_input");
								$('#'+d).find(".form_check_input1").removeClass("form_check_input1");
								$('#'+d).find("form").find(".chingsung_exclamation").removeClass("chingsung_exclamation");
							}
							break;
					}
					})(type);

					if(type==="string"){
						return eval(o)(arguments);
					}

					function hideCplugins(){
						var d=_d;
						var arguments=arguments[0];
						$(d).find(".form_fieldset").hide();
					}
					
					function showCplugins(){
						var d=_d;
						var arguments=arguments[0];
						$(d).find(".form_fieldset").show();
					}
					
					function hideButton(){
						var d=_d;
						var arguments=arguments[0];
						$(d).find(".chingsung_form_sysbutton").hide();
					}

					function showButton(){
						var d=_d;
						var arguments=arguments[0];
						$(d).find(".chingsung_form_sysbutton").show();
					}

					function clearAll(){
						var d=_d;
						_(d).form("getFromObj").form("clear");
						_(d).form("getFromObj").find(".form_check_input").removeClass("form_check_input");
						_(d).form("getFromObj").find(".form_check_input1").removeClass("form_check_input1");
						_(d).form("getFromObj").find(".chingsung_exclamation").removeClass("chingsung_exclamation");
					}

					function clear(){
						var d=_d;
						_(d).form("getFromObj").form("clear");
						_(d).form("getFromObj").find(".form_check_input").removeClass("form_check_input");
						_(d).form("getFromObj").find(".form_check_input1").removeClass("form_check_input1");
						_(d).form("getFromObj").find(".chingsung_exclamation").removeClass("chingsung_exclamation");
					}

					function serialize(){
						var d=_d;
						var fdoData=_(d).form("getFromObj").form("serialize");
						var sysFormType=_(d).form("getFromObj").data("sys_formType");
						fdoData["sysFormType"]=sysFormType;
						return fdoData;
					}

					function check(){
						var d=_d;
						var arguments=arguments[0];
						return _(d).form("getFromObj").form("check");
					}

					function setFormType(){
						var d=_d;
						var arguments=arguments[0];
						_(d).form("getFromObj").data("sys_formType",arguments[1]);
					}

					function open(){
						var d=_d;
						var arguments=arguments[0];
						if(typeof arguments[1]==="string"){
							_(d).form("getFromObj").data("sys_formType",arguments[1]);
						}
						if(typeof arguments[1]==="object"){
							_(d).form("load",arguments[1],arguments[2]);
						}
						$(d).window("open");
					}

					function close(){
						var d=_d;
						var arguments=arguments[0];
						_(d).form("getFromObj").data("sys_formType",null);
						$(d).window("close");
					}

					function getFromObj(){
						var d=_d;
						return $(d).find("form");
					}

					function getFormData(){
					    var d = _d;
					    return $(d).data("o");
					}

					function clearItemByName(){
						var d=_d;
						var arguments=arguments[0];
						_(d).form("getItemByName",arguments[1]).val("");
					}

					function setValue(){
						var d=_d;
						var arguments=arguments[0];
						_(d).form("getItemByName",arguments[1]).val(arguments[2]);
					}

					function getItemByName(){
						var d=_d;
						var arguments=arguments[0];
						var o= _(d).form("getFromObj").find("input[name="+arguments[1]+"]");
						if(o.length==0){o= _(d).form("getFromObj").find("input[comboname="+arguments[1]+"]");}
						if(o.length==0){o= _(d).form("getFromObj").find("textarea[name="+arguments[1]+"]");}
						return o;
					}

					function getEObjectByName(){
						var d=_d;
						var arguments=arguments[0];
						var fo=$(d).data("o");
						var formcolumns=fo["columns"];
						for(var index in formcolumns){
							var io=formcolumns[index];
							if(io.name===arguments[1]){
								return io;
							}
						}
						return null;
					}
					
					function getIdByName(){
						var d=_d;
						var arguments=arguments[0];
						var fo=$(d).data("o");
						var formcolumns=fo["columns"];
						for(var index in formcolumns){
							var io=formcolumns[index];
							if(io.name===arguments[1]){
								return io.id;
							}
						}
						return null;
					}

					function getValue(){
						var d=_d;
						var eo=_(d).form("getEObjectByName",arguments[1]);
						if(eo!==null && eo.type==="combogrid"){
							return $("#"+eo.id).combogrid("getValue");
						}
						var arguments=arguments[0];
						var value= _(d).form("getItemByName",arguments[1]).val();
						if(_().utils.is_date(value)){
							var str=value.replace(/-/g,'/');
							var lsDate=new Date(str).setHours(0, 0, 0, 0);
							if(arguments[1]=="sysEnd"){
								lsDate=new Date(str).setHours(23,59,59,0);
							}
						    var s=lsDate.valueOf()/1000;
							return s;
						}
						return value;
					}

					function getRefTable(){
						var d=_d;
						var arguments=arguments[0];
						return _(d).form("getItemByName","reftable").attr("reftable");
					}

					function load(){
						var d=_d;
						var arguments=arguments[0];
						var data=arguments[1];
						var isfm=arguments[2];
						var fo=$(d).data("o");
						var ndata={};
						if(isfm===true && fo.nameHead){
							for(var x in data){
								if(x.indexOf(fo.nameHead)<0){
									ndata[fo.nameHead+"-"+x]=data[x];
								}else{
									ndata[x]=data[x];
								}
							}
							_(d).form("getFromObj").form("load",ndata);
						}else{
							_(d).form("getFromObj").form("load",data);
						}
					}

					function setItemType(){
						var d=_d;
						var arguments=arguments[0];
						_(d).form("getItemByName",arguments[1]).attr(arguments[2],arguments[3]);
					}

					function removeItemType(){
						var d=_d;
						var arguments=arguments[0];
						_(d).form("getItemByName",arguments[1]).removeAttr(arguments[2]);
					}

					function setFormTypeAdd(){
						var d=_d;
						_(d).form("getFromObj").data("sys_formType","add");
					}

					function setFormTypeEdi(){
						var d=_d;
						_(d).form("getFromObj").data("sys_formType","edi");
					}

					function removeFormType(){
						var d=_d;
						_(d).form("getFromObj").data("sys_formType",null);
					}
					
					function getFormType(){
						var d=_d;
						return _(d).form("getFromObj").data("sys_formType");
					}
					
					function validation(){
						function setStyle(columnsonj,msg,d){
							var ctype=_(d).form("getItemByName",columnsonj.name).attr("class");
							var type=_(d).form("getItemByName",columnsonj.name).attr("type");
							var ptd=_(d).form("getItemByName",columnsonj.name).parents("td");
							if(columnsonj.type && columnsonj.type==="group"){
								 ptd=_(d).form("getFromObj").find("td[field='"+columnsonj.field+"']").prev("td");
							}
							if(type && (type==="text" || type==="radiobox")){
								ptd.find("input").addClass("form_check_input1");
							}else if(type && (type==="hidden")){
								ptd.find(".easyui-numberbox").addClass("form_check_input1");
								ptd.find(".combo").addClass("form_check_input");
								ptd.find(".radiobox").addClass("form_check_input");
								ptd.find(".spinner").addClass("form_check_input");
							}else{
								ptd.find("input").addClass("form_check_input");
							}
							ptd.next("td").find("div").addClass("chingsung_exclamation")
							.attr("title",columnsonj.field+" "+msg+"!")
							.tipTip();
							if(type=="hidden"){
								ptd.unbind("click").bind("click",function(){
									$(this).next("td").find("div").removeClass("chingsung_exclamation")
									.removeAttr("title");
									$(this).find(".form_check_input").removeClass("form_check_input");
									$(this).find(".form_check_input1").removeClass("form_check_input1");
								});
							}else if(type && type.indexOf("my97")>0){
								_(d).form("getItemByName",columnsonj.name).bind("click",function(){
									$(this).parents("td").next("td").find("div").removeClass("chingsung_exclamation")
									.removeAttr("title");
									$(this).removeClass("form_check_input");
								});
							}else if(type && type==="radiobox"){
//								ptd.find("input").addClass("form_check_input1");
							}else{
								ptd.unbind("click").bind("click",function(){
									$(this).next("td").find("div").removeClass("chingsung_exclamation")
									.removeAttr("title");
									$(this).find(".form_check_input").removeClass("form_check_input");
									$(this).find(".form_check_input1").removeClass("form_check_input1");
								});
							}
						}
						function tocfunc(func,tvalue){
							var checkresult=true;
							for(var m=0;m<func.length;m++){
								var fun=func[m].fun;
								var msg=func[m].msg?func[m].msg:fun;
								if(fun!=undefined){
									if(!_().checkFunction[fun](tvalue)){
										if(msg.indexOf("$")>=0){msg=eval(msg);}
										checkresult=false;
										setStyle(columnsonj,msg,d);
										break;
									}
								}
							}
							return checkresult;
						}
						var d=_d;
						var arguments=arguments[0];
						var vMsg=arguments[1];
						if(vMsg){
							if(vMsg.length==0){
								return true;
							}else{
								for(var n=0;n<vMsg.length;n++){
									var msg=vMsg[n];
									if(msg.validatorSuccess===false){
										var name=msg.validatorCode;
										var columnsonj=_(d).form("getEObjectByName",name);
										if(columnsonj){
											setStyle(columnsonj,msg.validatorMsg,d);
										}
									}
								}
								return false;
							}
						}
						var fo=$(d).data("o");
						var columns=fo.columns;
						if(columns===undefined){return false;}
						var checkresult=true;
						var formValue=_(d).form("serialize");
						for(var n=0;n<columns.length;n++){
							var columnsonj=columns[n];
							if(columnsonj.html){continue;}
							if(columnsonj.type=="hidden"){continue;}
							var func=(columnsonj.cfunc)?columnsonj.cfunc:eval("[{'fun':'All','msg':'"+$.fn.validatebox.defaults.missingMessage+"'}]");
							if((typeof func)=="string" && func.indexOf("fun")>0){
								func=eval(func);
							}
							if(columnsonj.type=="group"){
								var g=columnsonj.group;
								for(var index=0;index<g.length;index++){
									var ch=formValue[g[index].name];
									if(!tocfunc(func,ch)){
										return false;
									}
								}
							}else{
								var tvalue=formValue[columnsonj.name];//_(d).form("getValue",columnsonj.name);
								if(!tocfunc(func,tvalue)){
									checkresult=false;
								}
							}
						}
						return checkresult;
					}
				}),
				forms:(function(){
					var o=arguments[0];
					var type=typeof o;
					var d=_d;
					(function(type){
					switch (type) {
						case 'object':
							if($("#"+d).length===0){
								return false;
							}
							$("#"+d).empty();
							var html="<fieldset class=\"collapsible\"><legend>";
							html+="<span><a href=\"javascript:void(0)\"></a></span>"+(o.title?o.title:"")+"";
							html+="<a id=\"cc_"+d+"\" class=\"myicon-add\"></a>";
							html+="</legend><table id=\"chingsung_fieldset_table_"+d+"\" class=\"table_form\" style=\" word-break: break-all;font-family:宋体;font-size:12px\">";
							html+="</table></fieldset>";
							$("#"+d).append(html);
							var fliters=o.fliters?o.fliters:"";
							var hfliters=o.hfliters?o.fliters:"eeId,";
							var columns=o.columns;
							var columnsN=new Array();
							var i=0;
							while(i<columns.length){
								var name=columns[i].name;
								if(columns[i]._class==="easyui-my97"){
									columns[i]._class="easyui-datebox";
								}
								if(fliters.indexOf(name)>=0){
									i++;
									continue;
								}
								if(hfliters.indexOf(name)>=0){
									columns[i].type="hidden";
									columns[i].comboData=undefined;
								}
								columnsN.push(columns[i])
								i++;
							}
							o.columns=columnsN;
							(function(){
								var thisid=d;
								var thiso=o;
								$("#cc_"+thisid).die().live("click",function(){
									var fid=d+"_form_"+(mnum++);
									$("#chingsung_fieldset_table_"+thisid).append("<tr fid="+fid+" class=\"forms_cs\"><td><div id="+fid+"></div></td></tr>");
									_(fid).form({
										window:false,
										defultButton:true,
										button:o.button?o.button:true,
										selfId:true,
										columnsNun:o.columnsNun?o.columnsNun:5,
										columns:o.columns
									});
								});
							})();
							$("#"+d).data("o",o);
							break;
					}
					})(type);
					
					if(type==="string"){
						return eval(o)(arguments);
					}
					
					function loadData(){
						var d=_d;
						if($("#"+d).length===0){
							return false;
						}
						var o=$("#"+d).data("o");
						var arguments=arguments[0];
						var data=arguments[1];
						$("#chingsung_fieldset_table_"+d).empty();
						for(var i=0;i<data.length;i++){
							var fid=d+"_form_"+(mnum++);
							$("#chingsung_fieldset_table_"+d).append("<tr fid="+fid+" class=\"forms_cs\"><td><div id="+fid+"></div></td></tr>");
							_(fid).form({
								window:false,
								defultButton:true,
								button:o.button?o.button:true,
								selfId:true,
								columnsNun:o.columnsNun?o.columnsNun:5,
								columns:o.columns
							});
							_(fid).form("load",data[i]);
						}
					}
					
					function serialize(){
						var d=_d;
						var o=$("#"+d).data("o");
						var arguments=arguments[0];
						var data=new Array();
						$(".forms_cs").each(function(){
							var fid=$(this).attr("fid");
							var sdata=_(fid).form("serialize");
							data.push(sdata);
						});
						return $.toJSON(data);
					}
					
					function deleteTr(){
						var d=_d;
						var o=$("#"+d).data("o");
						var arguments=arguments[0];
						var childO=arguments[1];
						$(childO).parents(".forms_cs").remove();
					}
				}),
				radiobox:(function(){
					var o=arguments[0];
					var type=typeof o;
					var d=_d;
					(function(type){
					switch (type) {
						case 'object':
							$(d).data("options",o);
							var name=$(d).attr("name");
							var nd=d.replace("#","");
							var id="cs_radio_"+nd;
							var html="<span id=\""+id+"\" class=\"radiobox\">";
							$.each(o.data,function(i,v) {
								html+="<label><input name=\""+name+"\" type=\"radio\" ";
								if(o.checkAll===true){
								}
								html+="value=\""+v.value+"\" ></input>"+
								v.label+" </label>";
						     });
							html+="</span>";
						$(d).after(html);
						$(d).removeAttr("name");
						$(d).attr("comboname",name);
						$(d).hide();
						$.parser.parse($("#"+id));
						break;
					}
					})(type);

					if(type==="string"){
						return eval(o)(arguments);
					}

					function options(){
						var d=_d;
						return $(d).data("options");
					}

				}),
				checkbox:(function(){
					var o=arguments[0];
					var type=typeof o;
					var d=_d;
					(function(type){
					switch (type) {
						case 'object':
							$(d).data("options",o);
							var name=$(d).attr("name");
							var nd=d.replace("#","");
							var id="cs_checkbox_"+nd;
							var html="<span id=\""+id+"\">";
							$.each(o.data,function(i,v) {
								html+="<label><input name=\""+name+"\" type=\"checkbox\" ";
								if(o.checkAll===true){
									html+=" checked=true ";
								}
								html+="value=\""+v.value+"\" ></input>"+
								v.label+" </label>";
						     });
							var click=(o.checkAll===true)?"清空":"全选";
							html+="<a class=\"all_noall\" href=\"javascript:void(0);\">"+click+"</a>";
							html+="</span>";
						$(d).after(html);
						$(d).removeAttr("name");
						$(d).attr("comboname",name);
						$(d).hide();
						$("#"+id).find(".all_noall").off().on("click",function(e){
							var value=$(this).html();
							if(value==="全选"){
								$("input[name='"+name+"']").attr("checked","checked");
								value="清空";
							}else if(value==="清空"){
								$("input[name='"+name+"']").attr("checked",false);
								value="全选";
							}
							$(this).html(value);
						});
						$.parser.parse($("#"+id));
						break;
					}
					})(type);

					if(type==="string"){
						return eval(o)(arguments);
					}

					function options(){
						var d=_d;
						return $(d).data("options");
					}

				}),
				datebox:(function(o){
					var d=_d;
					$.extend(o,{});
					$(d).datebox(o);
				}),
				datetimebox:(function(o){
					var d=_d;
					$.extend(o,{});
					$(d).datetimebox(o);
				}),
				filterGrid:(function(){
					var o=arguments[0];
					var type=typeof o;
					var d=_d+"_fg";
					(function(type){
					switch (type) {
						case 'object':
							var dg=_d;
							var option=$("#"+dg).datagrid("options");
							var columns=option.columns;
							var url=option.url;
							if($("#"+d).attr("id")==undefined){
								//$("body").append("<div id=\""+d+"\"></div>");
							}else{
								if($('#'+d).data(url+columns.length)){
									if($("#"+d).is(":hidden")){
										$("#"+d).slideDown("slow");
									}else{
										$("#"+d).slideUp("slow");
									}
									return false;
								}else{
									$('#'+d).remove();
								}
							}
							var formId=d+"_form";
							var head=columns[columns.length-1];
							var tdh="<td>"+$.messager.defaults.column+"</td>";
							var tdp="<td>"+$.messager.defaults.order+"</td>";
							var tdt="<td>"+$.messager.defaults.condition+"</td>";
							var tdv="<td>"+$.messager.defaults.value+"</td>";
							for(var i=0;i<head.length;i++){
								var fco=head[i];
								if(!fco.hidden && !fco.checkbox && fco.notfilter!==true){
									var type=fco.type?fco.type:"string";
									tdh+="<td class='datagrid-cell'>"+fco.title+"</td>";
									tdt+="<td><input name=\""+fco.field+"_key\" class=\""+type+"_t\"></input></td>";
									tdp+="<td><input type=\"radio\" class=\"orderclass\" name=\""+fco.field+"_order\" value=\"asc\" />"+$.messager.defaults.asc+"  " +
											"<input type=\"radio\"  class=\"orderclass\" name=\""+fco.field+"_order\" value=\"desc\" />"+$.messager.defaults.desc+"" +
											"<input type=\"radio\"  name=\""+fco.field+"_order\" value=\"no\" />"+$.messager.defaults.no+"</td>";
									if(type=="string"){
										tdv+="<td><input name=\""+fco.field+"_value\" class=\"easyui-validatebox\"></input></td>";
									}else if(type=="number"){
										tdv+="<td><input name=\""+fco.field+"_value\" class=\"easyui-numberbox\"></input></td>";
									}else if(type=="date"){
										tdv+="<td><input name=\""+fco.field+"_value\" class=\"easyui-my97\"></input></td>";
									}else if(type=="boolean"){
										tdv+="<td><input name=\""+fco.field+"_value\" class=\""+type+"_tv\"></input></td>";
									}else if(type=="status"){
										tdv+="<td><input name=\""+fco.field+"_value\" class=\""+type+"_tv\"></input></td>";
									}else{
										tdv+="<td><input name=\""+fco.field+"_value\" class=\"easyui-validatebox\"></input></td>";
									}
								}
							}
							var html="<form id=\""+formId+"\"><table class='datagrid-header'>" +
									"<tr class='datagrid-header-row'>"+tdh+"</tr><tr>"+tdp+"</tr><tr>"+tdt+"</tr><tr>"+tdv+"</tr></table></form>";
							var htmlbutton="<div   class=\"chingsung_form_sysbutton\" style=\"text-align:center;padding:15px\">";
							htmlbutton+="<a id=\"chingsung_fg_sysbutton_ser"+d+"\" href=\"javascript:void(0)\" class=\"btn\">"+$.messager.defaults.fliter+"</a>";
							htmlbutton+="<a id=\"chingsung_fg_sysbutton_clear"+d+"\" href=\"javascript:void(0)\" class=\"btn\">"+$.messager.defaults.reset+"</a>";
							htmlbutton+="<a id=\"chingsung_fg_sysbutton_close"+d+"\" href=\"javascript:void(0)\" class=\"btn\">"+$.fn.datebox.defaults.closeText+"</a>";
							htmlbutton+="</div>";
							html+=htmlbutton;
							$("#"+dg).parents(".datagrid").before("<div id=\""+d+"\"  " +
									"class=\"panel-body\" " +
									"style=\"height:110px;display:none;border-top-width:1px;border-color:#CCCCCC\">"+html+"</div>");

							$("#"+d).slideUp("fast").slideDown("slow",function(){
								var allwidth=$("#"+d).width();
								var tablewidth=$("#"+d).find("table").width();
								if(allwidth>tablewidth){
									$("#"+d).height(85);
								}
							});
							
							$(".orderclass").off().on("click",function(){
								var v=$(this).val();
								if(v==="asc" || v==="desc"){
									var loadparam={};
									var fgd=$("#"+formId).form("serializeCdp");
									loadparam.fg=fgd;
									$("#"+dg).datagrid('load',loadparam);
								}
							});
							
							$("#chingsung_fg_sysbutton_ser"+d).die().live("click",function(){
								var loadparam={};
								var fgd=$("#"+formId).form("serializeCdp");
								loadparam.fg=fgd;
								$("#"+dg).datagrid('load',loadparam);
							});
							$("#chingsung_fg_sysbutton_clear"+d).die().live("click",function(){
								$("#"+formId).form("clear");
								$("#"+formId).find(".form_check_input").removeClass("form_check_input");
								$("#"+formId).find(".chingsung_exclamation").removeClass("chingsung_exclamation");
							});
							$("#chingsung_fg_sysbutton_close"+d).die().live("click",function(){
								$("#"+d).slideUp("slow");
							});
							$.parser.parse($("#"+d));
							$(".string_t").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							        "id":"like",
							        "text":$.messager.defaults.like
							    },{
							    	"id":"equal",
							        "text":$.messager.defaults.equal
							    }]
							});
							$(".date_t").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							        "id":"bigthan",
							        "text":$.messager.defaults.greater
							    },{
							        "id":"smallthan",
							        "text":$.messager.defaults.less
							    },{
							    	"id":"equal",
							        "text":$.messager.defaults.equal
							    }]
							});
							$(".number_t").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							        "id":"bigthan",
							        "text":$.messager.defaults.greater
							    },{
							        "id":"smallthan",
							        "text":$.messager.defaults.less
							    },{
							    	"id":"equal",
							        "text":$.messager.defaults.equal
							    }]
							});
							$(".boolean_tv").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							        "id":"true",
							        "text":$lang.YES
							    },{
							        "id":"false",
							        "text":$lang.NO
							    }]
							});
							$(".boolean_t").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							    	"id":"equal",
							        "text":$.messager.defaults.equal
							    }]
							});
							$(".status_tv").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							        "id":"0",
							        "text":$lang.status1
							    },{
							        "id":"2",
							        "text":$lang.status2
							    },{
							    	"id":"1",
							        "text":$lang.status3
							    }]
							});
							$(".status_t").combobox({
								panelHeight:100,
							    valueField:'id',
							    textField:'text',
							    data:[{
							    	"id":"equal",
							        "text":$.messager.defaults.equal
							    }]
							});
							$('#'+d).data(url+columns.length,true);
							break;
					}
					})(type);

					if(type==="string"){
						return eval(o)(arguments);
					}

					function destory(){
						var arguments=arguments[0];
						var fid=d+"_fg";
						$("#"+fid).remove();
					}
				}),
				combobox:function(o){
					var d=_d;
					var onShowPanel=o.onShowPanel;
					$.extend(o,{
						width:o.width?o.width:200,
						editable:o.editable?o.editable:false,
						panelHeight:o.panelHeight?o.panelHeight:'auto',
						onShowPanel:function(){
							var l=$(d).combobox("getData");
							if(l.length>=8){
								$(d).combobox("panel").panel('options').height=200; 
								$(d).combobox("panel").panel('resize'); 
							}
							if(onShowPanel){
								onShowPanel();
							}
						}		
					});
					$(d).combobox(o);
				},
				searchBox:function(o){
					var d=_d;
					$.extend(o,{
						valueField: 'v',
						textField: 't',
						width:o.width?o.width:220,
						editable:true,
						panelHeight:o.panelHeight?o.panelHeight:'auto',
						filter: function (q, row) {
							var opts = $(this).combobox('options');
							q=q.Trim();
							return row[opts.textField].indexOf(q)>-1;
						},
						onBeforeLoad: function(param){
							if(o.queryParams){
								for(var k in o.queryParams){
									param[k]=o.queryParams[k];
								}
							}
						},
						onShowPanel:function(){
							var l=$(d).combobox("getData");
							if(l.length>=8){
								$(d).combobox("panel").panel('options').height=200; 
								$(d).combobox("panel").panel('resize'); 
							}
						}	
					});
					$(d).combobox(o);
					$(d).next(".combo").find(".combo-arrow").hide();
				},
				combogrid:function(o){
					var d=_d;
					if(typeof _d=="string"){
						if(_d.indexOf("#")<0){
							_d="#"+_d;
						}
						if($(d).attr("id")==undefined && $(d).attr("name")==undefined){
							return false;
						}
						var searchK="chingsung_combogrid_searchBox_"+_d.replace("#","");
						if($("#"+searchK).attr("id")==undefined){
							$("body").append("<div id=\""+searchK+"\"><input type=\"text\" style=\"width:250px;\" ></input>" +
									"<a href=\"javascript:void(0);\" class=\"myicon-search\" ></a></div>");
							$("#"+searchK).find("input").setDefauleValue($.fn.validatebox.defaults.p);
						}
					}
					var Jd=_d;
					var queryParams=o.queryParams;
					var onBeforeLoad=o.onBeforeLoad;
					o.onBeforeLoad=undefined;
					var onShowPanel=o.onShowPanel;
					o.onShowPanel=undefined;
					$.extend(o,{
						panelWidth:550,
						editable:o.editable?o.editable:false,
						fit:true,
						split:true,
						fitColumns:true,
						striped:true,
					    pagination:true,
					    onBeforeLoad:function(param){
					    	if(o.sonBeforeLoad){
					    		return o.sonBeforeLoad(param);
					    	}else{
					    		if(!$($(Jd)).data("load")){
						    		return false;
						    	}else if(onBeforeLoad){
						    		return onBeforeLoad(param);
						    	}
					    	}
					    },
					    onShowPanel:function(){
					    	if(o.sonShowPanel){
					    		return o.sonShowPanel();
					    	}else{
					    		if(!$($(Jd)).data("load")){
						    		$($(Jd)).data("load",true);
						    		$(this).combogrid('grid').datagrid("load");
						    	}
						    	if(onShowPanel){
						    		return onShowPanel();
						    	}
					    	}
					    },
					    toolbar: ("#"+searchK)
					});
					$(Jd).combogrid(o);
					$("#"+searchK).find("a").die().live("click",function(){
						var value=$("#"+searchK).find("input").val()==$.fn.validatebox.defaults.p?"":$("#"+searchK).find("input").val();
						var grid=$(Jd).combogrid("grid");
						if(o.searchClick){
							o.searchClick(value, grid);
							return false;
						}
						var p={comBoxSearching:value};
						$.extend(p,queryParams);
				    	grid.datagrid("load",p);
					});
					$("#"+searchK).find("input").die().live("keypress",function(e){
						var keyCode = e.keyCode
						if(keyCode=="13"){
							var value=$(this).val()==$.fn.validatebox.defaults.p?"":$(this).val();
							var grid=$(Jd).combogrid("grid");
							if(o.searchClick){
								o.searchClick(value, grid);
								return false;
							}
							var p={comBoxSearching:value};
							$.extend(p,queryParams);
					    	grid.datagrid("load",p);
						}
					});
				},
		        datagridWc: function (o) {
					function getFit(columns){
						var fit=true;
						var clen=0,clms=columns[columns.length-1];
						for(var x in clms){
							if(clms[x].hidden){
								continue;
							}else{
								clen++;
							}
						}
						if(clen>=15){
							fit=false;
						}else{
							fit=true;
						}
						return fit;
					}
					
			          var d = _d;
			          var onBeforeLoad=o.onBeforeLoad;
			          $.extend(o, {
			            pagination: true,
			            rownumbers: true,
			            singleSelect: true,
			            loadFilter: function (data) {
			            	if(typeof o.beforeLoadFilter==="function"){
			            		o.beforeLoadFilter(data);
			            	}
			            	if(o.columnsCache===true && $(d).data("isLoad")){
			            		return data
			            	}else{
			            		var options = $("#" + this.id).datagrid("options");
					              if (data !== null) {
					                options.columns = eval(data.columns);
					              }
					              if(getFit(options.columns)===false){
					            	  options.fitColumns=false;
					            	  $("#" + this.id).datagrid("createHeader", options);
					            	  if(data.rows.length === 0){
					            		  _().utils.scrollShow($(d));
					            	  }
					              }else{
					            	  $("#" + this.id).datagrid("createHeader", options);
					              }
					              $(d).data("isLoad",true);
					              return data;
			            	}
			            },
			            onBeforeLoad:function(param){
			            	var r=true;
							if(typeof onBeforeLoad=="function"){
								r= onBeforeLoad(param);
								if(r===false && fit===false){
									_().utils.scrollShow($(d));
								}
							}
							$(d).data("onBeforeLoadParam",param);
							return r;
				   		}
		          });
		          $(d).datagrid(o);
		        },
		        datagriddefaultparm:{
		        	iconCls:'icon-edit',//图标  
		        	height:330,
			        fitColumns:false,
			        remoteSort:false,   
			        singleSelect:true,//是否单选  
			        pagination:true,//分页控件  
			        rownumbers:true,//行号  
			        queryParams:{page:1}
		        },
		        getReportColumns:function(parm){
		        	var columns;
		        	var defultParm={
						type: "post",
						dataType: "json",
						async:false,
						success: function (data) {
							columns=eval(data.columns);
						}, 
						error: function (XMLHttpRequest, textStatus, errorThrown) {} 
					};
		        	$.extend(parm,defultParm);
		        	$.ajax(parm);
		        	return columns;
		        },
				datagrid:function(o){
					var d=_d;
					if(d.indexOf("#")<0){
						d="#"+d;
					}
					function defaultGridFormatter(){
						
					}
					//获取Grid显示列数,超过10列是Grid 出横向滚动条
					var clen=0,fit=true,clms=o.columns[o.columns.length-1];
					for(var x in clms){
					    if(clms[x].hcolumn){
					        o.columns[o.columns.length-1].push({hidden:true,field:clms[x].hcolumn});
					    }
						if(!clms[x].hidden){
							clen++;
						}
						if(clms[x].isformatter===undefined || clms[x].isformatter===true ){
							var type=clms[x].type;
							var clm=clms[x];
							if(type && typeof _().defaultGridFormatter[type]==="function"){
								(function(){
									var thistype=type;
									var thisclm=clm;
									var thisd=d;
									clms[x].formatter=function(value,rowData,rowIndex){
										if(thistype==="date" || thistype==="dateTime"){
											if(typeof value==="number"){
												rowData[thisclm.field]=_().utils[thistype](value/1000);
												return rowData[thisclm.field];
											}
										}
									return _(d).defaultGridFormatter[thistype](value,rowData,rowIndex,thisclm,thisd);
								}
								})();
							}
							if(type && type==="button"){
								(function(){
									var onClickCell=o.onClickCell;
									var cf=clms[x].field;
									var thisd=d;
								    o.onClickCell=function(rowIndex,field,value,e){
										if(field===cf && clms[x].selfClick!=true){
								        	var row=$(thisd).datagrid("getRows")[rowIndex];
								    		thisPage.tabOperation(field, row,e.target.innerHTML,e,thisd);
								    	}
										if(typeof onClickCell==="function"){
											return onClickCell(rowIndex,field,value,e);
										}
								    }
								})();
							}
							clms[x].align=clms[x].align?clms[x].align:'center';
						}
					}
					if(clen>=15){
						fit=false;
					}

					var onBeforeLoad=o.onBeforeLoad;
					var onLoadSuccess=o.onLoadSuccess;
					var onLoadError=o.onLoadError;
					o.onBeforeLoad=undefined;
					o.onLoadSuccess=undefined;
					o.onLoadError=undefined;
					if(o.pagination===undefined){
						o.pagination=true;
					}
					
					if(o.height===undefined){
					}
					var checkB=o.columns[0][0];
					if(checkB.checkbox && o.singleSelect===undefined){
						o.singleSelect=false;
					}
					
					if(o.singleSelect===undefined){
						o.singleSelect=true;
					}
					if(o.dtoolbar){
						if(typeof o.dtoolbar==="object"){
							var id="dtb_cs"+(mnum++);
						var module="<a href=\"javascript:void(0);\" field=\"${field}\" " +
								"class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-${css}',plain:true\">${view}</a>";
						var moduleself="<a href=\"javascript:void(0);\" field=\"${field}\" view=\"${view}\" " +
						"class=\"easyui-linkbutton\" data-options=\"plain:true${icon}\">${view}</a>";
						var tbhtml="<div id=\""+id+"\" style=\"display:none;\">";
						for(var x in o.dtoolbar){
							var v=o.dtoolbar[x];
							if(typeof v==="string"){
								var css=v;
								var g=module.replace("${field}",v);
								if(v==="ser"){
									css="search";
									g=g.replace("${view}","搜索");
								}else if(v==="add"){
								    css="application_form_add";
									g=g.replace("${view}","添加");
								}else if(v==="edi"){
									css="bullet_edit ";
									g=g.replace("${view}","编辑");
								}else if(v==="del"){
									css="application_delete";
									g=g.replace("${view}","删除");
								}else if(v==="out"){
									css="rightout";
									g=g.replace("${view}","导出");
								}
								g=g.replace("${css}",css);
								tbhtml+=g;
							}else if(typeof v==="object"){
								var field=v.field;
								var g=moduleself.replace("${field}","self");
								g=g.replace("${view}",field);
								g=g.replace("${view}",field);
								if(v.icon){
									g=g.replace("${icon}",",iconCls:'"+v.icon+"'");
								}else{
									g=g.replace("${icon}","");
								}
								tbhtml+=g;
							}
						}
						tbhtml+="</div>"
						if($("#"+id).length===0){
							$("body").append(tbhtml);
							$.parser.parse("#"+id);
							(function(){
							var thisd=d;
							var tbdata=o.dtoolbar;
							$("#"+id).find("a").off().on("click",function(){
								var f=$(this).attr("field");
								var selected =	$(thisd).datagrid('getSelected');
								if(f==="self"){
									var view=$(this).attr("view");
									for(var x in tbdata){
										var v=tbdata[x];
										if(view===v.field){
											if(typeof v.click==="function"){
												v.click(selected);
											}else{
												thisPage.pageClick(v.field,thisd,selected);
											}
											return true;
										}
									}
								}else{
									thisPage.pageClick(f,thisd,selected);
								}
							});
							})();
						}
						o.toolbar="#"+id;
						}//search,add,edit,remove,out
					}
					if(o.DbInfo){
						(function(){
						var thisd=d;
						var onDblClickRow=o.onDblClickRow;
						o.onDblClickRow=function(rowIndex, rowData){
							var nrowData={};
							$.extend(nrowData,rowData);
							var id="#msgtableLok"+(mnum++);
							if($(id).attr("id")===undefined){
								var fco=_().utils.gc2fc($(thisd).datagrid("options").columns,"operation");
								_(id).form({
									title:'详情',
									button:false,
									height:$(window).height()*0.7,
									columnsNun:1,
									columns:fco
								});
							}
							var c=$(thisd).datagrid("options").columns;
							var columns=c[c.length-1];
							for(var x in columns){
								var xo=columns[x];
								if(xo.formatter && typeof xo.formatter==="function"
									&& xo.type!=="long"){
									nrowData[xo.field]=xo.formatter(rowData[xo.field],rowData,x,xo,thisd);
								}
							}
							_(id).form("close");
							_(id).form("open",nrowData);
							if(typeof onDblClickRow==="function"){
								return onDblClickRow(rowIndex, rowData);
							}
						}
						})();
					}
					$.extend(o,{
					    pagination:o.pagination,
					    rownumbers:o.rownumbers===false?false:true,
					    collapsible:o.collapsible?o.collapsible:true,
					    singleSelect:o.singleSelect,
					    nowrap:o.nowrap?o.nowrap:false,
					    fitColumns:fit,
						striped:true,
						height:o.height,
						pageSize:o.pageSize?o.pageSize:10,
					    onBeforeLoad:function(param){
					    	var r=true;
					    	var sf={};
							$.extend(param,sf);
							if(onBeforeLoad){
								r= onBeforeLoad(param);
								if(r===false && fit===false){
									_().utils.scrollShow($(d));
								}
							}
							$(d).data("onBeforeLoadParam",param);
							return r;
				   		},
				   		onLoadSuccess:function(data){
				   			if (data.rows.length === 0 && fit===false) {
				   				_().utils.scrollShow($(d));
				   			}
				   			if(onLoadSuccess){
				   				return onLoadSuccess(data);
				   			}
				   		},
				   		onLoadError:function(){
				   			if(fit===false){
								_().utils.scrollShow($(d));
							}
				   			if(onLoadError){
				   				return onLoadError();
				   			}
				   		}
				   		
					});
					$(d).datagrid(o);
					if(!o.url && fit===false){
						_().utils.scrollShow($(d));
					}
				},
				pageCfg:function(f,o,r,tn){
					var d=_d;
					if($("#"+o).attr("id")==undefined){
						$("body").append("<div id=\""+o+"\"></div>");
					}else{
						$('#'+o).empty();
					}
					var subdata={"groupKey":o,"ref":r,"pageKey":thisPage.pageKey,"tn":tn};
					var cfgurl=thisPage.urlH+"/hra-py/pycommon/groupJs.do";
					$.ajax({
		                type: "post",
		                url: cfgurl,
		                dataType: "json",
		                data: subdata,
		                success: function (data) {
		                	_(o)[f]({
								 curl:thisPage.urlH+"/hra-py/pycommon/saveGroupJs.do",//?groId="+data["groId"]+"&groupKey="+o,
								 data:subdata,
								 d:d,
								 columns:data.data
							});
							$('#'+o).window('open');
		                }
		              });
				}
			};
			j.fn.init.prototype = j.fn;
			return j;
		})();
	window.j = window._ = j;
})(window);


(function($) {
	$(window).unbind("resize").resize(function () {
		$('#newsdg,#tbleditInfo,#jg,#kqaccount,#persongroup,#kqgroup1,#kqgroup2,#leavegroup,#leaveplan1,#leaveplan2,#leaveplanset1,#leaveplanset2,#leaveplanset3,#leaverecordmoveupdate,#leaverecordmove,#leaverecordset,#leaverecordbuild,#leavetype1,#leavetype2,#leaverecord,#tmperschadjust1,#personshceduling,#pubholiday1,#pubholiday2,#holidaydate,#holidaygroup,#weekwork1,#weekworksetdate,#workcalendar,#workgroup,#workplan1,#workplan2,#workplan3,#resttimedate,#workrecord1,#workrecordset,#worktype1,#worktype2,#worktype3,#worktype7,#tbleditInfo,#ss,#dg,#insuranceinfo,#result,#resultH,#spTable,#rs,#tax,#empcheckoff,#empcheckoff').datagrid('resize');
    });
}(jQuery));


//plugins
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);


$(document).on("click", ".pagination-next, .pagination-prev", function () {
  var $wrap = $(this).closest(".datagrid-wrap"),
      $gridBody = $wrap.find(".datagrid-body");

  $gridBody.scrollTop(0);
});

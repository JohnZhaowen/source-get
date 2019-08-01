/**
 * Copyright (c) 2017 zihong.cll
 */
if(_===undefined){
	var _={};
}
(function(window,undefined) {
	_.prototype.checkFunction={
			isNotEmpty:function(){
				var input0=arguments[0];
				return (input0!=null && input0!="");
			},
			All:function(){
				return true;
			},
			isNumber:function(){
				var input0=arguments[0];
				if(!_().checkFunction.isNotEmpty(input0)){return true;}
				var patrn=/^[0-9]{1,20}$/;
				if (!patrn.exec(input0)){return false;} 
				return true;
			},
			isMoney:function(){
				var input0=arguments[0];
				if(!_().checkFunction.isNotEmpty(input0)){return true;}
				if(input0<0){
				    input0=-input0;
				}
				var patrn=/^([1-9][\d]{0,7}|0)(\.[\d]{1,8})?$/; 
				if (!patrn.exec(input0)){return false;} 
				return true 
			},
			isEmail:function(){
				var input0=arguments[0];
				if(!_().checkFunction.isNotEmpty(input0)){return true;}
				var patrn=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/; 
				if (!patrn.exec(input0)){return false;} 
				return true;
			},
			isLimitLength12:function(){
				var input0=arguments[0];
				if(!_().checkFunction.isNotEmpty(input0)){return true;}
				if (input0.length!==12){return false;} 
				return true;
			}
	}
	_.prototype.utils={
		gc2fc:function(gc,f){
			var fc=new Array();
			var clms=gc[gc.length-1];
			for(var x in clms){
				if(clms[x].hidden || f.indexOf(clms[x].field)>=0){
					continue;
				}else{
					var fco={};
					if(clms[x].type==="long"){
						fco.type="textarea";
					}else{
						fco.type="text";
					}
					fco.field=clms[x].title;
					fco.name=clms[x].field;
					fco.readOnly=true;
					fc.push(fco);
				}
			}
			return fc;
		},
		gdata2loadForm:function(data,h){
			if(h){
				for(var o in data){
					data[h+"-"+o]=data[o];
				}
			}
			return data;
		},
		mul:function(arg1,arg2){ 
		    var m=0,s1=arg1.toString(),s2=arg2.toString(); 
		    try{m+=s1.split(".")[1].length;}catch(e){} 
		    try{m+=s2.split(".")[1].length;}catch(e){} 
		    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		},
		//grid format
		fmcode:function(value,code){
			if(typeof thisPage!=='undefined'){
				if(!thisPage[code]){
					var gdata=_().basicAjax({data:{"htmlType":"G","htmlCode":code},url:"/sys/cfg/getComData.do"});
					thisPage[code]=gdata;
				}
				return thisPage[code][value];
			}
		},
		date:function(value) {
	        if (value === undefined) {
	            return "";
	        }else{
	        	if(typeof value === "string"){ 
	        		var copyval=value; 
					value=new Number(value);
					if(isNaN(value)){
						return (new Date(copyval.replace(/-/g,'/')).format("yyyy-MM-dd")).toString();						
					}
				}	        		        	
	        	return (new Date(value*1000).format("yyyy-MM-dd")).toString();
	        }
        },
        dateTime:function(value) {
	        if (value === undefined) {
	            return "";
	        }else{
	        	if(typeof value === "string"){
					value=new Number(value);
				}
	        	return (new Date(value*1000).format("yyyy-MM-dd HH:mm:ss")).toString();
	        }
        },
        booleanfm:function(value){
        	if(value===true){
        		return $lang.YES;
        	}else if(value===false){
        		return $lang.NO;
        	}
        },
		is_date:function(str){var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;return reg.test(str);},
		date2Timestamp:function(data){
			var str=data.replace(/-/g,'/');
			var lsDate=new Date(str).setHours(0, 0, 0, 0);
		    var s=lsDate.valueOf()/1000;
		    return s;
		},
		is_time_c:function (str) { var reg=/^[0-9]{12,13}$/; return reg.test(str);} ,
		getPreviousDay:function(date){
			var d=new Date(date);
			var nd=new Date(d-86400000).format("yyyy-MM-dd");
			return nd;
		},
		getNextDay:function(date){
			var d=new Date(date);
			var nd=new Date((d/1000+86400)*1000).format("yyyy-MM-dd");
			return nd;
		},
		MathRounding:function(tv,t){
			function round(v,e){
				var t=1;
				for(;e>0;t*=10,e--);
				for(;e<0;t/=10,e++);
				return Math.round(_().utils.mul(v,t))/t;
			}
			
			function ceil(v,e){
				var t=1;
				for(;e>0;t*=10,e--);
				for(;e<0;t/=10,e++);
				return Math.ceil(_().utils.mul(v,t))/t;
			}
			
			function floor(v,e){
				var t=1;
				for(;e>0;t*=10,e--);
				for(;e<0;t/=10,e++);
				return Math.floor(_().utils.mul(v,t))/t;
			}
			
			function roundF(v){
				return round(v,2);
			}
			
			function roundJ(v){
				return round(v,1);
			}
			
			function roundY(v){
				return round(v,0);
			}
			
			function floorF(v){
				return floor(v,2);
			}
			
			function floorJ(v){
				return floor(v,1);
			}
			
			function floorY(v){
				return floor(v,0);
			}
			
			function ceilF(v){
				return ceil(v,2);
			}
			
			function ceilJ(v){
				return ceil(v,1);
			}
			
			function ceilY(v){
				return ceil(v,0);
			}
			
			if(typeof t ==="object"){
				var inter=parseInt(tv);
				var decer=tv-inter;
				for(var x in t){
					var rll=t[x].roundoffLowerLimit;
					var rul=t[x].roundoffUpperLimit;
					var rv=t[x].roundoffValue;
					if(decer>=rll && decer<rul){
						return (inter+rv);
					}
				}
				return tv;
			}
			
			switch (t) {
				case '0' :
					return roundF(tv);
					break;
				case '1' :
					return roundJ(tv);
					break;
				case '2' :
					return roundY(tv);
					break;
				case '3' :
					return floorY(tv);
					break;
				case '4' :
					return floorJ(tv);
					break;
				case '5' :
					return ceilY(tv);
					break;
				case '6' :
					return ceilJ(tv);
					break;	
				case '7' :
					return ceilJ(floorF(tv));
					break;	
				case '8' :
					return ceilY(floorJ(tv));
					break;
				case '10':
					return floorF(tv);
					break;
				case '11':
					return ceilF(tv);
					break;	
			}
			return roundF(tv); 
		},
		scrollShow:function(datagrid){
			datagrid.prev(".datagrid-view2").children(".datagrid-body").html("<div style='width:" + datagrid.prev(".datagrid-view2").find(".datagrid-header-row").width() + "px;border:solid 0px;height:1px;'></div>");  
		},
		pygetPageTitle:function(){
			var title=$(".heading").html();
			if(title==="" || title===undefined || title===null || title.indexOf(">")>=0){
				title=$(".pageTitle").html();
			}
			if(title==="" || title===undefined || title===null){
				title="default";
			}
			return title;
		},
		pagetPageTitle:function(){
			var title=$(".pageTitle").html();
			if(title==="" || title===undefined || title===null){
				title=$(".pageTitle").html();
			}
			if(title==="" || title===undefined || title===null){
				title="default";
			}
			return title;
		},
		H:function() {
			return "/hra/";
		}
	};
	
	_.prototype.defaultGridFormatter={
			boolean:function(value,rowData,rowIndex,clm,d){
				if(value==1 || value=="1" ||value==true || value=="true" ){
					return "是";
				}
				if(value==0 || value=="0" || value==false || value=="false" ){
					return "否";
				}
			},
			button:function(value,rowData,rowIndex,clm,d){
				function createButtonStr(name){
					var str= "<a href=\"javascript:void(0);\" class=\"btn\" value=\""+name+"\">"+name+"</a>";
					return str;
				}
				var button="";
				var v=clm.button?clm.button:[];
				var filter=clm.filter?clm.filter:[];
				var i=0;
				for(var x in v){
				    if(typeof filter[i]==="function" && !filter[i](rowData)==true){
                        continue;
				    }
					button+=createButtonStr(v[x]);
					i++;
				}
				return button;
			},
			combo:function(value,rowData,rowIndex,clm,d){
				if(!$(d).data(clm.field)){
					var map={};
					var comboop=$(clm.combo).combobox("options");
					var valueField=comboop.valueField;
					var textField=comboop.textField;
					var data=$(clm.combo).combobox("getData");
					for(var x in data){
						map[data[x][valueField]]=data[x][textField];
					}
					$(d).data(clm.field,map);
				}
				return $(d).data(clm.field)[value];
			},
			checkbo:function(value,rowData,rowIndex,clm,d){
				if(!$(d).data(clm.field)){
					var map={};
					var checkboxop=_(clm.checkbo).checkbox("options");
					var data=checkboxop.data;
					var map={};
					for(var x in data){
						map[data[x]["value"]]=data[x]["label"];
					}
					$(d).data(clm.field,map);
				}
				return $(d).data(clm.field)[value];
			},
			long:function(value,rowData,rowIndex,clm){
				var width=(clm.width?clm.width:100)/5;
				if(value.length>width){
				    var result = value.substr(0,width)+"......";
				    if(value.indexOf("</")>=0){
                        result = "<xmp>"+result+"</xmp>";
				    }
					return result;
				}
				if(value.indexOf("</")>=0){
                    value = "...(html代码)...";
                }
				return value;
			},
			dateTime:function(value,rowData,rowIndex){
				if(typeof value==='string'){
					return value;
				}
				function getTime(value){
					if(value !=null){
						  return new Date(value.time).format('yyyy-MM-dd hh:mm:ss');
					  }else{
						  return "";
					  }
				}
			  if(value !=null){
					  return getTime(value);
			  }
			  return value;
		   },
		   date:function(value,rowData,rowIndex){
			   if(typeof value==='string'){
					return value;
				}
				function getTime(value){
					if(value !=null){
						  return new Date(value.time).format('yyyy-MM-dd');
					  }else{
						  return "";
					  }
				}
			  if(value !=null){
					  return getTime(value);
			  }
			  return value;
		   },
		   money:function(value,rowData,rowIndex){
			   function rendererZhMoney(v) {  
				    if(isNaN(v)){  
				        return v;  
				    }  
				    v = (Math.round((v - 0) * 100)) / 100;  
				    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v  
				            + "0" : v);  
				    v = String(v);  
				    var ps = v.split('.');  
				    var whole = ps[0];  
				    var sub = ps[1] ? '.' + ps[1] : '.00';  
				    var r = /(\d+)(\d{3})/;  
				    while (r.test(whole)) {  
				        whole = whole.replace(r, '$1' + ',' + '$2');  
				    }  
				    v = whole + sub;  
				    return v;  
				} 
			  if(value !=null){
					  return rendererZhMoney(value);
			  }
			  return value;
		   },
		   parameter:function(value,rowData,rowIndex,thisclm,thisd){
			   if(!value){
				   return "";
			   }
			   if(!thisPage["parameter"+thisclm.parameterType]){
				   var url="py/common/parameterSel.e?parameterType="+thisclm.parameterType;
				   var p=_().basicAjax({url:url,data:{page:1,rows:200}},false);
				   if(p && p.total<=200){
					   thisPage["parameter"+thisclm.parameterType]=p.rows;
				   }
			   }
			   var rows=thisPage["parameter"+thisclm.parameterType];
			   if(value.indexOf(",")>=0){
				   var view="";
				   var v=value.split(",");
				   for(var i=0;i<rows.length;i++){
					   var po=rows[i];
					   for(var j=0;j<v.length;j++){
						   var va=v[j];
						   if(va===po.parameterCode){
							   view+=po.parameterValue+","; 
							   continue;
						   }
					   }
				   }
				   if(view.indexOf(",")>=0){
					   view=view.substring(0,view.length-1);
				   }
				   rowData[thisclm.field+"Name"]=view;
				   return view;
			   }else{
				   for(var i=0;i<rows.length;i++){
					   var po=rows[i];
					   if(value===po.parameterCode){
						   rowData[thisclm.field+"Name"]=po.parameterValue;
						   return po.parameterValue;
					   }
				   }
			   }
		   },
		   baseData:function(value,rowData,rowIndex,thisclm,thisd){
			   if(!value){
				   return "";
			   }
			   if(!thisPage["baseDataSel"+thisclm.parameterType]){
				   var url="py/common/baseDataSel.e?type="+thisclm.parameterType;
				   var p=_().basicAjax({url:url,data:{page:1,rows:200}},false);
				   if(p && p.total<=200){
					   thisPage["baseDataSel"+thisclm.parameterType]=p.rows;
				   }
			   }
			   var rows=thisPage["baseDataSel"+thisclm.parameterType];
			   if(value.indexOf(",")>=0){
				   var view="";
				   var v=value.split(",");
				   for(var i=0;i<rows.length;i++){
					   var po=rows[i];
					   for(var j=0;j<v.length;j++){
						   var va=v[j];
						   if(va===po.baseDataCode){
							   view+=po.baseDataName+","; 
							   continue;
						   }
					   }
				   }
				   if(view.indexOf(",")>=0){
					   view=view.substring(0,view.length-1);
				   }
				   rowData[thisclm.field+"Name"]=view;
				   return view;
			   }else{
				   for(var i=0;i<rows.length;i++){
					   var po=rows[i];
					   if(value===po.baseDataCode){
						   rowData[thisclm.field+"Name"]=po.baseDataName;
						   return po.baseDataName;
					   }
				   }
			   }
		   }
		}
})(window);	
/** 
* 
*  Base64 encode / decode 
* 
*  @author haitao.tu 
*  @date   2010-04-26 
*  @email  tuhaitao@foxmail.com 
* 
*/  
   
function Base64() {  
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        } 
        output=output.replace(/\+/g,">");
        output=output.replace(/=/g,"<");
        return output;  
    }  
   
    // public method for decoding  
    this.decode = function (input) {
    	input=input.replace(/>/g,"+");
    	input=input.replace(/</g,"=");
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output); 
        return output;  
    }  
   
    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n"); 
        string=string.replace(/>/g,"+");
        string=string.replace(/</g,"=");
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
}  

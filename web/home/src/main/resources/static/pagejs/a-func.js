function show_script_edi_win(scriptKey,call_back){
    var href = "/aengine/a-script-edit.htm?scriptKey="+scriptKey;
    if(!scriptKey){
        href = "/aengine/a-script-edit.htm";
        scriptKey="newwin";
    }
    var content ='<iframe id="contentFrame"'+ scriptKey + ' src="'+href+'" style="width: 100%; height: 100%;" frameborder="0"></iframe>';

    if($('#se_'+scriptKey).length===0){
        $("body").append("<div id='se_"+scriptKey+"'></div>");
        $('#se_'+scriptKey).window({
            title:scriptKey!="newwin"?"当前处理脚本："+scriptKey:"新增脚本",
            width:$(window).width()*1,
            height:$(window).height()*1,
            content:content,
            closed:true,collapsible:true,resizable:false,
            modal:true
         });
    }
    (function(){
        var win = 'se_'+scriptKey;
        thisPage.ifcallback=function(reback){
            if(typeof call_back == 'function'){
                call_back(reback,win);
            }
        }
    })();
    $('#se_'+scriptKey).window("open");
}
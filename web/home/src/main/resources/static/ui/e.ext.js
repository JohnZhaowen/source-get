(function(window,undefined) {
	_.prototype.defaultGridFormatter.combobox=
	    function(value,rowData,rowIndex,clm,d){
            if(!$(d).data(clm.field)){
                var data=clm.combobox;
                var valueField=data.valueField;
                var textField=data.textField;
                var list=data.data;
                for(var x in list){
                    var obj = list[x];
                    var aa =list[x][valueField];
                    if(obj[valueField]==value){
                        return obj[textField];
                    }
                }
            }
            return value;
        };

})(window);


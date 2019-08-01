package com.yh.sourceget.common.dal.util;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class PageUtil {

    public static Map toMap(Object object) {
        if (object == null) {
            return null;
        }
        if(object instanceof Map){
            return (Map)object;
        }
        return JsonUtil.json2Object(JsonUtil.objectToFastjson(object), HashMap.class);
    }

    public static Map<String,String> getMap(String... param){
        Map<String,String> m =new HashMap<String,String>();
        String key ="defult";
        int i=0;
        for (String ss : param) {
            if(i==1){
                m.put(key,ss);
                i--;
                continue;
            }
            if(i==0){
                key=ss;
                i++;
            }
        }
        return m;
    }
    
    public static Map<String,Object> getMap(Object... param){
    	Map<String,Object> m =new HashMap<String, Object>();
    	String key ="defult";
    	int i=0;
    	for (Object ss : param) {
    		if(i==1){
    			m.put(key,ss);
    			i--;
    			continue;
    		}
    		if(i==0){
    			key=(String)ss;
    			i++;
    		}
    	}
    	return m;
    }

    public static Map getParameterMap(HttpServletRequest request) {
        Map properties = request.getParameterMap();
        Map returnMap = new HashMap();
        Iterator entries = properties.entrySet().iterator();
        Map.Entry entry;
        String name = "";
        String value = "";
        while (entries.hasNext()) {
            entry = (Map.Entry) entries.next();
            name = (String) entry.getKey();
            Object valueObj = entry.getValue();
            if(null == valueObj){
                value = "";
            }else if(valueObj instanceof String[]){
                String[] values = (String[])valueObj;
                for(int i=0;i<values.length;i++){
                    value = values[i] + ",";
                }
                value = value.substring(0, value.length()-1);
            }else{
                value = valueObj.toString();
            }
            returnMap.put(name, value);
        }
        return returnMap;
    }
}

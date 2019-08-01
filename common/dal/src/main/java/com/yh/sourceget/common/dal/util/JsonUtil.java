package com.yh.sourceget.common.dal.util;

import com.alipay.sofa.common.utils.StringUtil;
import com.alipay.sofa.rpc.common.json.JSON;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.JavaType;

import java.io.*;
import java.lang.reflect.Type;
import java.util.List;

public class JsonUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private JsonUtil() {

    }

    public static final String objectToFastjson(Object object) {
        return JSON.toJSONString(object);
    }

    public static final String objectToFastjsonString(Object object) {
        if(object instanceof String){
            return (String) object;
        }
        return JSON.toJSONString(object);
    }

    public static <T> T fastjson2Object(String json, Class<T> clazz) {
        if (StringUtil.isBlank(json)) {
            json = "{}";
        }
        return JSON.parseObject(json, clazz);
    }

    @Deprecated
    public static String object2Json(Object object) {
        try {
            String itemValue = objectMapper.writeValueAsString(object);
            return itemValue;
        } catch (Exception e) {
            throw new RuntimeException("object2Json�쳣", e);

        }
    }

    public static JavaType getCollectionType(Class<?> collectionClass, Class<?>... elementClasses) {
        return objectMapper.getTypeFactory()
                .constructParametricType(collectionClass, elementClasses);
    }

    public static <T> T json2Object(String json, JavaType javaType) {
        if (StringUtil.isEmpty(json)) {
            json = "{}";
        }
        try {
            return json2ObjectIngroeUnknownProperties(json, javaType);
        } catch (Exception e) {
            throw new RuntimeException("jsonT2Object�쳣", e);
        }
    }

    public static <T> T json2ObjectIngroeUnknownProperties(String json, JavaType javaType) {
        if (StringUtil.isEmpty(json)) {
            json = "{}";
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return mapper.readValue(json, javaType);
        } catch (Exception e) {
            throw new RuntimeException("jsonT2Object�쳣", e);
        }
    }

    public static <T> T json2Object(String json, Class<T> clazz) {
        if (StringUtil.isEmpty(json)) {
            json = "{}";
        }
        try {
            return json2ObjectIngroeUnknownProperties(json, clazz);
        } catch (Exception e) {
            throw new RuntimeException("jsonT2Object�쳣", e);
        }
    }

    public static <T> T json2ObjectIngroeErrFmt(String json, Class<T> clazz) {
        if (StringUtil.isEmpty(json)) {
            json = "{}";
        }
        try {
            return json2ObjectIngroeUnknownProperties(json, clazz);
        } catch (Exception e) {
            return json2Object("{}", clazz);
        }
    }

    public static List json2List(String json) {
        if (StringUtil.isBlank(json)) {
            json = "[]";
        }
        return json2ObjectIngroeUnknownProperties(json, List.class);
    }

    public static <T> T json2ObjectIngroeUnknownProperties(String json, Class<T> clazz) {
        if (StringUtil.isEmpty(json)) {
            json = "{}";
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return mapper.readValue(json, clazz);
        } catch (Exception e) {
            throw new RuntimeException("jsonT2Object�쳣", e);
        }
    }

    private static void object2JsonFile(Object s, File Path, String child) {
        try {
            File file = makeFile(Path, child);
            objectMapper.writeValue(file, s);
            //            FileUtils.writeStringToFile(file, object2Json(s), "GBK");
        } catch (IOException e) {
            throw new RuntimeException("object2JsonFile�쳣", e);
        }
    }

    private static File makeFile(File Path, String child) {
        File file;
        try {
            FileUtils.forceMkdir(Path);
            if (!StringUtils.endsWith(child, "json")) {
                child = child + ".json";
            }
            file = new File(Path, child);
            FileUtils.touch(file);
        } catch (IOException e) {
            throw new RuntimeException("makeFile", e);
        }
        return file;
    }

    private static String getPackagePath(Object o) {
        return StringUtil.replace(o.getClass().getPackage().getName(), ".", File.separator)
               + File.separator;
    }

    private static String getFileText(File file) {
        try {
            FileReader result;
            try {
                result = new FileReader(file);
            } catch (FileNotFoundException e) {
                throw new RuntimeException("getReader fail", e);
            }
            return IOUtils.toString(result);
        } catch (IOException e) {
            throw new RuntimeException("getFileText fail", e);
        }
    }

    private static FileWriter getWriter(File file) {
        try {
            return new FileWriter(file.getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("getWriter fail", e);
        }
    }

}

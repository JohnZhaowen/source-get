package com.yh.sourceget.web.home.controller.util;


import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alipay.sofa.common.utils.StringUtil;

public class ResponseTool {

    public static final String CONTENT_TYPE_JSON = "application/json";
    public static final String CHARSET_GBK       = "GBK";
    public static final String CHARSET_UTF8      = "UTF-8";

    public static void serializeJsonObject(Object obj, HttpServletResponse response)
            throws IOException {
        response.setContentType(CONTENT_TYPE_JSON);
        response.setCharacterEncoding(CHARSET_GBK);
        if (obj instanceof String) {
            response.setContentType("text/plain");
            response.getWriter().write((String) obj);
        } else {
            response.getWriter().write(JSON.toJSONStringWithDateFormat(obj, "yyyy-MM-dd HH:mm:ss"));
        }
        response.getWriter().flush();
        response.getWriter().close();
    }

    public static void serializeJsonObjectWithEncoding(Object obj, HttpServletResponse response,
                                                       String encoding) throws IOException {
        response.setContentType(CONTENT_TYPE_JSON);
        response.setCharacterEncoding(encoding);
        response.getWriter().write(JSON.toJSONStringWithDateFormat(obj, "yyyy-MM-dd HH:mm:ss"));
        response.getWriter().flush();
        response.getWriter().close();
    }

    public static final void printWriter(HttpServletRequest httpServletRequest,
                                     HttpServletResponse httpResponse, Object obj) {
        httpResponse.setCharacterEncoding("UTF-8");
        httpResponse.setContentType("application/json; charset=utf-8");
        PrintWriter out = null;
        String callback = httpServletRequest.getParameter("_callback");
        try {
            String str = JSON.toJSONStringWithDateFormat(obj, "yyyy-MM-dd HH:mm:ss");
            out = httpResponse.getWriter();
            if (!StringUtil.isEmpty(callback)) {
                out.append("/**/" + callback + "(" + str + ")");
            } else {
                out.append(str);
            }
        } catch (IOException e) {
            out.append("SYSTEM ERROR");
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    private ResponseTool() {
    }
}

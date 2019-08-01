package com.yh.sourceget.biz.share.service;

import com.alibaba.fastjson.JSONObject;

public interface CommonApiService {

    boolean check(JSONObject param);

    Object call (JSONObject param);
}

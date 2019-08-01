package com.yh.sourceget.biz.share.service;

import java.util.Map;

import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;

public interface AuthUserService {
	UiPage queryUsersByGroupIdForPage(PageQuery pageQuery, Map m);
	Boolean addAdminUser(Map m);
	Boolean delUser(Map m);
	
	Boolean addUser(Map m);
	
	String queryGroupCreator(Long groupId);
}

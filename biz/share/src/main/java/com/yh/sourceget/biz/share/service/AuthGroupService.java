package com.yh.sourceget.biz.share.service;

import java.util.Map;

import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorGroup;


public interface AuthGroupService {
	
	UiPage querySuperGroup();
	
	UiPage queryAuthGroups(PageQuery pageQuery, Map m);
	
	UiPage queryParentsAvailable(PageQuery pageQuery, Map m);
	
	Long addAuthGroup(AuthorGroup authorGroup);
	
	Boolean delGroupById(Map m);
	
	AuthorGroup queryGroupByUniqueKey(Map m);
	
	Boolean modifyGroup(AuthorGroup authorGroup);
	
	Boolean updateParentByParent(Map m);
	
}

package com.yh.sourceget.biz.share.service;

import java.util.Map;

import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorSource;

public interface AuthSourceService {
	
	UiPage querySourcesByGroupIdForPage(PageQuery pageQuery, Map m);
	
	UiPage querySources(PageQuery pageQuery, Map m);
	
	Long addSource(AuthorSource authorSource);
	
	DaoResult delSourceById(Map m);
	
	DaoResult delGroupSource(Map m);
	
	AuthorSource querySourceByDomainAndSourceCode(String domain, String sourceCode);
	
	int updateSourceById(AuthorSource authorSource);
	
	UiPage querySourceAvailable(PageQuery pageQuery, Map m);
	
	DaoResult addGroupSource(Map m);
	
	
}

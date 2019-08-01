package com.yh.sourceget.biz.share.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yh.sourceget.biz.share.service.AuthSourceService;
import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.dao.CommonAuthorDao;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorSource;
import com.yh.sourceget.common.dal.util.PageUtil;

@Service
public class AuthSourceServiceImpl implements AuthSourceService {
	
	private static final String DEL = "0";
	private static final String NORMAL = "1";
	
	@Autowired
	private CommonAuthorDao commonAuthorDao;

	@Override
	public UiPage querySourcesByGroupIdForPage(PageQuery pageQuery, Map m) {
		pageQuery.setQueryId("sourceget_group_source_query_by_groupId");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);
		return up;
	}

	@Override
	public Long addSource(AuthorSource authorSource) {
		
		//按照domain和sourceCode查询是否存在相同的，如果存在，且delTag为0，也就是已经被删除的，那么进行更新，直接插入会导致唯一索引而插入失败
		AuthorSource existed = querySourceByDomainAndSourceCode(authorSource.getDomain(), authorSource.getSourceCode());
		
		int success = 0;
		if(existed != null && DEL.equals(existed.getDelTag())) {
			authorSource.setDelTag(NORMAL);
			authorSource.setId(existed.getId());
			success = updateSourceById(authorSource);
		} else {
			success = commonAuthorDao.insert("sourceget_author_source_add", authorSource);
		}
		
		if(success > 0) {
			return authorSource.getId();
		}
		
		return -1L;
	}

	@Override
	public UiPage querySources(PageQuery pageQuery, Map m) {
		pageQuery.setQueryId("sourceget_group_source_query");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);
		return up;
	}

	@Override
	public DaoResult delSourceById(Map m) {
		//判断该资源是否在使用中，如果在使用则不可以删除
		Long count = (Long)commonAuthorDao.selectOne("sourceget_author_source_isInUse", m);
		Boolean isInUse = count > 0;
		if(isInUse) {
			return new DaoResult(false, "该资源在使用中，不可删除！");
		}
		int delSuccess = commonAuthorDao.update("sourceget_author_source_del", m);
		if(delSuccess > 0) {
			return new DaoResult(true);
		} else {
			return new DaoResult(true, "删除失败，请稍后重试！");
		}
	}

	@Override
	public AuthorSource querySourceByDomainAndSourceCode(String domain, String sourceCode) {
		Map m = PageUtil.getMap("domain", domain, "sourceCode", sourceCode);
		return (AuthorSource)commonAuthorDao.selectOne("sourceget_group_source_queryByDomainAndSourceCode", m);
	}

	@Override
	public int updateSourceById(AuthorSource authorSource) {
		int update = commonAuthorDao.update("sourceget_author_source_update", authorSource);
		return update;
	}

	@Override
	public DaoResult delGroupSource(Map m) {
		int delSuccess = commonAuthorDao.delete("sourceget_author_groupsource_del", m);
		if(delSuccess > 0) {
			return new DaoResult(true);
		} else {
			return new DaoResult(false, "删除失败，请稍后重试！");
		}
	}

	@Override
	public UiPage querySourceAvailable(PageQuery pageQuery, Map m) {
		pageQuery.setQueryId("sourceget_source_query");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);
		return up;
	}

	@Override
	public DaoResult addGroupSource(Map m) {
		int insertSuccess = commonAuthorDao.insert("sourceget_group_source_add", m);
		
		if(insertSuccess > 0) {
			return new DaoResult(true);
		} else {
			return new DaoResult(true, "新增组资源失败，请稍后重试！");
		}
	}
	
}












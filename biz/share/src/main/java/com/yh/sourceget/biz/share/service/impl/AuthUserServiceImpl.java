package com.yh.sourceget.biz.share.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yh.sourceget.biz.share.service.AuthUserService;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.dao.CommonAuthorDao;
import com.yh.sourceget.common.dal.util.PageUtil;

@Service
public class AuthUserServiceImpl implements AuthUserService {
	
	@Autowired
	private CommonAuthorDao commonAuthorDao;

	@Override
	public UiPage queryUsersByGroupIdForPage(PageQuery pageQuery, Map m) {
		
		pageQuery.setQueryId("sourceget_group_user_query");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);
		return up;
	}

	@Override
	public Boolean addAdminUser(Map m) {
		int addSuccess = commonAuthorDao.insert("sourceget_author_group_user_admin_add", m);
		return addSuccess > 0;
	}

	@Override
	public Boolean delUser(Map m) {
		int deleteSuccess = commonAuthorDao.delete("sourceget_author_group_user_delete", m);
		return deleteSuccess >= 0;
	}

	@Override
	public Boolean addUser(Map m) {
		int addSuccess = commonAuthorDao.insert("sourceget_author_group_user_add", m);
		return addSuccess > 0;
	}

	@Override
	public String queryGroupCreator(Long groupId) {
		
		String creator = ((Map<String, String>)commonAuthorDao.selectOne("sourceget_group_creator_query", PageUtil.getMap("groupId", groupId))).get("creatorAccount");
		
		return creator;
	}
	
	
	
	

}

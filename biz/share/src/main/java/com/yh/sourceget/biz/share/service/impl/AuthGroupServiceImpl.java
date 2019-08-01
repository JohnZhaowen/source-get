package com.yh.sourceget.biz.share.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.yh.sourceget.biz.share.service.AuthGroupService;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.dao.CommonAuthorDao;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorGroup;
import com.yh.sourceget.common.dal.util.PageUtil;

@Service
public class AuthGroupServiceImpl implements AuthGroupService {
	
	@Autowired
	private CommonAuthorDao commonAuthorDao;

	@Override
	public UiPage querySuperGroup() {
		AuthorGroup authorGroup = (AuthorGroup)commonAuthorDao.selectOne("sourceget_author_group_queryByCodeAndDomain", PageUtil.getMap("domain", "super", "groupCode", "super_group"));
		List<AuthorGroup> data = new ArrayList<AuthorGroup>();
		data.add(authorGroup);
		UiPage up = new UiPage();
		up.setRows(data);
		up.setTotal(1L);
		return up; 
	}

	@Override
	public UiPage queryAuthGroups(PageQuery pageQuery, Map m) {
		pageQuery.setQueryId("sourceget_author_group_queryAuthGroupsByCreator");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);
		return up;
	}

	@Override
	public UiPage queryParentsAvailable(PageQuery pageQuery, Map m) {
		
		pageQuery.setQueryId("sourceget_author_group_queryParentsAvailable");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);		
		return up;
	}

	@Override
	public Long addAuthGroup(AuthorGroup authorGroup) {
	
		int insert = commonAuthorDao.insert("sourceget_author_group_add", authorGroup);
		if(insert > 0) {
			return authorGroup.getId();
		}
		return -1L;
		
	}

	@Override
	public Boolean delGroupById(Map m) {
		int delete = commonAuthorDao.delete("sourceget_author_group_delete_by_id", m);
		return delete > 0;
	}

	@Override
	public AuthorGroup queryGroupByUniqueKey(Map m) {
		AuthorGroup authorGroup = (AuthorGroup)commonAuthorDao.selectOne(
				"sourceget_author_group_queryByCodeAndDomain", m);
		return authorGroup;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
	public Boolean modifyGroup(AuthorGroup authorGroup) {
		
		//1.更新实体组
		int updateGroup = commonAuthorDao.update("sourceget_author_group_update", authorGroup);
		if(updateGroup <= 0) {
			throw new RuntimeException("更新分组[" + authorGroup.getId() + "]失败"); 
		}
		
		//2.更新管理组
		AuthorGroup mgmGroup = new AuthorGroup(authorGroup);
		mgmGroup.setGroupCode(mgmGroup.getGroupCode() + "-01");
		mgmGroup.setGroupName(mgmGroup.getGroupName() + "-管理组");
		mgmGroup.setParent(null);
		int updateMgmGroup = commonAuthorDao.update("sourceget_author_group_mgm_update", mgmGroup);
		if(updateMgmGroup <= 0) {
			throw new RuntimeException("更新管理分组[" + authorGroup.getId() + "]失败"); 
		}
		
		return true;
	}

	@Override
	public Boolean updateParentByParent(Map m) {
		int update = commonAuthorDao.update("sourceget_author_group_parent_update", m);
		return update >= 0;
	}

}

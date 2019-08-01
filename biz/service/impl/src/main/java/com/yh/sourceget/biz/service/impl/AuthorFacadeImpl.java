package com.yh.sourceget.biz.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.yh.sourceget.common.dal.mysqlsourceget.dao.CommonAuthorDao;
import com.yh.sourceget.common.dal.util.PageUtil;
import com.yh.sourceget.common.service.facade.AuthorFacade;

@Service
public class AuthorFacadeImpl implements AuthorFacade {
	
	@Autowired
	private CommonAuthorDao commonAuthorDao;

	@Override
	public Boolean hasAuthOfSource(String account, String sourceInfo) {
		Long count = commonAuthorDao.count("sourceget_auth_qry_auth_of_source",
				PageUtil.getMap("account", account, "sourceInfo", sourceInfo));
		return count > 0;
	}

	@Override
	public List<String> getSourcesOfGroup(String account, String groupCode) {
		List<Object> results = commonAuthorDao.selectList("sourceget_auth_qry_source_of_group", 
				PageUtil.getMap("account", account, "groupCode", groupCode));
		List<String> sources = new ArrayList<String>();
		
		if(CollectionUtils.isNotEmpty(results)) {
			for(Object result : results) {
				String sourceInfo = (String)result;
				sources.add(sourceInfo);
			}
		}
		
		return sources;
	}

}

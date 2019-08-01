package com.yh.sourceget.biz.share.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yh.sourceget.biz.share.service.AuthGroupSourceService;
import com.yh.sourceget.common.dal.mysqlsourceget.dao.CommonAuthorDao;

@Service
public class AuthGroupSourceServiceImpl implements AuthGroupSourceService {
	
	@Autowired
	private CommonAuthorDao commonAuthorDao;

	@Override
	public Boolean deleteGroupSourceByGroupId(Map m) {
		int delete = commonAuthorDao.delete("sourceget_author_group_source_delete", m);
		return delete >= 0;
	}

}

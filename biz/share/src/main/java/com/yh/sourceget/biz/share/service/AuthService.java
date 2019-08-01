package com.yh.sourceget.biz.share.service;

import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorGroup;

/**
  * 用于实现一些组合服务
 *
 */
public interface AuthService {
	
	DaoResult addAuthGroup(AuthorGroup authorGroup);
	
	DaoResult delAuthGroup(Long id);
	
	DaoResult updateAuthGroup(AuthorGroup authorGroup);
}

package com.yh.sourceget.biz.share.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.yh.sourceget.biz.share.service.AuthGroupService;
import com.yh.sourceget.biz.share.service.AuthGroupSourceService;
import com.yh.sourceget.biz.share.service.AuthService;
import com.yh.sourceget.biz.share.service.AuthUserService;
import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorGroup;
import com.yh.sourceget.common.dal.util.PageUtil;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private AuthGroupService authGroupService;
	
	@Autowired
	private AuthUserService authUserService;
	
	@Autowired
	private AuthGroupSourceService authGroupSourceService;

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
	public DaoResult addAuthGroup(AuthorGroup authorGroup) {
		
		//1.新增权限组
		Long groupId = authGroupService.addAuthGroup(authorGroup);
		if(groupId < 0) {
			throw new RuntimeException("新增权限组失败！");
		}
		
		//2.新建权限组对应的管理组
		authorGroup.setGroupCode(authorGroup.getGroupCode() + "-01");
		authorGroup.setGroupName(authorGroup.getGroupName() + "-管理组");
		authorGroup.setParent(null);
		authorGroup.setMgmId(groupId);
		Long manageGroupId = authGroupService.addAuthGroup(authorGroup);
		if(manageGroupId < 0) {
			throw new RuntimeException("新增权限组对应的管理组失败！");
		}
		
		//3.新增权限组的管理组成员（创建者本人）
		String account = authorGroup.getOperatorAccount();
		Boolean addUserSuccess = authUserService.addUser(PageUtil.getMap("groupId", manageGroupId, "account", account));
		if(!addUserSuccess) {
			throw new RuntimeException("新增权限组的管理组成员失败！");
		}

		return new DaoResult(true);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
	public DaoResult delAuthGroup(Long id) {
		
		String operator = "80854369";
		//0.将以改组作为父组的分组的parent字段设置为null
		Boolean updateParentByParent = authGroupService.updateParentByParent(PageUtil.getMap("parent", id, "operatorAccount", operator));
		if(!updateParentByParent) {
			throw new RuntimeException("更新以改组为父组的分组失败！");
		}
		
		//1.更新author_group，组及对应的管理组的delTag更新为0 
		Boolean delGroupSuccess = authGroupService.delGroupById(PageUtil.getMap("id", id, "operatorAccount", operator));
		if(!delGroupSuccess) {
			throw new RuntimeException("删除组失败！");
		}
		//2.删除author_group_source中group_id为对应值的记录
		Boolean deleteGroupSource = authGroupSourceService.deleteGroupSourceByGroupId(PageUtil.getMap("groupId", id, "mgm", "true"));
		if(!deleteGroupSource) {
			throw new RuntimeException("删除组-资源关系失败！");
		}
		//3.删除author_group_user中group_id为对应值的记录 
		Boolean delUser = authUserService.delUser(PageUtil.getMap("groupId", id, "mgm", "true"));
		if(!delUser) {
			throw new RuntimeException("删除组对应的成员失败！");
		}
		
		return new DaoResult(true);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
	public DaoResult updateAuthGroup(AuthorGroup authorGroup) {
		//1.判断是否存在相同group_code和domain的组，
		//如果存在则判断del_flag是否为删除，如果是删除状态，则物理删除原有的记录；
		//如果是非删除状态，则直接报错返回
		Map m = PageUtil.getMap("id", authorGroup.getId(), "groupCode", authorGroup.getGroupCode(),
				"domain", authorGroup.getDomain());
		
		AuthorGroup existed = authGroupService.queryGroupByUniqueKey(m);
		if(existed != null && !"0".equals(existed.getDelTag())) {//存在，且记录正常，直接返回
			return new DaoResult(false, "分组编号[" + existed.getGroupCode() + "]在业务域[" + existed.getDomain() + "]中已存在");
		}
		
		if(existed != null && "0".equals(existed.getDelTag())) {//存在，且已被删除
			Boolean delSuccess = authGroupService.delGroupById(PageUtil.getMap("id",existed.getId()));
			if(!delSuccess) {
				throw new RuntimeException("删除id为["+ existed.getId() + "]的分组失败");
			}
		}
		
		//2.更新，连带管理组一同更新
		Boolean modifyGroupSuccess = authGroupService.modifyGroup(authorGroup);
		if(!modifyGroupSuccess) {
			throw new RuntimeException("更新分组失败");
		}
		
		return new DaoResult(true);
	}

}

package com.yh.sourceget.web.home.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yh.sourceget.biz.share.service.AuthGroupService;
import com.yh.sourceget.biz.share.service.AuthGroupSourceTypeService;
import com.yh.sourceget.biz.share.service.AuthService;
import com.yh.sourceget.biz.share.service.AuthSourceService;
import com.yh.sourceget.biz.share.service.AuthUserService;
import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorGroup;
import com.yh.sourceget.common.dal.util.PageUtil;
import com.yh.sourceget.web.home.controller.util.ResponseTool;

@Controller
@RequestMapping(value = "/home/admin")
public class AdminGroupController {
	
	private static final String GROUP_TYPE = "0";
	private static final String DEL = "0";
	private static final String NORMAL = "1";
	
	@Autowired
	private AuthGroupService authGroupService;
	
	@Autowired
	private AuthUserService authUserService;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private AuthGroupSourceTypeService authGroupSourceTypeService;
	
	/**
	 * admin组成员列表
	 */
	@RequestMapping("/member")
	public String admin() {
		return "home/admin/member";
	}
	
	@RequestMapping("/memberList")
	public void adminUsers(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getMap("groupCode", "admin", "domain", "admin", "account", request.getParameter("account"));
		UiPage up = authUserService.queryUsersByGroupIdForPage(pageQuery, m);
		ResponseTool.printWriter(request, response, up);		
	}
	
	/**
	 * 权限组管理
	 */
	@RequestMapping("/group")
	public String group() {
		return "home/admin/group";
	}
	
	@RequestMapping("/groupList")
	public void groupList(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		
		//查询当前用户所创建的权限组
		String account = "80854369";
		
		Map m = PageUtil.getParameterMap(request);
		m.put("account", account);
		m.put("manageTag", "0");
		UiPage up = authGroupService.queryAuthGroups(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	/**
	 * 获取新增权限组时可用的组类型
	 */
	@RequestMapping("/typesAvailable")
	public void typesAvailable(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getParameterMap(request);
		m.put("tag", GROUP_TYPE);
		m.put("typeName", m.get("comBoxSearching"));
		
		UiPage up = authGroupSourceTypeService.queryTypes(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	/**
	 * 获取新增权限组时可用的parentId
	 */
	@RequestMapping("/parentsAvailable")
	public void parentsAvailable(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getParameterMap(request);
		m.put("groupIdS", m.get("comBoxSearching"));
		
		UiPage up = authGroupService.queryParentsAvailable(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	/**
	 * 新增权限组
	 */
	@RequestMapping("/addGroup")
	public void addGroup(HttpServletRequest request, HttpServletResponse response, AuthorGroup authorGroup) {
		String account = "80854369";
		authorGroup.setOperatorAccount(account);
		try {
			DaoResult result = authService.addAuthGroup(authorGroup);
			ResponseTool.printWriter(request, response, result);
			
		}catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, "业务域和组编号相同的分组已存在"));
		}
	}
	
}


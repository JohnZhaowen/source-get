package com.yh.sourceget.web.home.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yh.sourceget.biz.share.service.AuthGroupService;
import com.yh.sourceget.biz.share.service.AuthGroupSourceTypeService;
import com.yh.sourceget.biz.share.service.AuthSourceService;
import com.yh.sourceget.biz.share.service.AuthUserService;
import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.GroupSourceType;
import com.yh.sourceget.common.dal.util.PageUtil;
import com.yh.sourceget.web.home.controller.util.ResponseTool;

@Controller
@RequestMapping(value = "/home/super")
public class SuperGroupController {
	
	@Autowired
	private AuthGroupService authGroupInfoService;
	
	@Autowired
	private AuthUserService authUserService;
	
	@Autowired
	private AuthSourceService authSourceService;
	
	@Autowired
	private AuthGroupSourceTypeService authGroupSourceTypeService;
	
	/**
	 * super组人员及资源
	 */
	@RequestMapping("/index")
	public String memberIndex() {
		return "home/super/index";
	}
	
	@RequestMapping("/info")
	public void info(HttpServletRequest request, HttpServletResponse response) {
		UiPage up = authGroupInfoService.querySuperGroup();
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/member")
	public void member(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		
		Map m = PageUtil.getMap("groupId", Long.valueOf(request.getParameter("groupId")), "account", request.getParameter("account"));
		UiPage up = authUserService.queryUsersByGroupIdForPage(pageQuery, m);
		
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/source")
	public void source(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		UiPage up = authSourceService.querySourcesByGroupIdForPage(pageQuery, PageUtil.getParameterMap(request));
		ResponseTool.printWriter(request, response, up);
	}
	
	/**
	 * 组类型和资源类型管理
	 */
	@RequestMapping("/type")
	public String typeIndex() {
		return "home/super/type";
	}
	
	@RequestMapping("/typeList")
	public void typeList(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		UiPage up = authGroupSourceTypeService.queryTypes(pageQuery, PageUtil.getParameterMap(request));
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/typeDel")
	public void typeDel(HttpServletRequest request, HttpServletResponse response, Long typeId) {
		
		DaoResult result = authGroupSourceTypeService.delete(typeId);
		if(result.getSuccess()) {
			ResponseTool.printWriter(request, response, result);
		} else {
			ResponseTool.printWriter(request, response, result);
		}
	}
	
	@RequestMapping("/typeAdd")
	public void typeAdd(HttpServletRequest request, HttpServletResponse response) {
		Boolean addSuccess = authGroupSourceTypeService.insertGroupSourceType(
				new GroupSourceType(request.getParameter("tag"), request.getParameter("typeName"),
						request.getParameter("parentId") == null ? null : Long.valueOf(request.getParameter("parentId"))));
		ResponseTool.printWriter(request, response, addSuccess);
	}
	
	@RequestMapping("/typeModify")
	public void typeModify(HttpServletRequest request, HttpServletResponse response) {
		
		DaoResult updateSuccess = authGroupSourceTypeService.updateGroupSourceType(
				new GroupSourceType(Long.valueOf(request.getParameter("typeId")), request.getParameter("typeName")));
		
		ResponseTool.printWriter(request, response, updateSuccess);
	}
	
	/**
	 * admin组成员管理
	 */
	@RequestMapping("/admin")
	public String admin() {
		
		return "home/super/admin";
	}
	
	@RequestMapping("/adminUsers")
	public void adminUsers(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getMap("groupCode", "admin", "domain", "admin", "account", request.getParameter("account"));
		UiPage up = authUserService.queryUsersByGroupIdForPage(pageQuery, m);
		ResponseTool.printWriter(request, response, up);		
	}
	
	@RequestMapping("/adminUserAdd")
	public void adminUserAdd(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getMap("groupCode", "admin", "domain", "admin", "account", request.getParameter("account"));
		Boolean addSuccess = authUserService.addAdminUser(m);
		ResponseTool.printWriter(request, response, addSuccess);		
	}
	
	@RequestMapping("/adminUserDel")
	public void adminUserDel(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getMap("groupId", Long.valueOf(request.getParameter("groupId")), "account", request.getParameter("account"));
		Boolean delSuccess = authUserService.delUser(m);
		ResponseTool.printWriter(request, response, delSuccess);		
	}
	
	
}

























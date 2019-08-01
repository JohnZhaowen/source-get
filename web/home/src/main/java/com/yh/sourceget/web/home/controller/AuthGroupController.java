package com.yh.sourceget.web.home.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alipay.sofa.rpc.common.utils.StringUtils;
import com.yh.sourceget.biz.share.service.AuthGroupService;
import com.yh.sourceget.biz.share.service.AuthGroupSourceTypeService;
import com.yh.sourceget.biz.share.service.AuthService;
import com.yh.sourceget.biz.share.service.AuthSourceService;
import com.yh.sourceget.biz.share.service.AuthUserService;
import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorGroup;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.AuthorSource;
import com.yh.sourceget.common.dal.util.PageUtil;
import com.yh.sourceget.web.home.controller.util.ResponseTool;

@Controller
@RequestMapping("/home/auth")
public class AuthGroupController {
	
	private static final String DEL = "0";
	private static final String NORMAL = "1";
	private static final String SOURCE_TYPE = "1";
	
	@Autowired
	private AuthGroupService authGroupService;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private AuthUserService authUserService;
	
	@Autowired
	private AuthSourceService authSourceService;
	
	@Autowired
	private AuthGroupSourceTypeService authGroupSourceTypeService;
	
	/**
	 * 权限管理组
	 */
	@RequestMapping("/mgm")
	public String mgmGroup() {
		return "home/auth/mgm";
	}
	
	@RequestMapping("/mgmList")
	public void mgmList(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		
		//查询当前用户所创建的权限组
		String account = "80854369";
		
		Map m = PageUtil.getParameterMap(request);
		m.put("account", account);
		m.put("manageTag", "1");
		UiPage up = authGroupService.queryAuthGroups(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/adminList")
	public void adminList(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getParameterMap(request);
		UiPage up = authUserService.queryUsersByGroupIdForPage(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/addGroupAdmin")
	public void addGroupAdmin(HttpServletRequest request, HttpServletResponse response) {
		Map m = PageUtil.getParameterMap(request);
		try {
			Boolean addUserSuccess = authUserService.addUser(m);
			if(addUserSuccess) {
				ResponseTool.printWriter(request, response, new DaoResult(addUserSuccess));
				return;		
			} else {
				ResponseTool.printWriter(request, response, new DaoResult(addUserSuccess, "新增失败，请稍后重试！"));
				return;	
			}
		}catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, "账户已存在"));
		}
	}
	
	@RequestMapping("/delGroupAdmin")
	public void delGroupAdmin(HttpServletRequest request, HttpServletResponse response) {
		Map m = PageUtil.getParameterMap(request);
		
		//如果是管理组的创建者，则不能删除，以保证该组至少有一个成员
		String creator = authUserService.queryGroupCreator(Long.valueOf(request.getParameter("groupId")));
		String account = request.getParameter("account");
		if(StringUtils.equals(creator, account)) {
			ResponseTool.printWriter(request, response, new DaoResult(false, "不能删除创建者"));
			return;
		}
		
		//如果删除的是本人
		String currentAccount = "111";
		Boolean isSelf = false;
		if(StringUtils.equals(currentAccount, account)) {
			isSelf = true;			
		}
		
		Boolean delSuccess = authUserService.delUser(m);
		if(delSuccess) {
			if(isSelf) {
				ResponseTool.printWriter(request, response, new DaoResult(delSuccess, "删除本人成功", true));
				return;
			}
			ResponseTool.printWriter(request, response, new DaoResult(delSuccess, "删除管理员成功", false));
			return;		
		} else {
			ResponseTool.printWriter(request, response, new DaoResult(delSuccess, "删除失败，请稍后重试！"));
			return;	
		}
	}
	
	/**
	 * 权限组
	 */
	@RequestMapping("/group")
	public String group() {
		return "home/auth/group";
	}
	
	@RequestMapping("/groupList")
	public void groupList(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		
		//查询当前用户所创建的权限组
		String account = "80854369";
		
		Map m = PageUtil.getParameterMap(request);
		m.put("account", account);
		m.put("manageTag", "2");
		UiPage up = authGroupService.queryAuthGroups(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	
	@RequestMapping("/delGroup")
	public void delGroup(HttpServletRequest request, HttpServletResponse response) {
		try {
			DaoResult delAuthGroup = authService.delAuthGroup(Long.valueOf(request.getParameter("groupId")));
			ResponseTool.printWriter(request, response, delAuthGroup);
		} catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, e.getMessage()));
			
		}
	}
	
	@RequestMapping("/groupUpdate")
	public void groupUpdate(HttpServletRequest request, HttpServletResponse response, AuthorGroup authorGroup) {
		
		//1.如果更改导致唯一性索性冲突i
		try {
			DaoResult updateSuccess = authService.updateAuthGroup(authorGroup);
			ResponseTool.printWriter(request, response, updateSuccess);
		} catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, e.getMessage()));
		}
	}
	
	
	/**
	 * 资源管理
	 */
	@RequestMapping("/source")
	public String source() {
		return "home/auth/source";
	}
	
	@RequestMapping("/sourceList")
	public void sourceList(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getParameterMap(request);
		UiPage up = authSourceService.querySources(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/sourceTypesAvailable")
	public void sourceTypesAvailable(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getParameterMap(request);
		m.put("tag", SOURCE_TYPE);
		m.put("typeId", m.get("comBoxSearching"));
		
		UiPage up = authGroupSourceTypeService.queryTypes(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/sourceAvailable")
	public void sourceAvailable(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		Map m = PageUtil.getParameterMap(request);
		m.put("id", m.get("comBoxSearching"));
		
		UiPage up = authSourceService.querySourceAvailable(pageQuery, m);
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/addSource")
	public void addSource(HttpServletRequest request, HttpServletResponse response, AuthorSource authorSource) {
		try {
			Long addSource = authSourceService.addSource(authorSource);
			if(addSource > 0) {
				ResponseTool.printWriter(request, response, new DaoResult(true));
			} else {
				ResponseTool.printWriter(request, response, new DaoResult(false, "新增资源失败，请扫后重试！"));
			}
			
		}catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, 
					"业务域：[" + authorSource.getDomain() + "]中已存在资源编号为[" + authorSource.getSourceCode() + "]的资源！"));
		}
	}
	
	@RequestMapping("/sourceDel")
	public void sourceDel(HttpServletRequest request, HttpServletResponse response) {
		Map m = PageUtil.getParameterMap(request);
		//获取当前用户
		String operatorAccount = "80854369";
		m.put("operatorAccount", operatorAccount);
		DaoResult result = authSourceService.delSourceById(m);
		ResponseTool.printWriter(request, response, result);
	}
	
	@RequestMapping("/sourceUpdate")
	public void sourceUpdate(HttpServletRequest request, HttpServletResponse response, AuthorSource authorSource) {
		try {
			int success = authSourceService.updateSourceById(authorSource);
			if(success > 0) {
				ResponseTool.printWriter(request, response, new DaoResult(true));
			} else {
				ResponseTool.printWriter(request, response, new DaoResult(false, "修改资源失败，请稍后重试！"));
			}
		}catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, 
					"业务域：[" + authorSource.getDomain() + "]中已存在资源编号为[" + authorSource.getSourceCode() + "]的资源！"));
		}
	}
	
	@RequestMapping("/groupSource")
	public void source(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		UiPage up = authSourceService.querySourcesByGroupIdForPage(pageQuery, PageUtil.getParameterMap(request));
		ResponseTool.printWriter(request, response, up);
	}
	
	@RequestMapping("/delGroupSource")
	public void delGroupSource(HttpServletRequest request, HttpServletResponse response) {
		DaoResult result = authSourceService.delGroupSource(PageUtil.getParameterMap(request));
		ResponseTool.printWriter(request, response, result);
	}
	
	@RequestMapping("/addGroupSource")
	public void addGroupSource(HttpServletRequest request, HttpServletResponse response) {
		DaoResult result = authSourceService.addGroupSource(PageUtil.getParameterMap(request));
		ResponseTool.printWriter(request, response, result);
	}
	
	/**
	 * 权限组用户管理
	 */
	@RequestMapping("/groupUser")
	public void groupUser(HttpServletRequest request, HttpServletResponse response, PageQuery pageQuery) {
		UiPage up = authUserService.queryUsersByGroupIdForPage(pageQuery, PageUtil.getParameterMap(request));
		ResponseTool.printWriter(request, response, up);
	}
	@RequestMapping("/delGroupUser")
	public void delGroupUser(HttpServletRequest request, HttpServletResponse response) {
		Boolean delUserSuccess = authUserService.delUser(PageUtil.getParameterMap(request));
		if(delUserSuccess) {
			ResponseTool.printWriter(request, response, new DaoResult(true));
		} else {
			ResponseTool.printWriter(request, response, new DaoResult(false, "删除用户失败，请稍后重试！"));
		}
	}
	@RequestMapping("/addGroupUser")
	public void addGroupUser(HttpServletRequest request, HttpServletResponse response) {
		
		try {
			Boolean addUserSuccess = authUserService.addUser(PageUtil.getParameterMap(request));
			if(addUserSuccess) {
				ResponseTool.printWriter(request, response, new DaoResult(true));
			} else {
				ResponseTool.printWriter(request, response, new DaoResult(false, "新增用户失败，请稍后重试！"));
			}
		}catch(Exception e) {
			ResponseTool.printWriter(request, response, new DaoResult(false, "该用户已存在！"));
		}
		
		
	}
}



















package com.yh.sourceget.common.service.facade;

import java.util.List;

/**
 * 用户权限校验接口
 * @author besth
 *
 */
public interface AuthorFacade {
	/**
	 * 判断用户account是否具有资源sourceInfo的权限
	 */
	Boolean hasAuthOfSource(String account, String sourceInfo);
	/**
	 * 判断用户account是否具有资源sourceInfo的权限
	 */
	List<String> getSourcesOfGroup(String account, String groupCode);
}

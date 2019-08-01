package com.yh.sourceget.biz.share.service;

import java.util.List;
import java.util.Map;

import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.GroupSourceType;

/**
 * 主要用于组资源类型关系的操作
 * @author besth
 *
 */
public interface AuthGroupSourceTypeService {
	
	//新增
	Boolean insertGroupSourceType(GroupSourceType gst);
	
	//批量新增
	Boolean insertGroupSourceTypeByBatch(List<GroupSourceType> gsts);
	
	//更新
	DaoResult updateGroupSourceType(GroupSourceType gst);
	
	//根据id删除
	DaoResult delete(Long id);
	
	//查询分类
	UiPage queryTypes(PageQuery pageQuery, Map m);
	
	
}

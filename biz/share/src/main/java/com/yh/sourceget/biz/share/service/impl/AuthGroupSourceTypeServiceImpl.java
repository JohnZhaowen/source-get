package com.yh.sourceget.biz.share.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yh.sourceget.biz.share.service.AuthGroupSourceTypeService;
import com.yh.sourceget.common.dal.common.DaoResult;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.mysqlsourceget.dao.CommonAuthorDao;
import com.yh.sourceget.common.dal.mysqlsourceget.domain.GroupSourceType;
import com.yh.sourceget.common.dal.util.PageUtil;

@Service
public class AuthGroupSourceTypeServiceImpl implements AuthGroupSourceTypeService {
	
	private static final String GROUP_TYPE = "0";
	private static final String SOURCE_TYPE = "1";
	
	@Autowired
	private CommonAuthorDao commonAuthorDao;

	@Override
	public Boolean insertGroupSourceType(GroupSourceType gst) {
		
		int result = commonAuthorDao.insert("sourceget_group_source_type_add", gst);
		return result > 0;
	}

	@Override
	public Boolean insertGroupSourceTypeByBatch(List<GroupSourceType> gsts) {
		int result = commonAuthorDao.insert("sourceget_group_source_type_add_batch", gsts);
		return result > 0;
	}

	@Override
	public DaoResult updateGroupSourceType(GroupSourceType gst) {
		
		int result = commonAuthorDao.update("sourceget_group_source_type_update", gst);
		return new DaoResult(result > 0, result > 0 ? "更新成功" : "更新失败,请稍后重试");
	}

	@Override
	public DaoResult delete(Long id) {
		
		//使用中,则不可删除
		if(isInUse(id)) {
			return new DaoResult(false, "当前类型已在使用,不可删除");
		}
		
		//组类型,连带删除资源类型;资源类型,则删除本条记录即可
		int delete = commonAuthorDao.delete("sourceget_group_source_type_delete_by_id", PageUtil.getMap("id", id));
		return new DaoResult(delete > 0, delete > 0 ? "删除成功" : "删除失败,请稍后重试");
	}
	
	@Override
	public UiPage queryTypes(PageQuery pageQuery, Map m) {
		pageQuery.setQueryId("sourceget_group_source_type_querytypes");
		UiPage up = commonAuthorDao.queryForPage(pageQuery, m);
		return up;
	}
		
	private boolean isInUse(Long id) {
		
		GroupSourceType gstSelected = (GroupSourceType)commonAuthorDao.selectOne("sourceget_group_source_type_queryById", 
				PageUtil.getMap("id", id));
		String tag = gstSelected.getTag();
		
		String sqlId = "";
		if(GROUP_TYPE.equals(tag)) {
			sqlId = "sourceget_group_queryCountByType";
		} else if(SOURCE_TYPE.equals(tag)) {
			sqlId = "sourceget_source_queryCountByType";
		}
		Long count = commonAuthorDao.count(sqlId, PageUtil.getMap("typeId", id));
		return count > 0;
	}
	
	/*
	 * private boolean isTagChange(GroupSourceType gst) { Long id = gst.getTypeId();
	 * String tag = gst.getTag();
	 * 
	 * GroupSourceType gstSelected = (GroupSourceType)commonAuthorDao.selectOne(
	 * "sourceget_group_source_type_queryById", PageUtil.getMap("id", id));
	 * 
	 * 
	 * return !gstSelected.getTag().equals(tag); }
	 */
	
}

package com.yh.sourceget.common.dal.mysqlsourceget.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.alipay.sofa.common.utils.StringUtil;
import com.yh.sourceget.common.dal.common.PageQuery;
import com.yh.sourceget.common.dal.common.UiPage;
import com.yh.sourceget.common.dal.util.PageUtil;

@Component
public class CommonAuthorDao {

	private final SqlSessionTemplate sourcegetSqlSessionTemplate;

	public CommonAuthorDao(@Qualifier("sourcegetSqlSessionTemplate") SqlSessionTemplate migrationSqlSessionTemplate) {
		this.sourcegetSqlSessionTemplate = migrationSqlSessionTemplate;
	}

	public UiPage queryForPage( PageQuery gridFrom, Object condition) {
		Map conditionmap = PageUtil.toMap(condition);
		String sqlId = gridFrom.getQueryId();
		String countId = StringUtil.isEmpty(gridFrom.getCountId()) ? sqlId + "_count" : gridFrom.getCountId();
		Long count = this.count(countId, conditionmap);
		int offset = 0;
		if (gridFrom.getPage() > 0) {
			offset = (gridFrom.getPage() - 1) * gridFrom.getRows();
		}
		conditionmap.put("offset", offset);
		conditionmap.put("limit", gridFrom.getRows());
		List ldata = this.selectList(sqlId, conditionmap);
		UiPage up = new UiPage();
		up.setRows(ldata);
		up.setTotal(count);
		return up;
	}

	public List<Object> selectList(String sqlId, Map param) {
		return this.sourcegetSqlSessionTemplate.selectList(sqlId, param);
	}

	public Object selectOne(String sqlId, Map param) {
		return this.sourcegetSqlSessionTemplate.selectOne(sqlId, param);
	}

	public Long count(String sqlId, Object condition) {
		return this.sourcegetSqlSessionTemplate.selectOne(sqlId, condition);
	}

	public int update(String sqlId, Object condition) {
		return this.sourcegetSqlSessionTemplate.update(sqlId, condition);
	}

	public int insert(String sqlId, Object condition) {
		return this.sourcegetSqlSessionTemplate.insert(sqlId, condition);
	}

	public int delete(String sqlId, Object condition) {
		return this.sourcegetSqlSessionTemplate.delete(sqlId, condition);
	}

}

package com.yh.sourceget.common.dal.mysqlsourceget.domain;

import java.io.Serializable;

public class GroupSourceType implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Long typeId;
	//0-组类型, 1-资源类型
	private String tag;
	
	private String typeName;
	
	private Long parentId;
	
	public GroupSourceType() {
	}
	
	public GroupSourceType(Long typeId, String typeName) {
		this(typeId, null, typeName, null);
	}
	public GroupSourceType(String tag, String typeName) {
		this(null, tag, typeName, null);
	}
	
	public GroupSourceType(String tag, String typeName, Long parentId) {
		this(null, tag, typeName, parentId);
	}
	public GroupSourceType(Long typeId, String tag, String typeName, Long parentId) {
		this.typeId = typeId;
		this.tag = tag;
		this.typeName = typeName;
		this.parentId = parentId;	
	}
	
	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public String getTag() {
		if(tag != null) {
			return tag.trim();
		} else {
			return null;
		}
	}


	public void setTag(String tag) {
		if(tag != null) {
			this.tag = tag.trim();
		} else {
			this.tag = tag;
		}
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
}

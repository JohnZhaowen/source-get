package com.yh.sourceget.common.dal.mysqlsourceget.domain;

import java.io.Serializable;

/**
 * 授权资源
 * @author besth
 *
 */
public class AuthorSource implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	/**
	 * 资源编号：由创建资源的人填写，必须保证资源编号和业务域联合唯一
	 */
	private String sourceCode;
	/**
	 * 资源名：用户定义的资源名称
	 */
	private String sourceName;
	/**
	 * 业务域：资源所属的业务领域，如报表，业务域的可选值由初始化时配置
	 */
	private String domain;
	/**
	 * 资源类型编号
	 */
	private Long typeId;
	/**
	 * 资源类型名称
	 */
	private String typeName;
	/**
	 * 资源信息：描述资源的相关内容，定位到某一具体资源,且权限分配的粒度就是该信息
	 */
	private String sourceInfo;
	/**
	 * 删除标记：所有者可以删除自己创建的资源，并且不做校验，为了防止失误操作，数据不会物理删除，只记录删除标记
	 */
	private String delTag;
	/**
	 * 资源属性：用于后续扩展功能使用
	 */
	private String sourceProperty;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSourceCode() {
		return sourceCode;
	}
	public void setSourceCode(String sourceCode) {
		this.sourceCode = sourceCode;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getSourceInfo() {
		return sourceInfo;
	}
	public void setSourceInfo(String sourceInfo) {
		this.sourceInfo = sourceInfo;
	}
	public String getDelTag() {
		return delTag;
	}
	public void setDelTag(String delTag) {
		this.delTag = delTag;
	}
	public String getSourceProperty() {
		return sourceProperty;
	}
	public void setSourceProperty(String sourceProperty) {
		this.sourceProperty = sourceProperty;
	}
	@Override
	public String toString() {
		return "AuthorSource [sourceCode=" + sourceCode + ", sourceName=" + sourceName + ", domain=" + domain
				+ ", typeId=" + typeId + ", typeName=" + typeName + ", sourceInfo=" + sourceInfo + ", delTag=" + delTag
				+ ", sourceProperty=" + sourceProperty + "]";
	}
	
}

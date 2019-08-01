package com.yh.sourceget.common.dal.mysqlsourceget.domain;

import java.io.Serializable;
import java.util.List;

import com.sun.jna.platform.win32.Netapi32Util.UserInfo;

/**
 * 权限组
 * @author besth
 *
 */
public class AuthorGroup implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public AuthorGroup() {}
	public AuthorGroup(AuthorGroup authorGroup) {
		this.id = authorGroup.getId();
		this.groupCode = authorGroup.getGroupCode();
		this.groupName = authorGroup.getGroupName();
		this.domain = authorGroup.getDomain();
		this.typeId = authorGroup.getTypeId();
		this.typeName = authorGroup.getTypeName();
		this.groupInfo = authorGroup.getGroupInfo();
		this.delTag = authorGroup.getDelTag();
		this.parent = authorGroup.getParent();
		this.mgmId = authorGroup.getMgmId();
		this.createTime = authorGroup.getCreateTime();
		this.updateTime = authorGroup.getUpdateTime();
		this.operatorAccount = authorGroup.getOperatorAccount();
		this.users = authorGroup.getUsers();	
		this.authorSource = authorGroup.getAuthorSource();
	}
	
	
	private Long id;
	/**
	 * 分组编号：由创建组的人填写，必须保证分组编号和业务域联合唯一
	 */
	private String groupCode;
	/**
	 * 分组名：用户定义的分组名称
	 */
	private String groupName;
	/**
	 * 业务域：分组所属的业务领域，如报表，业务域的可选值由初始化时配置
	 */
	private String domain;
	/**
	 * 组类型：对组的逻辑分类，如页面、接口、数据等，组类型的可选值由初始化时配置
	 */
	private Long typeId;
	
	private String typeName;
	/**
	 * 组信息：描述组的相关内容
	 */
	private String groupInfo;
	/**
	 * 删除标记：所有者可以删除该组，并且不做校验，为了防止失误操作，数据不会物理删除，只记录删除标记
	 * 1-删除
	 * 0或者null-正常
	 */
	private String delTag;
	/**
	 * 父组编号：如果有父组编号，则该分组可以继承父分组的所有关联资源
	 */
	private Long parent;
	
	private Long mgmId;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 最新更新时间
	 */
	private String updateTime; 
	/**
	 * 操作员账号
	 */
	private String operatorAccount;
	/**
	 * 组成员
	 */
	private List<UserInfo> users;
	/**
	 * 组关联的资源
	 */
	private List<AuthorSource> authorSource;
	
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getGroupCode() {
		return groupCode;
	}
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getGroupInfo() {
		return groupInfo;
	}
	public void setGroupInfo(String groupInfo) {
		this.groupInfo = groupInfo;
	}
	public String getDelTag() {
		return delTag;
	}
	public void setDelTag(String delTag) {
		this.delTag = delTag;
	}
	public String getOperatorAccount() {
		return operatorAccount;
	}
	public void setOperatorAccount(String operatorAccount) {
		this.operatorAccount = operatorAccount;
	}
	public List<UserInfo> getUsers() {
		return users;
	}
	public void setUsers(List<UserInfo> users) {
		this.users = users;
	}
	public List<AuthorSource> getAuthorSource() {
		return authorSource;
	}
	public void setAuthorSource(List<AuthorSource> authorSource) {
		this.authorSource = authorSource;
	}
	
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public Long getParent() {
		return parent;
	}
	public void setParent(Long parent) {
		this.parent = parent;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public Long getMgmId() {
		return mgmId;
	}
	public void setMgmId(Long mgmId) {
		this.mgmId = mgmId;
	}
	
}

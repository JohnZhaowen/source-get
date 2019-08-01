package com.yh.sourceget.common.dal.common;

public class DaoResult {
	
	private Boolean success;
	
	private String msg;
	
	private Object other;
	
	public DaoResult() {}
	
	public DaoResult(Boolean success) {
		this(success, null, null);
	}
	public DaoResult(Boolean success, String msg) {
		this(success, msg, null);
	}
	public DaoResult(Boolean success, String msg, Object other) {
		this.success = success;
		this.msg = msg;
		this.other = other;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getOther() {
		return other;
	}

	public void setOther(Object other) {
		this.other = other;
	}
	
}

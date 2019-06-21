package com.comic.common.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * 返回数据
 */
public class RResp extends HashMap<String, Object> {
	private static final long serialVersionUID = 1L;
	
	public RResp() {
		put("code", 200);
	}

	public static RResp ok() {
		return new RResp();
	}

	public static RResp ok(String msg) {
		RResp r = new RResp();
		r.put("msg", msg);
		return r;
	}

	public static RResp ok(Map<String, Object> map) {
		RResp r = new RResp();
		r.putAll(map);
		return r;
	}

	public static RResp error() {
		return error(500, "未知异常，请联系管理员");
	}
	
	public static RResp error(String msg) {
		return error(500, msg);
	}
	
	public static RResp error(int code, String msg) {
		RResp resp = new RResp();
        resp.put("code", code);
        resp.put("msg", msg);
		return resp;
	}

	@Override
	public RResp put(String key, Object value) {
		super.put(key, value);
		return this;
	}
}

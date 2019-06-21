package com.comic.pojo;

import lombok.Data;

/**
 *
 *  -
 */
@Data
public class Role {
	// 主键
	private String id;
	// 角色名称
	private String roleName;
	// 创建时间
	private String createTime;
	// 是否可用 0-可用 1-不可用
	private String status;

}

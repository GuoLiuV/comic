package com.comic.pojo;

import lombok.Data;

@Data
public class Permission {
    // 主键
    private String id;
    // 权限名称
    private String permissionName;
    // 权限类型
    private String permissionType;
    // 权限路径
    private String permissionUrl;
    // 创建时间
    private String createTime;
    // 子权限Id
    private String pid;
    // 是否可用 0-不可用 1-可用
    private String status;
    // 排序
    private String order;
    // 备注
    private String remark;
}

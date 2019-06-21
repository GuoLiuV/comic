package com.comic.pojo;

import lombok.Data;

@Data
public class User {
    // 主键
    private String id;
    // 用户名
    private String userName;
    // 登录账号
    private String loginName;
    // 用户密码
    private String password;
    // 创建时间
    private String createTime;
    // 备注
    private String remark;
    // 是否可用 0-不可用 1-可用
    private String status;
}

package com.comic.common.utils;

import lombok.Data;

@Data
public class SysLog {

    private static final long serialVersionUID = 1L;

    private String id;

    private String username;

    private String operation;

    private String time;

    private String method;

    private String params;

    private String ip;

    private String createTime;

}
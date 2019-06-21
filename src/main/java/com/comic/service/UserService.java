package com.comic.service;

import com.comic.pojo.Permission;
import com.comic.pojo.Role;
import com.comic.pojo.User;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface UserService {
    /**
     * 查询用户列表
     * @param page 当前页
     * @param rows 显示页数
     * @param user 用户参数
     * @return 用户集合
     */
    PageInfo<User> queryAllByLimit(Integer page, Integer rows, User user);

    /**
     * 通过登录名查询用户
     * @param loginName 登录名称
     * @return 用户实体
     */
    User selectUserName(String loginName);


    List<Role> selectUserRoles(String userId);

    List<Permission> selectPermissionsByRoleId(String roleId);

}

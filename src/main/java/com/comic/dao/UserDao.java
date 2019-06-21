package com.comic.dao;

import com.comic.pojo.Permission;
import com.comic.pojo.Role;
import com.comic.pojo.User;

import java.util.List;

public interface UserDao {

    List<User> queryAllByLimit(User user);

    User selectUserByCondition(User user);

    List<Role> selectUserRoles(String loginName);

    List<Permission> selectPermissionsByRoleId(String roleId);
}

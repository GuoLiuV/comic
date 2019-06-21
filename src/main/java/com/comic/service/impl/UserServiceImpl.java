package com.comic.service.impl;

import com.comic.dao.UserDao;
import com.comic.pojo.Permission;
import com.comic.pojo.Role;
import com.comic.pojo.User;
import com.comic.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userMapper;

    @Override
    public PageInfo<User> queryAllByLimit(Integer page, Integer rows, User user) {
        PageHelper.startPage(page, rows, true);
        List<User> list = userMapper.queryAllByLimit(user);
        return new PageInfo<>(list);
    }

    @Override
    public User selectUserName(String loginName) {
        if (StringUtils.isEmpty(loginName)) {
            return null;
        } else {
            User user = new User();
            user.setLoginName(loginName);
            return userMapper.selectUserByCondition(user);
        }
    }

    @Override
    public List<Role> selectUserRoles(String userId) {
        return userMapper.selectUserRoles(userId);
    }

    @Override
    public List<Permission> selectPermissionsByRoleId(String roleId) {
        return userMapper.selectPermissionsByRoleId(roleId);
    }
}

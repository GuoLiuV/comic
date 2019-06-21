package com.comic.common.config;

import com.comic.common.utils.Utils;
import com.comic.pojo.Permission;
import com.comic.pojo.Role;
import com.comic.pojo.User;
import com.comic.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/*import com.yuanmeng.assist.constant.ShiroConstants;
import com.yuanmeng.assist.utils.Utils;
import com.yuanmeng.entity.Permission;
import com.yuanmeng.entity.Role;*/

/**
 * @author lugongqi
 * lutodo
 * Description: 自定义realm
 * Subject.login() 当我们把封装了用户名，密码的 token 作为参数传入，
 * 便会跑进这两个方法里面（不一定两个方法都会进入）
 */
@Component
public class AuthRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    /**
     * @author lugongqi
     * lutodo
     * Description: 认证.登录
     * 需要身份认证时（比如前面的 Subject.login() 方法）才会进入
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //UsernamePasswordToken utoken = (UsernamePasswordToken) token;
        // 获取用户输入的用户名和密码
        String userName = (String) token.getPrincipal();
        //String passWord = new String((char[]) token.getCredentials());
        //  token.getUsername()  //获得用户名 String
        //  token.getPrincipal() //获得用户名 String
        //  token.getPassword()  //获得密码 Object
        //  char[] token.getCredentials() //获得密码 Object
        User user = userService.selectUserName(userName);
        if (user == null) {
            throw new AccountException("用户名不正确");
        }
        //放入shiro.调用CredentialsMatcher检验密码
        //第二参数必须是数据库密码 验证密码功能
        return new SimpleAuthenticationInfo(user, user.getPassword(), this.getClass().getName());
    }


    /**
     * @author lugongqi 授权
     * lutodo
     * Description: 前面配置类中配置了 filterChainDefinitionMap.put("/admin/**", "roles[admin]");
     * 这时进入 /admin 时就会进入 doGetAuthorizationInfo 方法来检查权限；
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        User userInfo = (User) principals.getPrimaryPrincipal();
        List<Role> roles = userService.selectUserRoles(userInfo.getId());
        if (Utils.isEmpty(roles.get(0))){
            roles = new ArrayList<>();
            Role role = new Role();
            role.setId("0");
            roles.add(role);
        }

        for (Role role : roles) {
            authorizationInfo.addRole(role.getRoleName());
            for (Permission p : userService.selectPermissionsByRoleId(role.getId())) {
                authorizationInfo.addStringPermission(p.getPermissionName());
            }
        }
        return authorizationInfo;
    }
}
package com.comic.controller.base;

/*import com.yuanmeng.assist.annotation.LogAop;
import com.yuanmeng.assist.constant.SysConstant;
import com.yuanmeng.assist.utils.RResp;
import com.yuanmeng.entity.User;
import com.yuanmeng.service.UserServiceImpl;*/

import com.comic.common.annotation.LogAop;
import com.comic.common.constant.SysConstant;
import com.comic.common.utils.RResp;
import com.comic.pojo.User;
import com.comic.service.impl.UserServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("login")
public class LoginController {

    @Resource
    public UserServiceImpl userService;


    /**
     * 注册逻辑
     */
    @ResponseBody
    @PostMapping(value = "register.json")
    public RResp register(User user) {
        String s ="" /*userService.registerUser(user)*/;
        if ("注册成功".equals(s)){
            return RResp.ok("注册成功");
        }else {
            return RResp.error(s);
        }
    }




    @LogAop("/loginuser")
    @ResponseBody
    @PostMapping({"loginUser", "userLogin", "toLogin"})
    public RResp loginUser(String userName, String passWord, String rememberMe, HttpSession session) {
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(userName, passWord);
        //记住我 可以访问 user权限和guide权限
        usernamePasswordToken.setRememberMe(Boolean.parseBoolean(rememberMe));
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(usernamePasswordToken);
            //完成登录
            session.setAttribute("localUser", subject.getPrincipal());
            //记住当前登录时间
            User user = (User) subject.getPrincipal();
            //userService.insertLoginLastTime(user.getId());
            return RResp.ok("登录成功");
        } catch (IncorrectCredentialsException e) {
            return RResp.error("密码错误");
        } catch (LockedAccountException e) {
            return RResp.error("登录失败，该用户已被冻结");
        } catch (AuthenticationException e) {
            return RResp.error("该用户不存在");
        } catch (Exception e) {
            //返回登录页面
            return RResp.error(SysConstant.SYS_ERROR);

        }
    }


}
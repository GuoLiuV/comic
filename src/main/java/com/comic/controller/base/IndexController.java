package com.comic.controller.base;

import com.comic.common.constant.SysConstant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping({"","loginPage"})
    public String loginPage() {
        return SysConstant.LOGIN + "login";
    }

    @RequestMapping(value = "hello")
    public String hello() {
        return "hello";
    }

    @RequestMapping(value = "main")
    public String main() {
        return  "base/main";
    }

    @RequestMapping(value = "welcome")
    public String welcome() {
        return "welcome";
    }

    @RequestMapping(value = "base")
    public String back() {
        return "base/index";
    }

    @RequestMapping(value = "unauthc")
    public String unauthc() {
        return "unauthc";
    }

}

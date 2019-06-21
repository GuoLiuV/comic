package com.comic.common.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;

/**
 * 注意：
 * SecurityManager 类导入的应该是 import org.apache.shiro.mgt.SecurityManager;
 * 但是
 * 如果是复制代码过来的话，会默认导入 java.lang.SecurityManager
 * 稍有点坑，其他的类的话，也是都属于 shiro 包里面的类
 */
@Configuration
public class ShiroConfig {
    /**
     * 用于thymeleaf模板使用shiro标签
     */
    @Bean
    public ShiroDialect shiroDialect() {
        return new ShiroDialect();
    }

    /**
     * shiroFilter
     */
    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean shiroFilter(@Qualifier("securityManager") SecurityManager manager) {
        ShiroFilterFactoryBean shiroFilterBean = new ShiroFilterFactoryBean();
        //配置登录界面的url
        shiroFilterBean.setLoginUrl("/loginPage");
        //登录成功的url
        shiroFilterBean.setSuccessUrl("/back");
        //未认证界面
        shiroFilterBean.setUnauthorizedUrl("/unauthc");
        // Shiro的核心安全接口,这个属性是必须的
        shiroFilterBean.setSecurityManager(manager);
        //filterChainDefinitions的配置顺序为自上而下,以最上面的为准
        shiroFilterBean.setFilterChainDefinitions("");
        /**
         * anon---------------org.apache.shiro.web.filter.authc.AnonymousFilter 没有参数，表示可以匿名使用。
         * authc--------------org.apache.shiro.web.filter.authc.FormAuthenticationFilter 表示需要认证(登录)才能使用，没有参数
         * authcBasic---------org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter 没有参数表示httpBasic认证
         * logout-------------org.apache.shiro.web.filter.authc.LogoutFilter
         * noSessionCreation--org.apache.shiro.web.filter.session.NoSessionCreationFilter
         * perms--------------org.apache.shiro.web.filter.authz.PermissionAuthorizationFilter 参数可以写多个，多个时必须加上引号，并且参数之间用逗号分割，例如/admins/user/**=perms["user:add:*,user:modify:*"]，当有多个参数时必须每个参数都通过才通过，想当于isPermitedAll()方法。
         * port---------------org.apache.shiro.web.filter.authz.PortFilter port[8081],当请求的url的端口不是8081是跳转到schemal://serverName:8081?queryString,其中schmal是协议http或https等，serverName是你访问的host,8081是url配置里port的端口，queryString是你访问的url里的？后面的参数。
         * rest---------------org.apache.shiro.web.filter.authz.HttpMethodPermissionFilter 根据请求的方法，相当于/admins/user/**=perms[user:method] ,其中method为post，get，delete等。
         * roles--------------org.apache.shiro.web.filter.authz.RolesAuthorizationFilter 参数可以写多个，多个时必须加上引号，并且参数之间用逗号分割，当有多个参数时，例如admins/user/**=roles["admin,guest"],每个参数通过才算通过，相当于hasAllRoles()方法。
         * ssl----------------org.apache.shiro.web.filter.authz.SslFilter 没有参数，表示安全的url请求，协议为https
         * user---------------org.apache.shiro.web.filter.authz.UserFilter 没有参数表示必须存在用户，当登入操作时不做检查
         *          * 通常可将这些过滤器分为两组
         *          * anon,authc,authcBasic,user是第一组认证过滤器
         *          * perms,port,rest,roles,ssl是第二组授权过滤器
         *          * 注意user和authc不同：当应用开启了rememberMe时,用户下次访问时可以是一个user,但绝不会是authc,因为authc是需要重新认证的
         *          * user表示用户不一定已通过认证,只要曾被Shiro记住过登录状态的用户就可以正常发起请求,比如rememberMe 说白了,以前的一个用户登录时开启了rememberMe,然后他关闭浏览器,下次再访问时他就是一个user,而不会authc
         */
        //配置访问权限
        LinkedHashMap<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
        //表示可以匿名访问
        // anon perms[user:add] roles user anthc
        filterChainDefinitionMap.put("/**/*.js/**", "anon");
        filterChainDefinitionMap.put("/**/*.css", "anon");
        filterChainDefinitionMap.put("/**/*.jpg", "anon");
        filterChainDefinitionMap.put("/**/*.png", "anon");
        filterChainDefinitionMap.put("/**/*.woff", "anon");
        filterChainDefinitionMap.put("/**/*.ttf", "anon");
        filterChainDefinitionMap.put("/favicon.ico", "anon");
        filterChainDefinitionMap.put("/fonts/**", "anon");

        //图表
        filterChainDefinitionMap.put("/graphical/**", "anon");
        filterChainDefinitionMap.put("/test/**", "anon");

        filterChainDefinitionMap.put("/", "anon");
        filterChainDefinitionMap.put("/hello", "anon");
        filterChainDefinitionMap.put("/loginPage", "anon");
        filterChainDefinitionMap.put("/login/toLogin", "anon");
        filterChainDefinitionMap.put("/login/userLogin", "anon");
        filterChainDefinitionMap.put("/login/loginUser", "anon");
        filterChainDefinitionMap.put("/unauthc", "anon");
        filterChainDefinitionMap.put("/mytest/**", "anon");
        /*注册界面*/
        filterChainDefinitionMap.put("/userManager/deptZtree.do", "anon");
        filterChainDefinitionMap.put("/userManager/ztreeUrl.json", "anon");
        filterChainDefinitionMap.put("/login/register.json", "anon");


        filterChainDefinitionMap.put("/rest/**", "anon");
        filterChainDefinitionMap.put("/restTest/**", "anon");
        //注册
        filterChainDefinitionMap.put("/login/register", "anon");
        //文件上传
        filterChainDefinitionMap.put("/fileBaseInfo/**", "anon");
        //配置退出 过滤器,其中的具体的退出代码Shiro已经替我们实现了
        filterChainDefinitionMap.put("/login/logout", "logout");
        //表示需要记住密码才可以访问
        //filterChainDefinitionMap.put("/user/*", "user");
        //表示需要认证才可以访问
        //filterChainDefinitionMap.put("/**", "authc");
        filterChainDefinitionMap.put("/**", "authc");
        //所有请求需要oauth2认证
        //filterChainDefinitionMap.put("/**", "oauth2");
        shiroFilterBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        return shiroFilterBean;
    }

    /**
     * 配置核心安全事务管理器
     */
    @Bean(name = "securityManager")
    public SecurityManager securityManager(@Qualifier("authRealm") AuthRealm authRealm) {
        DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
        manager.setRealm(authRealm);
        return manager;
    }

    /**
     * 配置自定义的权限登录器
     * <p>
     * 不能使用 securityManager.setRealm(new AuthRealm());
     * 必须要使用 @Bean 注入 MyRealm，不能直接 new 对象：
     * 道理也很简单，和 Controller 中调用 Service 一样，都是 SpringBean，不能自己 new
     */
    @Bean(name = "authRealm")
    public AuthRealm authRealm(@Qualifier("credentialsMatcher") CredentialsMatcher matcher) {
        AuthRealm authRealm = new AuthRealm();
        authRealm.setCredentialsMatcher(matcher);
        return authRealm;
    }


    /**
     * 配置自定义的密码比较器
     */
    @Bean(name = "credentialsMatcher")
    public CredentialsMatcher credentialsMatcher() {
        return new CredentialsMatcher();
    }

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator creator = new DefaultAdvisorAutoProxyCreator();
        creator.setProxyTargetClass(true);
        return creator;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(@Qualifier("securityManager") SecurityManager manager) {
        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(manager);
        return advisor;
    }


    /*@Bean
    public SpringTemplateEngine templateEngine(ShiroDialect shiroDialect) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        //templateEngine.setTemplateResolver(templateResolver());
        Set<IDialect> additionalDialects = new LinkedHashSet<IDialect>();
        additionalDialects.add(shiroDialect);
        templateEngine.setAdditionalDialects(additionalDialects);
        return templateEngine;
    }*/

    /*@Bean
    public SpringTemplateEngine templateEngine(ShiroDialect shiroDialect) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());
        Set<IDialect> additionalDialects = new LinkedHashSet<IDialect>();
        additionalDialects.add(shiroDialect);
        templateEngine.setAdditionalDialects(additionalDialects);
        return templateEngine;
    }*/
}


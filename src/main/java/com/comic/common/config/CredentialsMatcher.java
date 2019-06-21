package com.comic.common.config;

/*import com.yuanmeng.entity.User;*/

import com.comic.pojo.User;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.jboss.logging.Logger;

/**
 * @author lugongqi
 * lutodo
 * Description: 自定义密码比较器
 */
public class CredentialsMatcher extends SimpleCredentialsMatcher {
    private Logger logger = Logger.getLogger(CredentialsMatcher.class);
    private final static int hashIterations = 50;
    private final static String algorithmName = "md5";

    /**
     * 获取密码加密后结果
     */
    public static String getAlgorithmName(User user) {
       /* SimpleHash sh = new SimpleHash(algorithmName, user.getPassWord(), user.getUserName(), hashIterations);
        return sh.toHex();*/
       return "";
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        UsernamePasswordToken utoken = (UsernamePasswordToken) token;
        //所需加密的参数  即  用户输入的密码
        //String source = String.valueOf(utoken.getPassword());
        //[盐] 一般为用户名 或 随机数
        //String salt = utoken.getUsername();

        //SimpleHash sh = new SimpleHash(algorithmName, source, salt, hashIterations);
        //String Strsh = sh.toHex();
        //打印最终结果
        //logger.info("输入的密码为：" + Strsh);
        //获得数据库中的密码
        String dbPassword = (String) getCredentials(info);
        //logger.info("数据库密码为：" + dbPassword);
        //进行密码的比对
        return this.equals(String.valueOf(utoken.getPassword()), dbPassword);
    }
}

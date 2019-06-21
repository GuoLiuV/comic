package com.comic.common.aop;

import com.comic.common.annotation.NoRepeatSubmit;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/*import com.yuanmeng.assist.annotation.NoRepeatSubmit;*/

@Aspect
@Component
/**
 * @功能描述 aop解析注解
 * @date 2018-08-26
 */
public class NoRepeatSubmitAop {

    private Log logger = LogFactory.getLog(getClass());

    /*@Autowired
    private Cache<String, Integer> cache;
*/
    @Around("execution(* com.comic.controller.*Controller.*(..)) && @annotation(nrs)")
    public void arround(ProceedingJoinPoint pjp, NoRepeatSubmit nrs) {
        System.out.println(111+"-------------------->>>>>>");
        /*try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            String sessionId = RequestContextHolder.getRequestAttributes().getSessionId();
            HttpServletRequest request = attributes.getRequest();
            String key = sessionId + "-" + request.getServletPath();
            // 如果缓存中有这个url视为重复提交
            if (cache.getIfPresent(key) == null) {
                Object o = pjp.proceed();
                cache.put(key, 0);
                return o;
            } else {
                logger.error("重复提交");
                return null;
            }
        } catch (Throwable e) {
            e.printStackTrace();
            logger.error("验证重复提交时出现未知异常!");
            return "{\"code\":-889,\"message\":\"验证重复提交时出现未知异常!\"}";
        }*/
    }

}

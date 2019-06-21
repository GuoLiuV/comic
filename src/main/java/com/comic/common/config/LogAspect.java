package com.comic.common.config;

import com.comic.common.utils.SysLog;
import com.comic.common.utils.Utils;
import com.comic.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.LocalVariableTableParameterNameDiscoverer;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect// 声明它是一个切面
@Component// 必须将切面作为bean交给spring管理
public class LogAspect {

    @Autowired
    private UserService userService;

    // 声明切点
    @Pointcut("@annotation(com.comic.common.annotation.LogAop)")
    public void pointcut() {
    }

    @Around("pointcut()")
    public Object around(ProceedingJoinPoint point) {
        Object result = null;
        long beginTime = System.currentTimeMillis();
        try {
            // 此处调用的是目标方法
            result = point.proceed();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        // 执行时长(毫秒)
        long time = System.currentTimeMillis() - beginTime;
        // 保存日志
        saveLog(point, time);
        return result;
    }

    private void saveLog(ProceedingJoinPoint joinPoint, long time) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        SysLog sysLog = new SysLog();
        //Log logAnnotation = method.getAnnotation(Log.class);
        //if (logAnnotation != null) {
            // 获取注解上的描述
         //   sysLog.setOperation(logAnnotation.value());
       // }
        // 请求的方法名
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = signature.getName();
        sysLog.setMethod(className + "." + methodName + "()");
        // 请求的方法参数值
        Object[] args = joinPoint.getArgs();
        // 请求的方法参数名称
        LocalVariableTableParameterNameDiscoverer u = new LocalVariableTableParameterNameDiscoverer();
        // 获取方法的参数列表
        String[] paramNames = u.getParameterNames(method);
        if (args != null && paramNames != null) {
            String params = "";
            for (int i = 0; i < args.length; i++) {
                params += "  " + paramNames[i] + ": " + args[i];
            }
            sysLog.setParams(params);
        }
        // 设置IP地址
        sysLog.setIp("127.0.0.1");
        // 模拟一个用户名
        sysLog.setUsername("70KG");
        sysLog.setTime(String.valueOf(time));
        sysLog.setCreateTime(Utils.getCurrentTime());
        // 保存系统日志
        //userService.saveSysLog(sysLog);
    }

}

package com.comic.common.utils;

import com.alibaba.fastjson.JSON;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

/**
 * 工具类
 *
 * @author Administrator
 */
public class Utils {

    /**
     * 判断Object是否为null\"" 如果为""或者null返回true
     */
    public static boolean isEmpty(Object obj) {
        if (obj == null || "".equals(obj)) {
            return true;
        }
        if (obj instanceof Collection) {
            @SuppressWarnings("rawtypes")
            Collection coll = (Collection) obj;
            if (coll.size() <= 0) {
                return true;
            }
        }
        if (obj instanceof Map) {
            @SuppressWarnings("rawtypes")
            Map map = (Map) obj;
            return map.isEmpty();
        }
        return false;
    }

    /**
     * 获得当前年份，格式为“YYYY”
     */
    public static String getYear() {
        Calendar calendar = Calendar.getInstance();
        return String.valueOf(calendar.get(Calendar.YEAR));
    }

    /**
     * 获得当前月份，格式为“MM”
     */
    public static String getMonth() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("MM");
        return sdf.format(calendar.getTime());
    }

    /**
     * 获得当前时间，格式为“yyyy-MM-dd”
     */
    public static String getCurrentTime() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(calendar.getTime());
    }

    public static String getCurrentEntrust() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
        return sdf.format(calendar.getTime());
    }

    /**
     * 获得当前时间，格式为“yyyy-MM-dd”
     */
    public static String getCurrentSecond() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(calendar.getTime());
    }

    /**
     * 该方法将给定的所有对象参数列表转换合并生成一个Map， 对于同名属性，依次由后面替换前面的对象属性
     *
     * @return 对于值为null的对象将忽略掉
     */
    public static Map<String, Object> toMap(Object... objs) {
        Map<String, Object> map = new HashMap<String, Object>();
        for (Object object : objs) {
            if (object != null) {
                map.putAll(toMap(object));
            }
        }
        return map;
    }

    public static Map<String, Object> toMapByBean(Object objs) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (objs != null) {
            map.putAll(toMap(objs));
        }
        return map;
    }

    /**
     * 将Map集合对象转换为JavaBena类， JavaBena类必须拥有默认构造函数.
     *
     * @return Bean对象
     */
    public static <T> T toBean(Map<String, Object> map, Class<T> clazz) {
        T bean = null;
        try {
            Field[] fields = clazz.getDeclaredFields();
            bean = clazz.newInstance();
            for (String key : map.keySet()) {
                for (Field field : fields) {
                    if (key.equals(field.getName())) {
                        System.out.println(key + "==" + field.getName());
                        field.setAccessible(true);// 暴力反射
                        field.set(bean, map.get(key));
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }

    /**
     * 方法说明：对象转化为Map
     *
     * @param object
     * @return
     */
    public static Map<?, ?> objectToMap(Object object) {
        return convertBean(object, Map.class);
    }

    /**
     * 方法说明：将bean转化为另一种bean实体
     *
     * @param object
     * @param entityClass
     * @return
     */
    public static <T> T convertBean(Object object, Class<T> entityClass) {
        if (null == object) {
            return null;
        }
        return JSON.parseObject(JSON.toJSONString(object), entityClass);
    }


    /**
     * 实验室系统 以下
     * 委托单根据目的 确定委托单id
     */
    public static String getFrontByTypeId(String typeValue) {
        switch (typeValue) {
            case "1":
                return "TR";
            case "2":
                return "TD";
            case "3":
                return "TP";
            case "4":
                return "TT";
            case "5":
                return "TC";
            case "6":
                return "TO";
        }
        return typeValue;
    }

    /**
     * shiyanshi
     */
    public static String getCurrentYear() {
        return String.valueOf(Calendar.getInstance().get(Calendar.YEAR));
    }

    /**
     * 获取当月天数
     */
    private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");

    public static Integer getCurrentMonthDays(String source) {
        try {
            Date date = format.parse(source);
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(date);
            return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    // 获取这个时间的 每月天数
    public static Map<Integer,Integer> getMonthIncludeDays(Map<String,String> map){
        Map<Integer,Integer> monthDays = new HashMap<>();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate parseStart  = LocalDate.parse(map.get("start"), dtf);
        LocalDate parseEnd  = LocalDate.parse(map.get("end"), dtf);
        if (parseEnd.getMonthValue() == parseStart.getMonthValue()){
            monthDays.put(parseEnd.getMonthValue(), Period.between(parseStart, parseEnd).getDays() + 1);
        }else {
            int startMonth = parseStart.getMonthValue();
            int endMonth = parseEnd.getMonthValue();
            //开始月
            monthDays.put(parseStart.getMonthValue(),Period.between(parseStart, parseStart.with(TemporalAdjusters.lastDayOfMonth())).getDays());
            //结束月
            monthDays.put(parseEnd.getMonthValue(),parseEnd.getDayOfMonth());
            //其他月份直接返回当月天数
            for (int i = 1; i <= endMonth - startMonth - 1; i++) {
                monthDays.put(startMonth+i,parseStart.plusMonths(i).with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth());
            }
        }
        return monthDays;
    }

    // 返回每月 总天数
    public static Map<Integer,Integer> getAllDaysByMonth(List<Map<String, String>> mapList){
        Map yearMonth = new HashMap<Integer,Integer>();
        for (int i = 1; i <= 12; i++) {
            yearMonth.put(i,0);
        }
        for (int i = 0; i < mapList.size(); i++) {
            Map<Integer, Integer> monthIncludeDays = Utils.getMonthIncludeDays(mapList.get(i));
            for(Map.Entry<Integer, Integer> vo : monthIncludeDays.entrySet()){
                yearMonth.put(vo.getKey(),(int)yearMonth.get(vo.getKey()) + vo.getValue());
            }
        }
        return yearMonth;
    }

}

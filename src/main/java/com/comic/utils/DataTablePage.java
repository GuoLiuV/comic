/*
 * All rights Reserved, Designed By DataDriver
 * Copyright:    DataDriver.Inc
 * Company:      Zhuo Wo Infomation Technology (ShangHai) CO.LTD
 */
package com.comic.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;

import javax.servlet.http.HttpServletRequest;

/**
 * DataTablePage 分页对象
 *
 * @param <T>
 * @Description: 前端插件所用的分页封装
 */
public class DataTablePage<T> extends SimplePage<T> {

    private static final long serialVersionUID = 1L;
    public final static String DRAW = "draw";
    public final static String ORDER = "order";
    public final static String ORDER_COLUMN = "column";
    public final static String ORDER_DIR = "dir";
    public final static String IRECORDSTOTAL = "recordsTotal";
    public final static String IRECORDSFILTERED = "recordsFiltered";

    private String draw;                                    // 获取请求次数
    private long recordsTotal = 0;                // 总记录数
    private long recordsFiltered = 0;                // 过滤后记录数
    private String orderStr;

    public DataTablePage() {

    }

    /**
     * 默认controller中获取基本的三个参数
     * draw
     * order
     * column
     * @param request
     */
    public DataTablePage(HttpServletRequest request) {
        this.draw = request.getParameter(DRAW);
        initPage(request);
        // 排序参数转换
        String orderString = request.getParameter(ORDER);
        if (null == orderString || orderString.trim().isEmpty()) {
            return;
        }
        JSONArray orderJsonArray = JSON.parseArray(orderString);
        JSONObject obj = null;
        StringBuffer orderBuffer = new StringBuffer("");
        for (int i = 0; i < orderJsonArray.size(); i++) {
            obj = orderJsonArray.getJSONObject(i);
            orderBuffer.append(obj.getString(ORDER_COLUMN));
            orderBuffer.append(" ");
            orderBuffer.append(obj.getString(ORDER_DIR));
            if (i != (orderJsonArray.size() - 1)) {
                orderBuffer.append(",");
            }
        }
        this.orderStr = orderBuffer.toString();
    }

    public DataTablePage<T> transfer(DataTablePage<T> result, PageInfo<T> pageList) {
        result.setRecordsTotal(pageList.getPageSize());
        result.setRecordsFiltered(pageList.getTotal());
        result.setFirstPage(pageList.isIsFirstPage());
        result.setLastPage(pageList.isIsLastPage());
        result.setHasNextPage(pageList.isHasNextPage());
        result.setHasPreviousPage(pageList.isHasPreviousPage());
        result.setTotalPages(pageList.getPages());
        result.setData(pageList.getList());
        return result;
    }

    public String getDraw() {
        return draw;
    }

    public void setDraw(String draw) {
        this.draw = draw;
    }

    public long getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(long recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public long getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(long recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public String getOrderStr() {
        return orderStr;
    }

    public void setOrderStr(String orderStr) {
        this.orderStr = orderStr;
    }

}

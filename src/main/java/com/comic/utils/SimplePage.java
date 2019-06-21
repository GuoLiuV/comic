/*
 * All rights Reserved, Designed By DataDriver
 * Copyright:    DataDriver.Inc
 * Company:      Zhuo Wo Infomation Technology (ShangHai) CO.LTD
 */
package com.comic.utils;

import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * DataTablePage
 *
 * @param <T>
 * @Description: 简单分页封装
 */
public class SimplePage<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    public final static String IDISPLAY_START = "start";
    public final static String IDISPLAY_LENGTH = "length";

    private int start = 1;                    // 数据起始位置
    private int length = 10;                    // 数据长度
    private int pageNum = 1;                    // 第几页
    private List<T> data = new ArrayList<T>();

    // 总记录数
    private long total;

    // 是否为第一页
    private boolean isFirstPage = false;
    // 是否为最后一页
    private boolean isLastPage = false;
    // 是否有前一页
    private boolean hasPreviousPage = false;
    // 是否有下一页
    private boolean hasNextPage = false;
    // 总页数
    private int totalPages;
    private int prevPage;
    private int nextPage;

    public SimplePage() {

    }

    /**
     * 默认controller中获取基本的三个参数
     *
     * @param request
     */
    public void initPage(HttpServletRequest request) {
        String startString = request.getParameter(IDISPLAY_START);
        String lengthString = request.getParameter(IDISPLAY_LENGTH);
        if (!StringUtils.isBlank(startString) && StringUtils.isNumeric(startString)) {
            // 前端的参数是从0开始的
            this.start = Integer.parseInt(startString);
        }
        if (!StringUtils.isBlank(startString) && StringUtils.isNumeric(lengthString)) {
            this.length = Integer.parseInt(lengthString);
        }
        this.pageNum = start / length + 1;
    }

    /**
     * @Title: transferPageInfo
     * @Description: 设定简单分页
     */
    public void transferPageInfo(SimplePage<T> result, PageInfo<T> pageInfo) {
        this.setFirstPage(pageInfo.isIsFirstPage());
        this.setLastPage(pageInfo.isIsLastPage());
        this.setHasNextPage(pageInfo.isHasNextPage());
        this.setHasPreviousPage(pageInfo.isHasPreviousPage());
        this.setTotalPages(pageInfo.getPages());
        this.setData(pageInfo.getList());
        this.setTotal(pageInfo.getTotal());
        this.setPrevPage(pageInfo.getPrePage());
        this.setNextPage(pageInfo.getNextPage());
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public boolean isFirstPage() {
        return isFirstPage;
    }

    public void setFirstPage(boolean isFirstPage) {
        this.isFirstPage = isFirstPage;
    }

    public boolean isLastPage() {
        return isLastPage;
    }

    public void setLastPage(boolean isLastPage) {
        this.isLastPage = isLastPage;
    }

    public boolean isHasPreviousPage() {
        return hasPreviousPage;
    }

    public void setHasPreviousPage(boolean hasPreviousPage) {
        this.hasPreviousPage = hasPreviousPage;
    }

    public boolean isHasNextPage() {
        return hasNextPage;
    }

    public void setHasNextPage(boolean hasNextPage) {
        this.hasNextPage = hasNextPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getPrevPage() {
        return prevPage;
    }

    public void setPrevPage(int prevPage) {
        this.prevPage = prevPage;
    }

    public int getNextPage() {
        return nextPage;
    }

    public void setNextPage(int nextPage) {
        this.nextPage = nextPage;
    }
}

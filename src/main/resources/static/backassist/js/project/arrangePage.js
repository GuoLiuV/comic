let Design = function () {

    //查询计划表有多少列
    let listColumns = "/design/listColumns.json";

    // 查询列表 json
    let listJson = "/design/listData.json";

    /**
     * 初始化绑定事件
     */
    var _initBindClick = function () {
        // 查询
        jQuery("#searchBtn").click(function () {
            _initListTable();
        });
    };

    /**
     * 获取列
     * @private
     */
    var _initListTable = function () {
        jQuery.ajax({
            type: 'GET',
            url: listColumns,
            success: function (data) {
                _initListJson(data);
            }
        });
    }



    /***
     * 加载用户列表
     */
    var listTable = null;

    var _initListJson = function (columns) {
            if (listTable != null) {
                listTable.bootstrapTable("refresh", {
                    silent: true
                });
                return;
            }
            listTable = jQuery("#initListTable").bootstrapTable({
                    url: listJson,
                    method: "post",
                    contentType: "application/x-www-form-urlencoded",//一种编码。好像在post请求的时候需要用到。
                    striped: true,// 间隔底色
                    queryParams: paramsQuery,
                    sidePagination: "client",
                    queryParamsType: "limit",
                    pageNumber: 1,
                    pageSize: 32,
                    pagination: false, // 在表格底部显示分页组件，默认false
                    pageList: [10,20,40,60],
                    silent: true,
                    showColumns: false,
                    showRefresh: false,
                    showToggle: false,
                    undefinedText: '---', //当数据为 undefined 时显示的字符
                    singleSelect: true,//设置True 将禁止多选
                    trimOnSearch: true,//设置为 true 将自动去掉搜索字符的前后空格。
                    responseHandler: function (res) {
                        if (typeof (res.rows) == "undefined") {
                            res.total = res.recordsFiltered; // 总数据条数
                            res.rows = res.data; // 数据
                        }
                        return res;
                    },
                    columns: columns,
                    sortName: 'userName', // 要排序的字段
                    sortOrder: 'desc', // 排序规则
                    onLoadSuccess:
                        function (result) {  //加载成功时执行
                            console.info("加载成功");
                        },
                    onLoadError: function () {  //加载失败时执行
                        console.info("加载数据失败");
                    }
                }
            );
        }
    ;


    /**
     * 请求携带的参数
     */
    function paramsQuery(params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            offset: params.offset,  //页码
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
        };
        return temp;
    }

    return {
        init: function () {
            _initListTable();
            _initBindClick();
        }
    }
}
();
//初始化
Design.init();


let Design = function () {

    // 查询列表 json
    let listJson = "/design/designListData.json";

    /***
     * 加载列表
     */
    var listTable = null;
    var _initListTable = function () {
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
                pageSize: 6,
                pagination: true, // 在表格底部显示分页组件，默认false
                pageList: [10,20,40,60],
                silent: true,
                showColumns: false,
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
                columns: [
                    {
                        title: '序号',
                        field: '',
                        align: 'center',
                        formatter: function (value, row, index) {
                            return index + 1;
                        }
                    },
                    {
                        field: 'client',
                        title: '客户',
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'projectName',
                        title: "项目",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'partValue',
                        title: "零件名称",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'partNum',
                        title: "零件号",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'status',
                        title: "状态",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'planStart',
                        title: "计划试验开始时间",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'planEnd',
                        title: "计划试验完成时间",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'realStart',
                        title: "实际试验开始时间",
                        sortable: true,
                        align: "center"
                    }, {
                        field: 'realEnd',
                        title: "实际试验结束时间",
                        sortable: true,
                        align: "center"
                    },{
                        field: '',
                        title: "一月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 1){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 1){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 1){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 1){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "二月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 2){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 2){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 2){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 2){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "三月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 3){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 3){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 3){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 3){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "四月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 4){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 4){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 4){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 4){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "五月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 5){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 5){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 5){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 5){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "六月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 6){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 6){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 6){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 6){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "七月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 7){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 7){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 7){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 7){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "八月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 8){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 8){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 8){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 9){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "九月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 9){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 9){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 9){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 9){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "十月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 10){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 10){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 10){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 10){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "十一月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 11){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 11){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 11){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 11){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },{
                        field: '',
                        title: "十二月",
                        sortable: true,
                        align: "center",
                        formatter:function (value, row, index) {
                            if (row.realStar == 12){
                                return `<i class="fa fa-bell-o" style="color: red;font-size: 160%"></i>`;
                            }
                            if (row.realEn == 12){
                                return `<i class="fa fa-bell-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planEn == 12){
                                return `<i class="fa fa-clock-o" style="color: green;font-size: 160%"></i>`;
                            }
                            if (row.planStar == 12){
                                return `<i class="fa fa-clock-o" style="color: red;font-size: 160%"></i>`;
                            }
                        }
                    },
                ],
                rowStyle: function (row, index) {
                    var style = {
                        // css: { 'height': '10px', 'font-size': 'small', 'classes':'danger'}
                    };
                    return style;
                }
                ,
                sortOrder: 'desc', // 排序规则
                onLoadSuccess:
                    function () {  //加载成功时执行
                        console.info("加载成功");
                    },
                onLoadError: function () {  //加载失败时执行
                    console.info("加载数据失败");
                }
            }
        );
    };


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
        }
    }
}();
//初始化
Design.init();

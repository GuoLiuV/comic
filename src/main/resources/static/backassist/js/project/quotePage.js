let QuotePage = function () {

    // 列表
    let listJson = "/bizPlan/planList.json";
    let delPlanById = "/bizPlan/deleteOne.json";
    let initEditPage = "/bizPlan/selectOnePlanForQuote.do";
    // 报价编辑界面
    let quoteForEntrustUrl = "/bizPlan/selectOneQuoteForPage.do";
    // 报价
    let updateQuoteByEntrustIdUrl = "/bizEntrust/updateQuoteByEntrustId.json";

    /**
     * 初始化绑定事件
     */
    let _initBindClick = function () {
        jQuery("#bs_reset").click(function () {
            jQuery('#bizEntrust_form input').val("");
            jQuery('#bizEntrust_form textarea').val("");
        });
        $("#searchBtn").click(function () {
            _initListTable();
        });
        $("#addBtn").click(function () {
            _initTenancyInfoById();
        });
    };


    let _initListTable = function () {
        //服务器分页显示
        $('#planEditTable').bootstrapTable('destroy').bootstrapTable({
            queryParams: paramsQuery,
            url: listJson, //请求后台的URL（*）
            method: 'post', //请求方式（*）
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            striped: true, //是否显示行间隔色
            singleSelect: true,
            cache: false, //是否使用缓存
            pagination: true, //是否显示分页（*）
            sortable: true, //是否启用排序
            sortOrder: "desc", //排序方式
            sortName: 'alarmTime',//初始化的时候排序的字段
            sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1, //初始化加载第一页，默认第一页
            pageSize: 10, //每页的记录行数（*）
            pageList: [10,20,40,60],
            clickToSelect: true,
            showExport: false, //是否显示导出
            exportDataType: "basic", //basic', 'all', 'selected'.
            responseHandler: function (res) {
                if (typeof (res.rows) == "undefined") {
                    res.total = res.recordsFiltered; // 总数据条数
                    res.rows = res.data; // 数据
                }
                return res;
            },
            onLoadError: function () {  //加载失败时执行
                bootbox.alert("数据加载失败");
            },
            columns: [{
                title: '序号',
                align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'entrustId',
                align: 'center',
                sortable: true,
                title: '委托单号'
            }, {
                field: 'entrustSubmitValue',
                align: 'center',
                sortable: true,
                title: '委托人'
            }, {
                field: 'unit',
                align: 'center',
                sortable: true,
                title: '委托单位'
            }, {
                field: 'projectName',
                align: 'center',
                sortable: true,
                title: '项目名称'
            }, {
                field: 'partNum',
                align: 'center',
                title: '零件号'
            }, {
                field: 'partValue',
                align: 'center',
                title: '零件名称'
            }, {
                field: 'client',
                align: 'center',
                title: '客户'
            }, {
                field: 'tempNum',
                align: 'center',
                title: '样品数量'
            }, {
                field: 'entrustTime',
                align: 'center',
                sortable: true,
                title: '委托时间'
            }, {
                field: 'demandTime',
                align: 'center',
                sortable: true,
                title: '需求时间'
            }, {
                field: 'accept',
                align: 'center',
                sortable: true,
                title: '接受/回退',
                formatter: function (value, c, index) {
                    if (value == '1') {
                        return "接受";
                    } else if (value == '2') {
                        return "回退";
                    } else {
                        return "---";
                    }
                }
            }, {
                field: 'quoteMoney',
                align: 'center',
                sortable: true,
                title: '报价(元)'
            }, {
                field: 'quoteRemork',
                align: 'center',
                sortable: true,
                title: '报价备注'
            }, {
                field: 'entrustId', //操作列,key可随意更换
                title: "操作",
                align: 'center',
                formatter: function (value, c, index) {
                    if (c.accept == '1') {
                        return "已报价";
                    } else if(c.accept == '2'){
                        return "回退";
                    } else {
                        let _tenancyId = value;
                        // 操作按钮
                        let _htmlContent = jQuery("#tenancyListTemp").html();
                        // 编辑,删除,角色设置
                        _htmlContent = (_htmlContent).replace(/temp_id/g, _tenancyId);
                        return _htmlContent;
                    }
                }
            }]
        });
    };

    /**
     * 请求携带的参数
     */
    function paramsQuery(params) {
        let temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            // limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            menuType: 'quote',
            entrustId: $("#entrustId").val(),
            projectName: $("#projectName").val(),
            partValue: $("#partValue").val()
        };
        return temp;
    }


    /**
     * 编辑个人信息
     */
    let _initTenancyInfoById = function (id) {
        location.href = initEditPage + "?entrustId=" + id;
    };



    let _quoteForEntrust = function (id) {
        jQuery('#planEditTable').showLoading();
        jQuery.ajax({
            type: 'get',
            url: quoteForEntrustUrl,
            data: {
                entrustId: id
            },
            success: function (data) {
                jQuery('#planEditTable').hideLoading();
                bootbox.dialog({
                    message: data
                });
            }
        });
    }

    /**
     * 提交报价
     * 保存一
     */
    let _saveQuotePageData = function () {
        // Form 验证字段内容
        jQuery("#quoteEditForm").validate({
            focusInvalid: false,
            errorClass: 'error', // 使用自定义样式
            validClass: '',// 使用自定义样式
            errorElement: "span",
            rules: {
                "accept": {
                    required: true
                },
                quoteMoney: {
                    number: true
                }
            },
            onkeyup: true
        });
        let addForm = jQuery("#quoteEditForm");
        if (!addForm.valid()) {
            return false;
        } else {
            bootbox.confirm({
                size: 'small',
                message: MSG_SAVE,
                buttons: {
                    confirm: {
                        SAVE_YES
                    },
                    cancel: {
                        SAVE_NO
                    }
                },
                callback: function (result) {
                    if (result) {
                        _saveTenancyData();
                    }
                }
            });
        }
    };

    // 保存二
    let _saveTenancyData = function () {
        jQuery('#quoteEditForm').showLoading();
        jQuery.ajax({
            type: 'POST',
            url: updateQuoteByEntrustIdUrl,
            data: jQuery("#quoteEditForm").serialize(),
            success: function (data) {
                jQuery('#quoteEditForm').hideLoading();
                bootbox.confirm({
                    size: 'small',
                    message: data.msg,
                    buttons: {
                        confirm: {
                            SAVE_YES
                        },
                        cancel: {
                            SAVE_NO
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            bootbox.hideAll();
                        }
                        _initListTable();
                    }
                });
            }
        });
    };


    return {
        init: function () {
            _initListTable();
            _initBindClick();
        },
        editPlanById: function (id) {
            _initTenancyInfoById(id);
        },
        quoteForEntrust: function (id) {
            _quoteForEntrust(id)
        },
        saveQuotePageData: function () {
            _saveQuotePageData();
        }
    }
}();
//初始化
QuotePage.init();
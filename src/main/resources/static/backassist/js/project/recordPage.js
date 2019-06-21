let RecordPage = function () {

    //路径
    let listJson = "/bizPlan/planList.json";
    let saveEditPage = "/bizPlan/saveQuoteEditPage.json";
    let delPlanById = "/bizPlan/deleteOneQuote.json";
    //实验项编辑界面
    let initEditPage = "/bizPlan/recordEdit.do";

    //取值
    let entrustId = $("#entrustId").val();

    // 初始化绑定事件
    let _initBindClick = function () {
        jQuery("#bs_reset").click(function () {
            jQuery('#bizEntrust_form input').val("");
            jQuery('#bizEntrust_form textarea').val("");
        });
    };

    // 显示列表
    let _initPlanListTable = function () {
        //服务器分页显示
        $('#initListTable').bootstrapTable('destroy').bootstrapTable({
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
                field: 'projectName',
                align: 'center',
                sortable: true,
                title: '项目名称'
            }, {
                field: 'partValue',
                align: 'center',
                title: '零件名称'
            }, {
                field: 'partNum',
                align: 'center',
                title: '零件号'
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
                field: 'quoteMoney',
                align: 'center',
                title: '报价'
            }, {
                field: 'tempIndex',
                align: 'center',
                title: '样件编号'
            }, {
                field: 'enstrustPross',
                align: 'center',
                title: '试验进度'
            }, {
                field: 'entrustStatus',
                align: 'center',
                title: '状态',
                formatter: function (value, c, index) {
                    if(value == '1'){
                        return "ongoing";
                    }else if(value == '2'){
                        return "end";
                    }else{
                        return "wait";
                    }

                }
            }, {
                field: 'enstrustResult',
                align: 'center',
                title: '结果'
            }, {
                field: 'enstrustManagerValue',
                align: 'center',
                title: '责任人'
            }, {
                field: 'id',// 操作列,key可随意更换
                title: "操作",
                align: 'center',
                formatter: function (value, c, index) {
                    let _tenancyId = value;
                    // 操作按钮
                    let _htmlContent = jQuery("#tenancyListTemp").html();
                    // 编辑,删除,角色设置
                    _htmlContent = (_htmlContent).replace(/temp_id/g, _tenancyId);
                    return _htmlContent;
                }
            }]
        });
    };

    /**
     * 请求携带的参数
     */
    function paramsQuery(params) {
        console.log(params);
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            // limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            menuType: "record",
            planProject: $("#planProject").val(),
            accept: $("#accept").val()
        };
        return temp;
    }

    /**
     * 编辑个人信息
     */
    let _initTenancyInfoById = function (id) {
        //bootbox.alert(id);
        location.href = initEditPage + "?id=" + id;
        /*let title = "新增试验计划";
        if (id != null && id != "") {
            title = "编辑试验计划";
        }
        jQuery.ajax({
            type: 'GET',
            url: initEditPage,
            data: {
                id: id,
                entrustId: entrustId
            },
            success: function (data) {
                bootbox.dialog({
                    message: data,
                    title: title,
                });
            }
        });*/
    };

    /**
     * 删除
     */
    let _delTenancyBtId = function (id) {
        bootbox.confirm({
            size: 'small',
            message: "确定删除该条记录？",
            buttons: {
                confirm: {
                    label: "确定"
                },
                cancel: {
                    label: "取消"
                }
            },
            callback: function (result) {
                if (result) {
                    jQuery.ajax({
                        type: 'POST',
                        url: delPlanById,
                        data: {
                            "planId": id
                        },
                        beforeSend: function () {
                            return true;
                        },
                        success: function (data) {
                            bootbox.alert({
                                size: "small",
                                message: data.msg
                            });
                            _initPlanListTable();
                        }
                    });
                }
            }
        })
    };

    /**
     * 保存 步骤一
     */
    let _saveTenancyDataBefore = function () {
        // Form 验证字段内容
        jQuery("#tempEditForm").validate({
            focusInvalid: false,
            errorClass: 'error', // 使用自定义样式
            validClass: '',// 使用自定义样式
            errorElement: "span",
            rules: {
                "planProject": {
                    required: true,
                    maxlength: 50
                }
            },
            onkeyup: true
        });
        let addForm = jQuery("#tempEditForm");
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

    /**
     * 保存 步骤二
     */
    let _saveTenancyData = function () {
        jQuery('#tempEditForm').showLoading();
        jQuery.ajax({
            type: 'POST',
            url: saveEditPage,
            data: jQuery("#tempEditForm").serialize(),
            success: function (data) {
                jQuery('#tempEditForm').hideLoading();
                bootbox.alert({
                    size: 'small',
                    message: data.msg,
                    callback: function (result) {
                        // 重新加载列表
                        _initPlanListTable();
                        // 隐藏所有的bootbox
                        bootbox.hideAll();
                    }
                });
            }
        });
    };


    /**
     * 编辑个人信息
     */
    let _initEditByEntrustId = function (id) {
        location.href = initEditPage + "?id=" + id;
    };

    return {
        init: function () {
            //_initBindClick();
            _initPlanListTable();
        },
        searchFuc: function () {
            _initPlanListTable();
        },
        addFunc: function () {
            _initTenancyInfoById();
        },
        editPlanById: function (id) {
            _initTenancyInfoById(id);
        },
        deletePlanById: function (id) {
            _delTenancyBtId(id);
        },
        savePlanTenancyData: function () {
            _saveTenancyDataBefore();
        }
    }
}();

//初始化
RecordPage.init();
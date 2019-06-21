let PlanEditPage = function () {

    //路径
    let listJson = "/bizPlan/planListByEntrustId.json";
    let delPlanById = "/bizPlan/deleteOnePlan.json";
    let initEditPage = "/bizPlan/selectOnePlanForPage.do";
    let saveEditPage = "/bizPlan/saveEditPage.json";

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
                field: 'planProject',
                align: 'center',
                sortable: true,
                title: '试验项目'
            }, {
                field: 'stand',
                align: 'center',
                sortable: true,
                title: '试验标准/出处'
            }, {
                field: 'planFunc',
                align: 'center',
                sortable: true,
                title: '试验描述'
            }, {
                field: 'engiValue',
                align: 'center',
                title: '试验设备'
            }, {
                field: 'tempSortId',
                align: 'center',
                title: '样件编号'
            }, {
                field: 'planStart',
                align: 'center',
                title: '计划开始时间'
            }, {
                field: 'planEnd',
                align: 'center',
                title: '计划结束时间'
            }, {
                field: 'id',// 操作列,key可随意更换
                title: "操作",
                align: 'center',
                formatter: function (value, c, index) { // value,row,index
                    var _tenancyId = value;
                    // 操作按钮
                    var _htmlContent = jQuery("#tenancyListTemp").html();
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
            entrustId: $("#entrustId").val()
        };
        return temp;
    }

    /**
     * 编辑个人信息
     */
    let _initTenancyInfoById = function (id) {
        let title = "新增试验计划";
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
        });
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
                },
                "stand": {
                    required: true,
                    maxlength: 50
                },
                "tempSortId": {
                    required: true,
                    maxlength: 50
                },
                "engiId": {
                    required: true,
                    maxlength: 50
                },
                "planStart": {
                    required: true,
                    maxlength: 50
                },
                "planEnd": {
                    required: true,
                    maxlength: 50
                },
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

    return {
        init: function () {
            _initBindClick();
            _initPlanListTable();
        },
        searchFuc:function(){
            _initPlanListTable();
        },
        addFunc: function(){
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

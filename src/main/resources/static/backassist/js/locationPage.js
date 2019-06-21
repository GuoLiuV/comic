let Location = function () {

    // 初始化页面
    let initEdit = "/bizLocation/userPage.do";
    // 查询列表 json
    let listJson = "/bizLocation/listData.json";
    // 初始化新增编辑页面
    let initEditPage = "/bizLocation/initPage.do";
    // 保存用户信息
    let saveUserPage = "/bizLocation/userAddOrUpdate.json";
    // 删除用户
    let delUserById = "/bizLocation/localDel.json";

    /**
     * 初始化绑定事件
     */
    var _initBindClick = function () {
        // 查询
        jQuery("#searchBtn").click(function () {
            _initListTable();
        });
        // 新增
        jQuery("#addBtn").click(function () {
            _initTenancyInfoById();
        });
    };

    /***
     * 加载用户列表
     */
        // var draw = 0;
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
                    showExport: true,
                    exportDataType: 'all',
                    exportTypes: ['json', 'csv', 'txt', 'excel'],
                    pageNumber: 1,
                    pageSize: 6,
                    pagination: true, // 在表格底部显示分页组件，默认false
                    pageList: [10,20,40,60],
                    silent: true,
                    showColumns: false,
                    showRefresh: true,
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
                                // var pageSize = $('#table的id').bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
                                // var pageNumber = $('#table的id').bootstrapTable('getOptions').pageNumber; //通过table的#id 得到当前第几页
                                // return pageSize * (pageNumber - 1) + index + 1;    // 返回每条的序号： 每页条数 *（当前页 - 1 ）+ 序号
                            }
                        },
                        {
                            field: 'location',
                            title: '存储位置',
                            sortable: true,
                            align: "center"
                        }, {
                            field: 'status',
                            title: "状态",
                            sortable: true,
                            align: "center",
                            formatter: function (value) {
                                value = value ? value : '';
                                if (value == 1) {
                                    value = "使用中";
                                } else if (value == 2) {
                                    value = "已停用";
                                } else {
                                    value = "-";
                                }
                                return value;
                            }
                        }, {
                            field: 'updateTime',
                            title: "更新时间",
                            sortable: true,
                            align: "center"
                        }, {
                            field: 'remark',
                            title: "备注",
                            sortable: true,
                            align: "center",
                            formatter: function (value, row, index) {
                                //此处对value值做判断，不然value为空就会报错
                                value = value ? value : '';
                                var length = value.length;
                                if (length && length > 7) {
                                    length = 7;
                                    return "<span title ='" + value + "'>" + value.substring(0, length) + '<span style="color: red">***</span>' + "</span>";
                                }
                                return value;
                            }
                        }, {
                            field: 'id',// 操作列,key可随意更换
                            title: "操作",
                            align: "center",
                            formatter: function (value, c, index) {
                                let _tenancyId = value;
                                // 操作按钮
                                let _htmlContent = jQuery("#tenancyListTemp").html();
                                // 编辑,删除,角色设置
                                _htmlContent = (_htmlContent).replace(/temp_id/g, _tenancyId);
                                return _htmlContent;
                            }
                            //events: operateEvernts, formatter: addFunction,
                        }
                    ],
                    rowStyle: function (row, index) {
                        var style = {
                            // css: { 'height': '10px', 'font-size': 'small', 'classes':'danger'}
                        };
                        return style;
                    }
                    ,
                    sortName: 'userName', // 要排序的字段
                    sortOrder:
                        'desc', // 排序规则
                    onLoadSuccess:
                        function (result) {  //加载成功时执行
                            console.info("加载成功");
                        }
                    ,
                    onLoadError: function () {  //加载失败时执行
                        bootbox.alert("加载数据失败");
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
            location: $("#location").val(),
            status: $("#status").val(),
        };
        return temp;
    }

    /**
     * 保存 步骤一
     */
    let _saveTenancyData = function () {
        // Form 验证字段内容
        jQuery("#editFrom").validate({
            focusInvalid: false,
            errorClass: 'error', // 使用自定义样式
            validClass: '',// 使用自定义样式
            errorElement: "span",
            rules: {
                "location": {
                    required: true
                },
                "status": {
                    required: true
                },
            },
            onkeyup: true
        });
        let addForm = jQuery("#editFrom");
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
                        _saveSecTenancyData();
                    }
                }
            });
        }
    };

    /**
     * 保存 步骤二
     */
    let _saveSecTenancyData = function () {
        jQuery('#editFrom').showLoading();
        jQuery.ajax({
            type: 'POST',
            url: saveUserPage,
            data: jQuery("#editFrom").serialize(),
            success: function (data) {
                jQuery('#editFrom').hideLoading();
                bootbox.alert({
                    size: 'small',
                    message: data.msg,
                    callback: function (result) {
                        // 重新加载列表
                        _initListTable();
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
    var _initTenancyInfoById = function (id) {
        let title = "新增存储位置";
        if (id != null && id != "") {
            title = "编辑存储信息";
        }
        jQuery.ajax({
            type: 'GET',
            url: initEditPage,
            data: {
                id: id
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
    var _delTenancyBtId = function (id) {
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
                        url: delUserById,
                        data: {
                            "localId": id
                        },
                        success: function (data) {
                            bootbox.alert(data.msg);
                        }
                    });
                }
            }
        })
    };

    return {
        init: function () {
            _initListTable();
            _initBindClick();
        },
        deleteById: function (id) {
            _delTenancyBtId(id);
        },
        // 编辑初始化界面
        editLocationId: function (id) {
            _initTenancyInfoById(id);
        },
        // 点击保存
        saveTenancyData: function () {
            _saveTenancyData();
        }
    }
}
();
//初始化
Location.init();

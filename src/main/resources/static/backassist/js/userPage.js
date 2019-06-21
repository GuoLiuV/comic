let User = function () {

    // 初始化页面
    let initEdit = "/userManager/userPage";
    // 查询列表 json
    let listJson = "/userManager/userList.json";
    // 初始化新增编辑页面
    let initEditPage = "/userManager/initPage.do";
    // 保存用户信息
    let saveUserPage = "/userManager/userAddOrUpdate.json";
    // 删除用户
    let delUserById = "/userManager/userDel.json";
    // 用户部门 界面
    let _deptZtreeUrl = "/userManager/deptZtree.do";
    // 用户部门 数据
    let _ztreejson = "/userManager/ztreeUrl.json";

    /**
     * 初始化绑定事件
     */
    let _initBindClick = function () {
        // 查询
        jQuery("#userSearchBtn").click(function () {
            _initUserListTable();
        });
        // 新增
        jQuery("#userAddBtn").click(function () {
            _initTenancyInfoById();
        });
    };

    /***
     * 加载用户列表
     */
        // let draw = 0;
    let listTable = null;
    let _initUserListTable = function () {
        if (listTable != null) {
            listTable.bootstrapTable("refresh", {
                silent: true
            });
            return;
        }
        listTable = jQuery("#userListTable").bootstrapTable({
            url: listJson,
            method: "get",
            //contentType: "application/x-www-form-urlencoded",//一种编码。好像在post请求的时候需要用到。这里用的get请求，注释掉这句话也能拿到数据
            //toolbar: jQuery("#userListTable").siblings(".dd-table-title"),
            //toolbar: '#toolbar',//指定工具栏
            striped: true,// 间隔底色
            //searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
            //dataField: "data",//这是返回的json数组的key.默认是"rows".这里只有前后端约定好就行
            //cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
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
            //toolbarAlign: 'right',// 指定 toolbar 水平方向的位置。'left' 或 'right'
            //paginationDetailHAlign: 'left',//指定 分页详细信息 在水平方向的位置。'left' 或 'right'。
            //showHeader: true,//是否显示列头。
            trimOnSearch: true,//设置为 true 将自动去掉搜索字符的前后空格。
            //clickToSelect: true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
            //function (params) {
            /*draw++;
            // 查询表单的参数
            let formData = jQuery("#tenancyListForm").serializeJSON();
            let json = {
                "draw": draw,
                "start": params.offset,
                "length": params.limit
            };
            if (params.sort) {
                json["order"] = "[{\"column\":\"" + params.sort + "\",\"dir\":\"" + params.order + "\"}]";
            }
            let c = jQuery.extend({}, formData, json);
            return c;*/
            //}
            responseHandler: function (res) {
                if (typeof (res.rows) == "undefined") {
                    res.total = res.recordsFiltered; // 总数据条数
                    res.rows = res.data; // 数据
                }
                return res;
            },
            columns: [
                //{
                //checkbox: true, // 显示一个勾选框
                //  align: 'center', // 居中显示
                // valign: 'middle',    //设置单元格数据的上下对齐方式， 可选择的值有：’top’, ‘middle’, ‘bottom’
                // formatter: function (value, row, index) { // 单元格格式化函数
                //     //value： 该列的字段值；
                //     //row： 这一行的数据对象；
                //     // index： 行号，第几行，从0开始计算
                //     let text = '-';
                //     if (value == 1) {
                //         text = "方式一";
                //     } else if (value == 2) {
                //         text = "方式二";
                //     } else if (value == 3) {
                //         text = "方式三";
                //     } else if (value == 4) {
                //         text = "方式四";
                //     }
                //     return value;
                // },
                //
                // cellStyle: function (value, row, index) {                           // cell的样式设置,可以返回css或者classes
                //     return {
                //         css: { 'height': '10px', 'font-size': 'small' },
                //         classes: 'danger'
                //     }
                // },
                // events: function (value, row, index) {
                //     alert(value);
                // }
                //},
                // {
                //     radio: true,            //设置为True的时候 则显示一列radio组件，该列的宽度为固定宽度
                //     align: 'center', // 居中显示
                //     // formatter: function (value, row, index) {
                //     //     return '<button class="btn btn-primary btn-sm" onclick="del(\'' + row.Age + '\')">删除</button> <button class="btn btn-primary btn-sm" onclick="del(\'' + row.Age + '\')">删除</button>';
                //     // },
                //     // cellStyle: function (value, row, index) {
                //     //     return { classes: 'danger' }
                //     // }
                // },
                {
                    field: 'userName',
                    title: '用户名',
                    sortable: true,
                    align: "center"
                    //valign: 'middle', // 上下居中

                }, {
                    field: 'realName',
                    title: "部门",
                    sortable: true,
                    align: "center"
                }, {
                    field: 'passWord',
                    title: "密码",
                    sortable: true,
                    align: "center"
                }, {
                    field: 'phone',
                    title: "旧密码",
                    sortable: true,
                    align: "center"
                }, {
                    field: 'role',
                    title: "角色",
                    sortable: true,
                    align: "center",
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "工程师";
                        } else if (value == 2) {
                            return "试验计划工程师";
                        } else if (value == 3) {
                            return "实验工程师";
                        } else if (value == 4) {
                            return "管理员";
                        } else if (value == 5) {
                            return "部长";
                        } else {
                            return "---";
                        }
                    }
                }, {
                    field: 'vcWorknumber',
                    title: "菜单",
                    sortable: true,
                    align: "center",
                    formatter: function (value, row, index) {
                        value = value ? value : '---';
                        //let length = value.length;
                        if(row.role == '1'){
                            return "委托单";
                        }else if(row.role == '2'){
                            return  "委托单;试验计划;试验项纪录界面";
                        }else if(row.role == '3'){
                            return "除用户管理所有菜单";
                        }else if(row.role == '4'){
                            return "所有权限";
                        }else if(row.role == '5'){
                            return "所有菜单，仅查看本部门数据";
                        }else {
                            return value;
                        }
                        /*if (length && length > 10) {
                            length = 10;
                            return "<span title ='" + value + "'>" + value.substring(0, length) + '<span style="">***</span>' + "</span>";
                        }*/
                    }
                }, {
                   /* field: 'vcLoginName',
                    title: "自己",
                    sortable: true,
                    align: "center"
                }, {
                    field: 'vcAvatar',
                    title: "本部门",
                    sortable: true,
                    align: "center"
                }, {
                    field: 'status',
                    title: "公司",
                    sortable: true,
                    align: "center"
                }, {*/
                    field: 'id',// 操作列,key可随意更换
                    title: "操作",
                    align: "center",
                    events: operateEvernts,
                    formatter: addFunction,
                    //function (value, c, index) { // value,row,index
                    /*let str =
                        `<button class='btn btn-warning btn-sm' onclick='User.deleteUserByUserId(value)'>编辑</button>&nbsp;` +
                        `<button class='btn btn-danger btn-sm'  onclick='User.deleteUserByUserId(1)'>删除</button>`
                    return str;*/
                    //}
                }],
            rowStyle: function (row, index) {
                let style = {
                    // css: { 'height': '10px', 'font-size': 'small', 'classes':'danger'}
                };
                return style;
            },
            sortName: 'userName', // 要排序的字段
            sortOrder: 'desc', // 排序规则
            onLoadSuccess: function (result) {  //加载成功时执行
                console.info("加载成功");
            },
            onLoadError: function () {  //加载失败时执行
                console.info("加载数据失败");
            },

            //>>>>>>>>>>>>>>导出excel表格设置
            /*showExport: phoneOrPc(),              //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
            exportDataType: "basic",              //basic', 'all', 'selected'.
            exportTypes: ['excel', 'xlsx'],	    //导出类型
            //exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
            exportOptions: {
                //ignoreColumn: [0,0],            //忽略某一列的索引
                fileName: '数据导出',              //文件名称设置
                worksheetName: 'Sheet1',          //表格工作区名称
                tableName: '商品数据表',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                //onMsoNumberFormat: DoOnMsoNumberFormat
            }*/
            //导出excel表格设置<<<<<<<<<<<<<<<<
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
            userName: $("#userName").val(),
            realName: $("#realName").val(),
            role: $("#role").val(),
        };
        return temp;
    }

    function addFunction() {
        let str =
            `<button id="tableEdit" class='btn btn-warning btn-sm'>编辑</button>&nbsp;` +
            `<button id="tableDelete" class='btn btn-danger btn-sm'>删除</button>`
        return str;
    }

    window.operateEvernts = {
        "click #tableEdit": function (e, value, row, index) {
            User.editUserByUserId(value);
        },
        "click #tableDelete": function (e, value, row, index) {
            User.deleteUserByUserId(value);
        }
    }


    /**
     * 保存
     */
    let _saveTenancyData = function () {
        $("#userForm").showLoading();
        jQuery.ajax({
            type: 'POST',
            url: saveUserPage,
            data: jQuery("#userForm").serialize(),
            beforeSend: function () {
                return true;
                /*$("#example_form").validate({
                    rules: {
                        userName: {
                            required: true,
                            minlength: 16,
                            maxlength: 24
                        }
                        /!*age: {
                            required: true,
                            rangelength: [1, 3],
                            min: 10
                        },
                        birthday: {
                            required: true,
                            //date:true,
                            dateISO: true
                        },
                        card: {
                            required: {
                                depends: function(element) {
                                    return $("#user_age").val() >= 18;
                                }
                            },
                            creditcard: true
                        },
                        salary: {
                            required: true,
                            step: {
                                param: 100,
                                depends: function(element) {
                                    return $("#user_age").val() >= 28;
                                }
                            }
                        },
                        prove: {
                            required: function(element) {
                                return $("#user_age").val() >= 18;
                            },
                            extension: "xls|csv|doc"
                        },
                        phone: {
                            require_from_group: [1, ".phone_group"],
                            phoneUS: true
                        },
                        mobile: {
                            require_from_group: [1, ".phone_group"]
                        },
                        image: {
                            required: true,
                            accept: "image/!*"
                            //accept:"audio/!*,image/x-eps,application/pdf"
                        },
                        home: {
                            required: true,
                            url: true,
                            // 校验之前对内容进行处理
                            normalizer: function(element) {
                                let url = $.trim($(element).val());
                                // Check if it doesn't start with http:// or https:// or ftp://
                                if (url && url.substr(0, 7) !== "http://" && url.substr(0, 8) !== "https://" && url.substr(0, 6) !== "ftp://") {
                                    // then prefix with http://
                                    url = "http://" + url;
                                }
                                // Return the new url
                                return url;
                            },
                            // 失去焦点时进行校验
                            onfocusout: function(element, event) {
                                console.log(element);
                            },
                            onkeyup: function(element, event) {
                                console.log(element);
                            },
                            onclick: function(element, event) {
                                console.log(element);
                            }

                        },
                        password: {
                            required: true,
                            minlength: 6
                        },
                        repassword: {
                            required: true,
                            equalTo: "#user_password"
                        },
                        email: {
                            required: "#send_to_me:checked",
                            email: true,
                            remote: {
                                url: "http://localhost:8080/check/register",
                                type: "post",
                                dataType: "json",
                                data: {
                                    email: $("#user_email").val()
                                }
                            }
                        },
                        regAgree: {
                            required: true
                        }*!/
                    },
                    //自定义错误提示信息
                    messages: {
                        name: {
                            required: "请输入用户名",
                            minlength: jQuery.validator.format("用户名至少需填写{0}个字符"),
                            maxlength: jQuery.validator.format("用户名最多填写{0}个字符")
                        }
                    },
                });*/
            },
            success: function (data) {
                $("#userForm").hideLoading();
                bootbox.alert({
                    size: "small",
                    message: data.msg
                });
                _initUserListTable();
                bootbox.hideAll();
            }
        })
    };

    /**
     * 编辑个人信息
     */
    let _initTenancyInfoById = function (id) {
        let title = "新增用户信息";
        if (id != null && id != "") {
            title = "编辑用户信息";
        }
        jQuery.ajax({
            type: 'GET',
            url: initEditPage,
            data: {
                userId: id
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
                        url: delUserById,
                        data: {
                            "userId": id
                        },
                        beforeSend: function () {
                            if (id == 1) {
                                bootbox.alert("admin账号不能删！！");
                                return false;
                            } else {
                                return true;
                                ;
                            }
                        },
                        success: function (data) {
                            bootbox.alert(data.msg);
                            _initUserListTable;
                        }
                    });
                }
            }
        })
    };


    /**
     * 用户部门 选择
     */
    let _deptZtree = function () {
        jQuery.ajax({
            type: 'GET',
            url: _deptZtreeUrl,
            success: function (data) {
                bootbox.dialog({
                    message: data,
                    title: "公司部门组织"
                });
                _initPermissionTree();
            }
        });
    }

    /**
     * 部门树[zTree]
     */
    function _initPermissionTree() {
        var setting = {
            check: {
                enable: true,
                chkStyle: "radio",
                radioType: "level",
                chkStyle: 'radio'
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
        $.ajax({
            url: _ztreejson,
            type: 'get',
            success: function (data) {
                var zNodes = data;
                $.fn.zTree.init(jQuery("#permissionTree"), setting, zNodes);
            },
            error: function () {
                bootbox.alert({
                    size: "small",
                    message: "数据加载失败"
                })
            }
        })
    };

    return {
        init: function () {
            _initUserListTable();
            _initBindClick();
        },
        deleteUserByUserId: function (id) {
            _delTenancyBtId(id);
        },
        // 编辑初始化界面
        editUserByUserId: function (id) {
            _initTenancyInfoById(id);
        },
        // 点击保存
        saveTenancyData: function () {
            _saveTenancyData();
        },
        deptZtree: function () {
            _deptZtree();
        }
    }
}
();
//初始化
User.init();

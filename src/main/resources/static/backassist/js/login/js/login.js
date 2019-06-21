function cambiar_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

    setTimeout(function () {
        document.querySelector('.cont_form_login').style.opacity = "1";
    }, 400);

    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = "none";
    }, 200);
}

function cambiar_sign_up(at) {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.opacity = "1";
    }, 100);

    setTimeout(function () {
        document.querySelector('.cont_form_login').style.display = "none";
    }, 400);


}


function ocultar_login_sign_up() {

    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = "none";
        document.querySelector('.cont_form_login').style.display = "none";
    }, 500);

}


let Login = function () {

    let _logUrl = "/login/toLogin";
    let _registUrl = "/login/register.json";
    let _deptZtreeUrl = "/userManager/deptZtree.do";
    let _ztreejson = "/userManager/ztreeUrl.json";

    /*提交登录表单*/
    function _onSubmit() {
        $.ajax({
            type: "post",
            url: _logUrl,
            data: {
                userName: $("#userName").val(),
                passWord: $("#passWord").val(),
            },
            success: function (responseText) {
                if (200 == responseText.code) {
                    location.href = "/base";
                } else {
                    $("#msg").html(responseText.msg);
                }
            },
            error: function () {
                bootbox.alert({
                    size: "small",
                    message: "数据加载失败"
                });
            },
        })
    };

    function _deptZtree() {
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
     * 权限树[zTree]
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


    function _saveDeptForInput() {
        /**
         * 点击保存
         */
        bootbox.confirm({
            size: 'small',
            message: "确认保存",
            buttons: {
                confirm: {
                    label: "确认"
                },
                cancel: {
                    label: "取消"
                }
            },
            callback: function (result) {
                if (result) {
                    _saveRolePermission();
                }
            }
        })
    }

    /**
     * 点击保存用户部门
     */
    function _saveRolePermission() {
        //$('#ROLE_ACTION_FORM').showLoading();
        // 1 获取已勾选的节点ID
        // 1.1获取ZTree对象
        var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
        // 1.2获取已勾选的节点数组
        var nodes = treeObj.getCheckedNodes(true);
        // 1.3遍历数组，取出ID
        //var _permissionIds = '';
        /*for (var i = 0; i < nodes.length; i++) {
            _permissionIds += nodes[i].id + ',';
        }*/
        //_permissionIds = _permissionIds == '' ? '' : _permissionIds.substring(0, _permissionIds.length - 1);

        var _permissionIds = nodes[0].id;
        $("#dept").val(_permissionIds);
        $("#deptValue").val(nodes[0].name);
        //隐藏所有的bootbox
        bootbox.hideAll();
    }


    /**
     * 注册用户
     */
    let _registerData = function () {
        $.ajax({
            type: "post",
            url: _registUrl,
            data: {
                /*realName 改成部门id了*/
                realName: $("#dept").val(),
                userName: $("#userNameReg").val(),
                passWord: $("#passWordReg").val(),
            },
            beforeSend: function () {
            },
            success: function (responseText) {
                bootbox.alert(responseText.msg);
                if (responseText.code == 200) {
                    ocultar_login_sign_up();
                }
            },
            error: function () {
                bootbox.alert({
                    size: "small",
                    message: "数据请求失败"
                });
            },
        })
    }
    /*let _registerData = function () {
        // Form 验证字段内容
        jQuery("#userRegistForm").validate({
            focusInvalid: false,
            errorClass: 'error', // 使用自定义样式
            validClass: '',// 使用自定义样式
            errorElement: "span",
            rules: {
                "userOldPassWord": {
                    required: true,
                    maxlength: 50
                },
                "passWord": {
                    required: true,
                    maxlength: 50
                },
            },
            onkeyup: true
        });
        let addForm = jQuery("#userRegistForm");
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
        jQuery('#userRegistForm').showLoading();
        jQuery.ajax({
            type: 'POST',
            url: saveMyPassWord,
            data: jQuery("#userRegistForm").serialize(),
            success: function (data) {
                jQuery('#userRegistForm').hideLoading();
                bootbox.alert({
                    size: 'small',
                    message: data.msg,
                    callback: function (result) {
                        // 执行
                        //_registDataBefore()();
                        bootbox.alert("注册成功");
                        bootbox.hideAll(); // 隐藏所有的bootbox
                    }
                });
            }
        });
    };*/


    return {
        onSubmit: function () {
            _onSubmit();
        },
        deptZtree: function () {
            _deptZtree();
        },
        saveDeptForInput: function () {
            _saveDeptForInput();
        },
        registerData: function () {
            _registerData();
        }
    }

}();
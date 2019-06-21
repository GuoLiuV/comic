var BizEntrust = function () {
    let saveBizEntrust = "/bizEntrust/insertOne.json";
    let getForEntrustId = "/bizEntrust/getForEntrustId.json";


    let _bindClick = function () {
        $('#entrustTime').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });
        $('#demandTime').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });

        $(":radio").click(function () {
            let value = $(this).val();
            $.ajax({
                url: getForEntrustId,
                data: {
                    typeId: value
                },
                type: 'POST',
                dataType: 'JSON',
                timeout: 3000,
                error: function () {
                    bootbox.alert({
                        size: "small",
                        message: "网络加载失败"
                    })
                },
                success: function (data) {
                    if (data.code == 200) {
                        $("#entrustId").val(data.msg);
                    } else {
                        $("#entrustId").val('系统错误');
                    }
                }
            });
        });
    }

    // 保存一
    let _saveTenancyDataBefore = function () {
        // Form 验证字段内容
        jQuery("#bizEntrust_form").validate({
            focusInvalid: false,
            errorClass: 'error', // 使用自定义样式
            validClass: '',// 使用自定义样式
            errorElement: "span",
            rules: {
                "target": {
                    required: true,
                    maxlength: 50
                },
                "entrustId": {
                    required: true,
                    maxlength: 50
                },
                "tempNum": {
                    required: true,
                    number: true
                },
                "partNum": {
                    required: true,
                    maxlength: 50
                },
                "partValue": {
                    required: true,
                    maxlength: 50
                },
                "projectName": {
                    required: true,
                    maxlength: 50
                },
                "entrustTime": {
                    required: true,
                    maxlength: 50
                },
                "demandTime": {
                    required: true,
                    maxlength: 50
                },
                "facilityEntrust": {
                    required: true,
                    maxlength: 50
                },
            },
            onkeyup: true
        });
        let addForm = jQuery("#bizEntrust_form");
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
        // jQuery('#TENANCY_EDIT_FORM').showLoading();
        jQuery.ajax({
            type: 'POST',
            url: saveBizEntrust,
            data: jQuery("#bizEntrust_form").serialize(),
            success: function (data) {
                // jQuery('#TENANCY_EDIT_FORM').hideLoading();
                bootbox.alert({
                    size: 'small',
                    message: data.msg,
                    callback: function (result) {
                        $('#bizEntrust_form')[0].reset();
                        // jQuery("#bizEntrust_form").;
                        // 重新加载列表
                        //_saveTenancyData();
                        //bootbox.hideAll(); // 隐藏所有的bootbox
                    }
                });
            }
        });
    };

    return {
        // 点击保存
        saveTenancyData: function () {
            _saveTenancyDataBefore();
        },
        init: function () {
            _bindClick()
        }
    }
}();

BizEntrust.init();

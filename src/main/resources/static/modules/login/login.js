var login = function () {

    let _logUrl = "/login/toLogin";

    /**
     * 提交登录表单
     */
    let _onSubmit = function () {
        let options = {
            url: _logUrl,
            type: "post",
            beforeSubmit: beforeFeedbackNewSubmit,
            dataType: 'json',
            error: function () {
                alert("error");
            },
            success: function (responseText) {
                if (200 == responseText.code) {
                    location.href = "/back";
                } else {
                    alert(responseText.msg);
                    $("#msg").html(responseText.msg);
                }
            }
        };
        $("#loginFrom").ajaxSubmit(options);
    }

    function beforeFeedbackNewSubmit() {
        return true;
    }

    return {
        onSubmit: function () {
            _onSubmit();
        },
    }
}();



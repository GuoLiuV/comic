var login = function () {

    let _logUrl = "/login/toLogin";

    /*提交登录表单*/
    function onSubmit() {
        var options = {
            url: _logUrl,
            type: "post",
            beforeSubmit: beforeFeedbackNewSubmit,
            dataType: 'json',
            error: function () {
                alert("error");
            },
            success: function (responseText){
                if(200 == responseText.code){
                    location.href = "/back";
                }else{
                    $("#msg").html(responseText.msg);
                }
            }
        };
        $("#loginFrom").ajaxSubmit(options);
    };

    function beforeFeedbackNewSubmit() {
        return true;
    }

    return {
        _onSubmit: function () {
            onSubmit();
        }
    }
}();



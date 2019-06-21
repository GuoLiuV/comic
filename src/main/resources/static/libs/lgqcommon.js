var lgq = function () {

    /**
     * 添加单选
     */
    function allSelectRadio(obj,id,name,index){
        var tr = $(obj).closest("tr");
        $("#"+id, window.opener.document).val($(obj).val());
        $("#"+name, window.opener.document).val(tr.find("td").eq(index).text());
        window.close();
    };

    /**
     * 发送ajax请求
     * @param obj
     */
    function submitRequestAjax(message,url,data){
        $.prompt(message, {
            buttons : {
                '确定':true,
                '取消':false
            },
            focus : 1,
            callback : function(v, m) {
                if (v) {
                    showLoading();
                    $.ajax({
                        url : $("#path").val()+url,
                        data : data,
                        type : 'POST',
                        dataType : 'JSON',
                        timeout : 3000,
                        error : function() {
                        },
                        success : function(responseText) {
                            hideLoading();
                            if(responseText.result=="success") {
                                messageAlert(responseText.message,responseText.buttonId);
                            } else if(responseText.result=="fail") {
                                messageAlert(responseText.message,responseText.buttonId);
                            } else if(responseText.result=="null") {
                                messageAlert(responseText.message,responseText.buttonId);
                            } else if(responseText.result=="successYes"){//可多次请求
                                $.prompt(responseText.message, {
                                    buttons : {
                                        '确定':true,
                                        '取消':false
                                    },
                                    callback : function(v, m) {
                                        if (v) {
                                            var dataObj=eval("("+responseText.data+")");//转换为json对象
                                            if (dataObj!=undefined || dataObj !=null || dataObj != "") {
                                                submitRequestAjax(responseText.message,responseText.url,dataObj);
                                            } else {
                                                submitRequestAjax(responseText.message,responseText.url,"");
                                            }
                                        }
                                    }
                                });
                            } else if(responseText.result=="successTab"){
                                $.prompt(responseText.message, {
                                    callback : function(v, m) {
                                        if (parent.hasTab(responseText.refreshTab))//根据标签页的名称刷新父标签页
                                            parent.refreshTab(responseText.refreshTab, $("#path").val()+responseText.url);
                                        if (parent.hasTab(responseText.deleteTab))//根据标签页的名称删除指定标签页
                                            parent.deleteTab(responseText.deleteTab);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    };

    /**
     * 提示窗口
     * @param message 标题
     * @param rootId Id
     * @param bool 为true可刷新父窗口并关闭子窗口，
     * 				否则说明它没有子窗口
     */
    function messageAlert(message,id,bool){
        $.prompt(message, {
            callback : function(v, m) {
                if (v) {
                    if (window.opener != undefined && window.opener != null) {
                        window.opener.document.getElementById(id).click();
                        window.close();
                    }else{
                        $("#"+id).click();
                    }
                }
            }
        });
    };


    /**
     * hello 测试下
     * @param id
     */
    var hello = function (id) {
        alert(id+"lgq");
    };

    return {
        alertB: function (a) {
            hello(a);
        },
        _allSelectRadio : function(obj,id,name,index){
            allSelectRadio(obj,id,name,index);
        }
    };

}();
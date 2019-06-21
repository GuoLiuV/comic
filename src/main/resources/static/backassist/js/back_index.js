//iframe自适应
$(window).on('resize', function () {
    var $content = $('.content');
    $content.height($(this).height() - 120);
    $content.find('iframe').each(function () {
        $(this).height($content.height());
    });
}).resize();


var vm = new Vue({
    el: '#rrapp',
    data: {
        main: "/sys/page/main",
        navTitle: "欢迎页"
    },
    methods: {
        donate: function () {
            layer.open({
                type: 2,
                title: false,
                area: ['806px', '467px'],
                closeBtn: 1,
                shadeClose: false,
                content: ['http://cdn.renren.io/donate.jpg', 'no']
            });
        }
    }
});

//路由
var router = new Router();
var menus = ["/sys/page/main", "/sys/page/generator"];
routerList(router, menus);
router.start();

function routerList(router, menus) {
    for (var index in menus) {
        router.add('#' + menus[index], function () {
            var url = window.location.hash;
            //替换iframe的url
            vm.main = url.replace('#', '');
            //导航菜单展开
            $(".treeview-menu li").removeClass("active");
            $("a[href='" + url + "']").parents("li").addClass("active");
            vm.navTitle = $("a[href='" + url + "']").text();
        });
    }
}

function showUpdate() {
    bootbox.confirm({
        size: 'small',
        message: "确定升级？",
        buttons: {},
        callback: function (result) {
            if (result) {
                bootbox.alert("升级成功");
            }
        }
    })
}

function logout() {
    bootbox.confirm({
        size: 'small',
        message: "确定退出？",
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
                location.href = "/login/logout";
            }
        }
    })
}

// 修改密码
let updatePassWord = "/userManager/updateMyPassWord.do"
let saveMyPassWord = "/userManager/saveMyPassWord.json"

function updateMyPassWord() {
    jQuery.ajax({
        type: 'GET',
        url: updatePassWord,
        success: function (data) {
            bootbox.dialog({
                title: "修改密码",
                message: data,
            });
        }
    });
}

function savePassWordData() {
    // 保存一
    let _saveTenancyDataBefore = function () {
        // Form 验证字段内容
        jQuery("#userPassWordForm").validate({
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

        let addForm = jQuery("#userPassWordForm");
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
        jQuery('#userPassWordForm').showLoading();
        jQuery.ajax({
            type: 'POST',
            url: saveMyPassWord,
            data: jQuery("#userPassWordForm").serialize(),
            success: function (data) {
                jQuery('#userPassWordForm').hideLoading();
                bootbox.alert({
                    size: 'small',
                    message: data.msg,
                    callback: function (result) {
                        bootbox.hideAll(); // 隐藏所有的bootbox
                    }
                });
            }
        });
    };

    _saveTenancyDataBefore()();
}
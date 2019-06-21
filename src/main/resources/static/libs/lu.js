String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

var GlobalCommon = function () {
    /**
     * 获取服务器根目录的全路径
     *
     * @param url
     * @returns
     */
    var getRootUrl = function (url) {
        var globalRoot = jQuery("#global_rooturl").val();
        if (globalRoot == undefined || globalRoot == null || globalRoot == '') {
            // 从iframe父页面index.jsp获取
            globalRoot = jQuery("#global_rooturl", parent.document).val();
        }
        url = globalRoot + url;
        return url;
    };

    /**
     * 获取当前语言环境(默认 zh_CN)
     * @returns {*}
     */
    var getLangType = function () {
        var langType = jQuery("#global_langType").val();
        if (langType == null || langType == '') {
            langType = jQuery('#global_langType', parent.document).val();
            if (langType == null || langType == '') {
                langType = 'zh_CN';
            }
        }
        return langType;
    };

    /**
     * i18n 插件初始化
     */
    var i18nInit = function () {
        var langType = getLangType();
        i18n.init({
            lng: langType,
            ns: "common",
            fallbackLng: langType,
            resGetPath: getRootUrl('static/i18n/__ns__-__lng__.json'),
            tName: 't',
            getAsync: false,// 设置同步
            i18nName: 'i18n'
        });
    };

    /**
     * Bootstrap Tabel 插件初始化
     */
    var bootstrapTableInit = function () {
        // Bootstrap Tabel全局参数初始化
        jQuery.extend(jQuery.fn.bootstrapTable.defaults, {
            method: "post",
            contentType: "application/x-www-form-urlencoded",
            sidePagination: "server",
            queryParamsType: "limit",
            showExport: false,
            exportDataType: 'all',
            exportTypes: ['json', 'csv', 'txt', 'excel'],
            pagination: true,
            silent: true,
            showColumns: false,
            showRefresh: true,
            showToggle: false,
            pageNumber: 1,
            pageSize: 10,
            pageList: [10,20,40,60],
            striped: true,// 间隔底色
            responseHandler: function (res) {
                if (typeof (res.rows) == "undefined") {
                    res.total = res.recordsFiltered; // 总数据条数
                    res.rows = res.data; // 数据
                }
                return res;
            }
        });
    };

    /**
     * jquery-validate 默认的全局设置
     */
    var jqueryValidateInit = function () {
        /*jQuery.extend($.fn.validate.defaults, {
            errorClass: 'dd-validate-error', // 使用自定义样式
            errorElement: "span",
            focusCleanup: false,
            focusInvalid: true,
            errorPlacement: function (error, e) {
                var ep = e.parent();
                if (ep.hasClass("input-group")) {
                    e.parent().after(error);
                } else {
                    e.parent().append(error);
                }
            }
        });
        jQuery.validator.addMethod("url2", function (value, element) {
            return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        }, $.validator.messages.url);*/
    };

    /**
     * 处理DataTable传回参数JSON
     *
     * @param d
     * @returns JSON
     */
    var dealDataTableAjaxData = function (d) {
        var dd = jQuery.parseJSON(JSON.stringify(d)); // 重新转换一次JSON
        var colums = dd.columns;
        // 删除不必要的参数
        delete dd.columns;
        delete dd.search;
        // 处理排序参数
        var orderArrary = dd.order;
        // 处理排序中的colum参数，原本是下标数字，转换为colums对应的名称
        jQuery.each(orderArrary, function (n, value) {
            if (colums != null && colums[n] != null) {
                orderArrary[n].column = colums[n].data;
            } else {
                orderArrary[n].column = '';
            }
        });
        dd.order = JSON.stringify(orderArrary); // 转换为字符串形式传递
        return dd;
    };

    /**
     * 添加统一时间戳方法
     * @param url
     * @returns {*}
     */
    var urlToken = function (url) {
        if (!url) {
            return "";
        }
        try {
            var v = new Date().getTime();
            if (url.indexOf("?") > -1) {
                url += "&_v=" + v;
            } else {
                url += "?_v=" + v;
            }
        } catch (e) {

        }
        return url;
    };

    /**
     * 自定义ajax方法，添加统一时间戳
     */
    var ajaxTimeToken = function () {
        var myAjax = jQuery.ajax;
        jQuery.ajax = function (options) {
            options = options || {};
            var url = options.url || "";
            url = urlToken(url);
            options.url = url;
            myAjax(options);
        }
    };

    /**
     * boot box 初始化
     */
    var bootboxInit = function () {
        bootbox.setDefaults({
            size: "small",
            onEscape: true
        });
    };

    var simplePagetInit = function (navId, pageInfo) {
        if (pageInfo != null && navId != null) {
            var _hasNextPage = pageInfo.hasNextPage;
            var _hasPreviousPage = pageInfo.hasPreviousPage;
            jQuery("#" + navId + " .next").hide();
            jQuery("#" + navId + " .previous").hide();
            if (_hasNextPage) {
                jQuery("#" + navId + " .next").show();
            }
            if (_hasPreviousPage) {
                jQuery("#" + navId + " .previous").show();
            }
        }
    };
    /**
     * 文件上传插件初始化
     */
    var fileinputInit = function () {
        var _langType = getLangType();
        var fileExt = ["gif", "jpg", "jpeg", "bmp", "png", "ppt", "pptx", "doc", "docx", "xls", "xlsx", "pdf", "msg", "txt", "zip", "rar"];
        jQuery.extend(jQuery.fn.fileinput.defaults, {
            language: _langType,
            uploadUrl: 's/doc/file/doUploadFile.json',
            allowedFileExtensions: fileExt,
            allowedPreviewTypes: false,
            validateInitialCount: true,
            uploadAsync: true,
            showUploadedThumbs: false,
            fileActionSettings: {
                showRemove: false,
                showZoom: false
            },
            maxFileSize: 102400,
            maxFileCount: 10,
            browseClass: "btn dd-bg-blue dd-border-blue dd-color-white",
            previewFileIcon: "<i class='fa fa-file dd-color-blue'></i>",
            slugCallback: function (filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        });
    };


    /**
     * 处理控制台(去除部分插件默认的打印内容)
     * @private
     */
    var _initConsole = function () {
        if (jQuery.migrateTrace) {
            jQuery.migrateTrace = false;
        }
        if (jQuery.migrateMute) {
            jQuery.migrateMute = false;
        }
        try {
            if (window.console && window.console.log) {
                console.clear();
                console.log("%c 安全警告", "font-size:30px;color:#e7505a;font-weight:bolder");
                console.log(":::!!======================此浏览器功能仅供开发者使用======================!!:::");
            }
        } catch (e) {
        }
    };

    /**
     * 初始化 Select2插件
     * @param dom
     * @private
     */
    var _initSelect2 = function (dom) {
        if (!dom) {
            dom = ".select2";
        }
        $.fn.select2.defaults.set("theme", "bootstrap");
        jQuery(dom).select2({
            language: jQuery("#global_langType").val()
        });
    };

    /**
     * 初始化 Bootstrap Select插件
     * @param dom
     * @private
     */
    var _initBootstrapSelect = function (dom) {
        if (!dom) {
            dom = ".bs-select";
        }
        jQuery(dom).selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check'
        });
        jQuery(dom).selectpicker('refresh');
    };

    /**
     * 初始化 InputMask插件
     * @private
     */
    /*var _initInputMask = function () {
        if (!Inputmask) {
            return false;
        }
        Inputmask.extendAliases({
            'money': {
                'alias': "currency",
                'prefix': "",
                'removeMaskOnSubmit': true,
                'clearMaskOnLostFocus': true,
                'autoUnmask': true,
                'rightAlign': true
            }
        });
        Inputmask.extendAliases({
            'cycle': {
                mask: "*{1,3}年*{1,3}月*{1,3}日",
                definitions: {
                    "*": {
                        validator: "[0-9]"
                    }
                },
                'prefix': "",
                'removeMaskOnSubmit': true,
                'clearMaskOnLostFocus': true,
                'autoUnmask': true,
                'rightAlign': true
            }
        });
        Inputmask.extendAliases({
            'ratio': {
                'alias': "percentage",
                'suffix': "",
                'removeMaskOnSubmit': true,
                'clearMaskOnLostFocus': true,
                'autoUnmask': true,
                'rightAlign': true
            },
            'shareRatio': {
                'alias': "percentage",
                'min': -100,
                'suffix': "",
                'removeMaskOnSubmit': true,
                'clearMaskOnLostFocus': true,
                'autoUnmask': true,
                'rightAlign': true,
                'allowMinus': true
            }
        });
    };*/

    /**
     * 内容过多展示省略号
     * @param options
     * @private
     */
    var _contentShowEllipsis = function (options) {
        var defaults = {
            parentClass: "dd-content-popover",
            maxLength: 10,
            text: "...",
            html: true,
            placement: "auto",
            trigger: "click",
            container: "body"
        };
        var option = $.extend({}, defaults, options);
        jQuery("." + option.parentClass).each(function () {
            if (jQuery(this).find(".dd-popover").length > 0) {
                return true;
            }
            var _text = _text2html(jQuery.trim(jQuery(this).text()));
            // 获取文本长度
            var _length = _text.length;
            if (_length > option.maxLength) {
                var _html = "<div class='dd-popover-scroller scroller' style='height: 150px;overflow-y: auto;word-wrap: break-word;'>";
                _html += _text;
                _html += "</div>";
                var _h = "<div class='dd-popover-scroller' style='word-wrap: break-word;'>";
                _h += _text;
                _h += "</div>";
                _html = (_length < 150) ? _h : _html
                var _ellipsisHtml = ' <object><a tabindex="0" class="dd-popover" role="button" data-html="'
                    + option.html + '" data-trigger="'
                    + option.trigger + '" data-toggle="popover" data-content="'
                    + _html + '" data-container="'
                    + option.container + '" data-placement="'
                    + option.placement + '">' + option.text + '</a></object>';
                jQuery(this).html(_text.substr(0, option.maxLength) + _ellipsisHtml);
            }
        });
        jQuery(".dd-popover").unbind("click");
        jQuery(".dd-popover").click(function (event) {
            event.stopPropagation();
            jQuery("[data-toggle='popover']").popover("hide");
            jQuery(this).popover("show");
        });
        jQuery("body").click(function (event) {
            if (event.srcElement && event.srcElement.className.indexOf("dd-popover-scroller") == -1) {
                jQuery("[data-toggle='popover']", window.document).popover("hide");
            }
        });
    };

    /**
     * 初始化开关
     * @private
     */
    var _initSwitch = function (options) {
        var option = {
            el: '.dd-switch',
            onText: i18n.t("GENERAL.YES"),
            offText: i18n.t("GENERAL.NO"),
            on: 1,
            off: 0
        };
        option = jQuery.extend({}, option, options);
        jQuery(option.el).bootstrapSwitch({
            onText: option.onText,
            offText: option.offText,
            onColor: "success dd-bg-blue dd-color-white",
            offColor: "info dd-bg-gray dd-color-black",
            onInit: function () {
                var _state = jQuery(this).val();
                if (!_state) {
                    jQuery(this).val(option.off);
                }
                jQuery(this).prop("checked", true);
            },
            onSwitchChange: function (event, state) {
                if (state) {
                    jQuery(this).val(option.on);
                } else {
                    jQuery(this).val(option.off);
                }
                jQuery(this).prop("checked", true);
            }
        });
    };

    /**
     * 处理换行字符
     * @param text
     * @private
     */
    var _text2html = function (text) {
        if (text == undefined || text == null || text.length == 0) {
            return "";
        }
        var reg = new RegExp("\r\n", "g");
        return text.replace(reg, "<br>");
    };

    /**
     * 获得时间差
     * @param date
     * @private
     */
    var _getTimeDifference = function (date) {
        var d = new Date(date);
        var _date = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + "-" + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds());
        var startTime = _date;
        startTime = startTime.replace(/\-/g, "/");
        var sDate = new Date(startTime);
        var _sDate = new Date(startTime);
        var _currentDate = new Date(); //当前时间
        var totalTime = _currentDate.getTime() - sDate.getTime();
        var years = 0;
        while (_sDate.setFullYear(_sDate.getFullYear() + 1) <= _currentDate) {
            years++;
        }
        var months = parseInt((_currentDate.getFullYear() * 12 + _currentDate.getMonth()) - (sDate.getFullYear() * 12 + sDate.getMonth()));
        var days = parseInt(totalTime / parseInt(1000 * 60 * 60 * 24));
        totalTime = totalTime % parseInt(1000 * 60 * 60 * 24);
        var hours = parseInt(totalTime / parseInt(1000 * 60 * 60));
        totalTime = totalTime % parseInt(1000 * 60 * 60);
        var minutes = parseInt(totalTime / parseInt(1000 * 60));
        totalTime = totalTime % parseInt(1000 * 60);
        var seconds = parseInt(totalTime / parseInt(1000));
        var time = "";
        var currentMonthDay = new Date(_currentDate.getFullYear(), _currentDate.getMonth() + 1, 0).getDate();
        if (months > 12) {
            time = years + " " + i18n.t("GENERAL.YEAR");
        } else if (days > currentMonthDay) {
            time = months + " " + i18n.t("GENERAL.MONTH");
        } else if (days >= 1) {
            time = days + " " + i18n.t("GENERAL.DAY");
        } else if (hours >= 1) {
            time = hours + " " + i18n.t("GENERAL.HOURS");
        } else if (minutes >= 1) {
            time = minutes + " " + i18n.t("GENERAL.MINUTES")
        } else {
            time = i18n.t("GENERAL.SECONDS");
        }
        return time;
    };

    /**
     * 清空隐藏条件值
     * @param callback
     * @private
     */
    var _bindClearCondition = function (callback) {
        //清空查询条件
        jQuery(".dd-clear-condition").click(function () {
            var _form = jQuery(this).closest("form");
            jQuery(':input', _form).val('');
            jQuery(".selected", _form).removeClass("selected");
            if (callback) {
                callback();
            }
        });
    };

    /**
     * 条件设置
     * @param callback
     * @private
     */
    var _bindConditionSetting = function (callback) {
        var _dataHidden, _dataValue, _isMulti, _tempValue, _tempValueArray, _tempIndex;
        jQuery(".dd-condi-ul li").click(function () {
            //是否允许多选
            _isMulti = jQuery(this).parent().hasClass("multi");
            if (!_isMulti) {
                jQuery(this).parent().find(".selected").removeClass("selected");
            }
            _dataHidden = jQuery(this).parent().attr("dd-hidden-input");
            _dataValue = jQuery(this).attr("dd-data-value");
            if (_dataHidden && _dataValue) {
                _tempValue = jQuery("#" + _dataHidden).val();
                //第二次点
                if (jQuery(this).hasClass("selected")) {
                    if (_tempValue) {
                        //删除已有的字符
                        _tempValueArray = _tempValue.split(",");
                        _tempIndex = _tempValueArray.indexOf(_dataValue);
                        if (_tempIndex > -1) {
                            _tempValueArray.splice(_tempIndex, 1);
                        }
                        _tempValue = _tempValueArray.join(",");
                        jQuery("#" + _dataHidden).val(_tempValue);
                    }
                    jQuery(this).removeClass("selected");
                } else {
                    if (_isMulti) {
                        //多选，拼接
                        if (_tempValue) {
                            _tempValue = _tempValue + ",";
                        }
                        _tempValue = _tempValue + _dataValue;
                        jQuery("#" + _dataHidden).val(_tempValue);
                    } else {
                        jQuery("#" + _dataHidden).val(_dataValue);
                    }
                    jQuery(this).removeClass("selected").addClass("selected");
                }
            }
            if (callback) {
                callback();
            }
        });
    };

    /**
     * 合并
     * @param table
     * @param field
     * @param colspan
     */
    var mergeCells = function (table, fieldList, colspan) {
        for (var key in fieldList) {
            mergeCell(table, fieldList[key], colspan);
        }
    };

    /**
     * 合并
     * @param table
     * @param field
     */
    var mergeCell = function (table, field, colspan) {
        var $table = jQuery(table);
        var obj = getIndexAndRowspan($table, field);
        for (var item in obj) {
            $table.bootstrapTable('mergeCells', {
                index: obj[item].index,
                field: field,
                colspan: !colspan ? 1 : colspan,
                rowspan: obj[item].row,
            });
        }
    };

    /**
     *
     * @param $table
     * @param field
     * @returns {Array}
     */
    var getIndexAndRowspan = function (table, field) {
        var obj = [];
        var maxV = table.find("th").length;
        var columnIndex = 0;
        var filedVar;
        for (columnIndex = 0; columnIndex < maxV; columnIndex++) {
            filedVar = table.find("th").eq(columnIndex).attr("data-field");
            if (filedVar == field) break;
        }
        var $trs = table.find("tbody > tr");
        var $tr;
        var index = 0;
        var content = "";
        var row = 1;
        for (var i = 0; i < $trs.length; i++) {
            $tr = $trs.eq(i);
            var contentItem = $tr.find("td").eq(columnIndex).html();
            if (!contentItem) {
                continue;
            }
            //exist
            if (contentItem.length > 0 && content == contentItem) {
                row++;
            } else {
                //save
                if (row > 1) {
                    obj.push({"index": index, "row": row});
                }
                index = i;
                content = contentItem;
                row = 1;
            }
        }
        if (row > 1) {
            obj.push({"index": index, "row": row});
        }
        return obj;
    };

    var _simplePagetInit = function (navId, pageInfo) {
        if (pageInfo != null && navId != null) {
            var _hasNextPage = pageInfo.hasNextPage;
            var _hasPreviousPage = pageInfo.hasPreviousPage;
            jQuery("#" + navId + " .next").hide();
            jQuery("#" + navId + " .previous").hide();
            if (_hasNextPage) {
                jQuery("#" + navId + " .next").attr("dd-next-num", pageInfo.nextPage);
                jQuery("#" + navId + " .next").show();
            }
            if (_hasPreviousPage) {
                jQuery("#" + navId + " .previous").attr("dd-prev-num", pageInfo.prevPage);
                jQuery("#" + navId + " .previous").show();
            }
        }
    };

    var _getCardLabelId = function () {
        var $tabs = jQuery(".dd-nav-tabs").children(".active");
        var cardLabelId = $tabs.find("ul")[0] ? $tabs.find("ul").children(".active").find("a").attr("dd-href") : $tabs.find("a").attr("dd-href");
        //console.log(cardLabelId);
        return cardLabelId;
    };

    /*判断终端是手机还是电脑--用于判断文件是否导出(电脑需要导出)*/
    function phoneOrPc(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return false;
        } else {
            return true;
        }
    }


    return {
        // main function to initiate the module
        init: function () {
            //js 生成 global元素
            var _globalValue = jQuery("meta[name='global_langType']");
            if (_globalValue) {
                _globalValue = jQuery("meta[name='global_langType']").attr('content');
                var _global = "<input type='hidden' id='global_langType' value='" + _globalValue + "'/>";
                _globalValue = jQuery("meta[name='global_rooturl']").attr('content');
                _global += "<input type='hidden' id='global_rooturl' value='" + _globalValue + "'/>";
                var _first = jQuery("body").children(":first");
                jQuery(_global).insertBefore(_first);
            }

            jqueryValidateInit();
            // bootbox设置默认属性 esc按键关闭等
            bootboxInit();
            _initConsole();
        },
        clearConsole: function () {
            _initConsole();
        },
        bootstrapTableInit: function () {
            bootstrapTableInit();
        },
        jqueryValidateInit: function () {
            jqueryValidateInit();
        },
        simplePagetInit: function (navId, pageInfo) {
            simplePagetInit(navId, pageInfo);
        },
        initSelect2: function (dom) {
            _initSelect2(dom);
        },
        initBootstrapSelect: function (dom) {
            _initBootstrapSelect(dom);
        },
        contentShowEllipsis: function (options) {
            _contentShowEllipsis(options);
        },
        clearCondition: function (callback) {
            _bindClearCondition(callback);
        },
        conditionSetting: function (callback) {
            _bindConditionSetting(callback);
        },
        /*initInputMask: function () {
            _initInputMask();
        },*/
        initSwitch: function (options) {
            _initSwitch(options);
        },
        text2html: function (text) {
            return _text2html(text);
        },
        getTimeDifference: function (date) {
            return _getTimeDifference(date);
        },
        mergeCells: function (table, fieldList, colspan) {
            mergeCells(table, fieldList, colspan);
        },
        mergeCell: function (table, field, colspan) {
            mergeCell(table, field, colspan);
        },
        simplePagetInit: function (navId, pageInfo) {
            _simplePagetInit(navId, pageInfo);
        }
    };
}();

// 执行
GlobalCommon.init();
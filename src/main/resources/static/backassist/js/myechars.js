let Myechars = function () {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('areaChart'));
    var pieChart = echarts.init(document.getElementById('pieChart'));
    var lineChart = echarts.init(document.getElementById('lineChart'));
    // json路径
    let quicklyUrl = "/graphical/quickly.json";
    let engineerRateUrl = "/graphical/engineerRate.json";
    let revenueUrl = "/graphical/revenue.json";

    // 指定图表的配置项和数据
    let optionVal = function (keys) {
        return {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',"八月","九月","十月","十一月","十二月"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '数值',
                    type: 'bar',
                    barWidth: '60%',
                    data: keys
                }
            ]
        };
    };


    let _showCharts = function () {
        // 使用刚指定的配置项和数据显示图表。
        $.ajax({
            url: quicklyUrl,
            type: "post",
            success: function (data) {
                var keys = data;
                var option = optionVal(keys);
                myChart.setOption(option);
            }
        })

        $.ajax({
            url: engineerRateUrl,
            type: "post",
            success: function (data) {
                var keys = data;
                var option = optionVal(keys);
                lineChart.setOption(option);
            }
        })

        $.ajax({
            url: revenueUrl,
            type: "post",
            success: function (data) {
                var keys = data;
                var option = optionVal(keys);
                pieChart.setOption(option);
            }
        })
    };

    return {
        init: function () {
            _showCharts();
        }
    }

}();
Myechars.init();

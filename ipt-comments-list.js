$(function () {
    var arrTableHead = ['医院', '处方时间', '处方号', '科室', '年龄', '诊断', '注射剂', '点评药师', '是否合理', '结果', '问题代码', '操作'];
    $.queryParams = {}; // 存储检索数据
    /**
     * 设置表头
     */
    function setThead() {
        var theadList = [];
        theadList.push('<tr>');
        for (var i = 0; i < arrTableHead.length; i++) {
            theadList.push('<th>');
            theadList.push(arrTableHead[i]);
            theadList.push('</th>');
        }
        theadList.push('</tr>');
        $('#_thead').html(theadList.join(""));
    };

    /**
     * 设置表内容
     */
    var tbodyList = [];
    function setTbody() {
        var currentTime = new Date().getTime();
        for (var i = 0; i < tbodyList.length; i++) {
            var $tr = $("<tr><td>" + tbodyList[i]['id'] + "</td><td>" + tbodyList[i]['logType'] + "</td><td>" + tbodyList[i]['operTime'] + "</td><td>" + tbodyList[i]['userId'] + "</td><td>" + tbodyList[i]['sysName'] + "</td><td>" + tbodyList[i]['modelName'] + "</td><td>" + tbodyList[i]['operObject'] + "</td><td>" + tbodyList[i]['operName'] + "</td><td>" + tbodyList[i]['msg'] + "</td><td>" + tbodyList[i]['serverIp'] + "</td><td>" + tbodyList[i]['detailId'] + "</td><td><span class='operation' id='view'>查看</span></td></tr>");
            // 把创建出来的$tr 添加到tbody
            $('#_tbody').append($tr);
        }

        $('#tbodyDiv').on('scroll', function () {
            $("#theadDiv").scrollLeft($('#tbodyDiv').scrollLeft());
        });

        // $('tr').click(function ($event) {
        //     stopBubble($event);
        // })

        // $('td').click(function ($event) {
        //     stopBubble($event);
        // })

        // 使用事件委托 给 tr 元素绑定事件
        // $('tr').click(function (e) {
        //     if (e.target.id) {
        //         var currentElId = '#' + e.target.id;
        //         // _operation(currentElId, e);
        //     }
        //     e.target.onclick = function ($event) {
        //         stopBubble($event);
        //         console.log($event.target.innerText)

        //         if($event.target.innerText == '申述') {
        //             $(".box_container").show();
        //             $("#kabulore-layer").layer();
        //         }
        //     }
        // });

        $('#_tbody').on('click', 'tr span#view', function (e) {
            console.log('view:', e)
        })

        $('#_tbody').on('click', 'tr span#withoutDemur', function (e) {
            console.log('withoutDemur:', e)
        })

        $('#_tbody').on('click', 'tr span#appeal', function (e) {
            console.log('appeal:', e)
            $(".box_container").show();
            $("#kabulore-layer").layer();
        })

        // 关闭申述框
        $('.close-appeal').click(function () {
            closeAppealBox();
        });

        // 保存申述
        $('#save-appeal').click(function() {
            console.log($('#appeal-content').val());

            // 保存成功后关闭申述弹框
            closeAppealBox();
        });

    };

    function closeAppealBox() {
        $('.box_container').hide();
        $('#layerBox').remove();
    }


    /**
     * 获取table 数据
     */
    function getTableData() {
        $.ajax({
            url: "./FeHelper-20200107224753.json", success: function (result) {
                tbodyList = result;
                if (tbodyList && tbodyList.length > 0) {
                    setTbody();
                }
            }
        });
    };

    /**
     * 阻止冒泡排序
     * @param {*} e Event 事件对象
     */
    function stopBubble(e) {
        // 如果提供了事件对象，则这是一个非IE浏览器
        if (e && e.stopPropagation) {
            // 因此它支持W3C的stopPropagation()方法 
            e.stopPropagation();
        } else {
            // 否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
    }

    /**
     * 检索逻辑
     */

    $('#query').click(function () {
        $.queryParams.recipeId = $('#recipe_id').val();
        $.queryParams.reviewStatus = $('#review_status').val();
        console.log($.queryParams)
    });

    // 翻页相关逻辑
    /**
     * 调整每页展示数据数量
     */
    $('#pageSize').change(function () {
        console.log($('#pageSize').val());
    });

    /**
     * 返回首页
     */
    $('#firstPage').click(function () {
        console.log($('#firstPage').val());
    });

    /**
     * 上一页
     */
    $('#prevPage').click(function () {
        console.log($('#prevPage').val());
    });

    /**
     * 下一页
     */
    $('#nextPage').click(function () {
        console.log($('#nextPage').val());
    });

    /**
     * 跳转到尾页
     */
    $('#lastPage').click(function () {
        console.log($('#lastPage').val());
    });

    /**
     * 页码跳转
     */
    $('#skipBtn').click(function () {
        console.log($('#skipInput').val());
    });





    (function init() {
        login();
        setThead();
        getTableData();

    }());

    // TODO  获取数据需要登录接口， 写一个测试接口
    function login() {
        var params = {
            name: "fengxiaotao",
            password: md5('111111'),
            code: ""
        }
        // $.post("/api/v1/currentUser", params, function (json) {
        //     console.log('登录：', json);
        // })

        $.ajax({
            url: "/api/v1/currentUser",
            async: true,
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(params),
            success: function (data) {
                console.log('登录：', data);
            }
        });
    }




}(window.jQuery));


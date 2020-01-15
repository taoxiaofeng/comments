$(function () {

    var projectId = getQueryString('projectId');
    var docId = getQueryString('docId');
    var patientId = getQueryString('patientId');
    var recipeNo = getQueryString('recipeNo');
    var readStatus = getQueryString('readStatus');

    //获取url参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return '';
    }


    var arrTableHead = ['医院', '处方时间', '处方号', '科室', '年龄', '诊断', '注射剂', '点评药师', '是否合理', '结果', '问题代码', '操作'];
    var queryParams = {}; // 存储检索数据
    /**
     * 设置表头
     */
    function setThead() {
        var theadList = [];
        theadList.push('<tr>');
        for (var i = 0; i < arrTableHead.length; i++) {
            if(arrTableHead[i] == '结果') {
                theadList.push('<th width="20%">');
                theadList.push(arrTableHead[i]);
                theadList.push('</th>');
            } else {
                theadList.push('<th>');
                theadList.push(arrTableHead[i]);
                theadList.push('</th>');
            }
        }
        theadList.push('</tr>');
        $('#_thead').html(theadList.join(""));
    };
    setThead();

    /**
     * 设置表内容
     */
    function setTbody(tbodyList) {
        var list = '';
        for (var i = 0; i < tbodyList.length; i++) {
            // var $tr = $("<tr><td>" + tbodyList[i]['id'] + "</td><td>" + tbodyList[i]['logType'] + "</td><td>" + tbodyList[i]['operTime'] + "</td><td>" + tbodyList[i]['userId'] + "</td><td>" + tbodyList[i]['sysName'] + "</td><td>" + tbodyList[i]['modelName'] + "</td><td>" + tbodyList[i]['operObject'] + "</td><td>" + tbodyList[i]['operName'] + "</td><td>" + tbodyList[i]['msg'] + "</td><td>" + tbodyList[i]['serverIp'] + "</td><td>" + tbodyList[i]['detailId'] + "</td><td><span class='operation' id='view'>查看</span><br/><span class='operation' id='withoutDemur'>无异议</span><span class='operation' id='appeal'>申述</span></td></tr>");
            // // 把创建出来的$tr 添加到tbody中
            // $('#opt_tbody').append($tr);
            list += '<tr>';
            list += '<td>' + tbodyList[i].hospitalName + '</td>';
            list += '<td>' + tbodyList[i].recipeTime + '</td>';
            list += '<td>' + tbodyList[i].recipeNo + '</td>';
            list += '<td>' + tbodyList[i].deptName + '</td>';
            list += '<td>' + tbodyList[i].age + '</td>';
            list += '<td>' + tbodyList[i].diagnose + '</td>';
            list += '<td>' + tbodyList[i].inject + '</td>';
            list += '<td>' + tbodyList[i].reviewDocName + '</td>';
            list += '<td>';
            for (var j = 0; j < tbodyList[i].results.length; j++) {
                list += '<span style="color:#E1E1E1;">' + tbodyList[i].results[j] + '</span><br/>';
            }
            list += '</td>';
            list += '<td width="20%">';
            for (var m = 0; m < tbodyList[i].messages.length; m++) {
                var msgObj = tbodyList[i].messages[m];
                list += '<span style="color:#FC0D1B;">' + msgObj.analysisResultType + ':' + msgObj.drug + '\xa0\xa0\xa0' + msgObj.message + '\xa0\xa0\xa0' + msgObj.advice + '\xa0\xa0\xa0' + msgObj.severity + '</span><br/>';
            }
            list += '</td>';
            list += '<td>';
            for (let p = 0; p < tbodyList[i].problemCodes.length; p++) {
                list += '<span style="color:#000；">' + tbodyList[i].problemCodes[p] + '</span><br/>'
            }
            list += '</td>';
            list += '<td>';
            list += '<span id="view" style="color:#0B24FB;">查看</span><br/><span id="withoutDemur" style="color:#0B24FB;">无异议</span>' + '\xa0\xa0\xa0' + '<span id="appeal" style="color:#0B24FB;">申述</span>';

            list += '</td></tr>';
        }
        $('#opt_tbody').append(list);

        $('#tbodyDiv').on('scroll', function () {
            $("#theadDiv").scrollLeft($('#tbodyDiv').scrollLeft());
        });

        $('#opt_tbody').on('click', 'tr span#view', function (e) {
            console.log('view:', e)
        })

        $('#opt_tbody').on('click', 'tr span#withoutDemur', function (e) {
            console.log('withoutDemur:', e)
        })

        $('#opt_tbody').on('click', 'tr span#appeal', function (e) {
            console.log('appeal:', e)
            $(".box_container").show();
            $("#kabulore-layer").layer();
        })

        // 关闭申述框
        $('.close-appeal').click(function () {
            closeAppealBox();
        });

        // 保存申述
        $('#save-appeal').click(function () {
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
     * 获取处方点评列表数据
     */
    function getTableData() {
        $('#opt_tbody').empty();
        var url = '/review/module/cydp/getDoctorViewList.action?projectId=' + projectId + '&docId=' + docId + '&patientId=' + patientId + (queryParams.recipeNo ?  '&recipeNo=' + queryParams.recipeNo : '') + (queryParams.readStatus != '' ?  '&readStatus=' + queryParams.readStatus != '' : '');
        $.get(url, function (res) {
            if (res.statusCode == 200) {
                queryParams.recipeNo = '';
                queryParams.readStatus = '';
                setTbody(res.obj && res.obj.dataList || []);
            }
        });
    };
    getTableData();

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
        queryParams.recipeNo = $('#recipe_no').val();
        queryParams.readStatus = $('#read_status').val();
        getTableData();
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

}(window.jQuery));


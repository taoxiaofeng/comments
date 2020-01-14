$(function () {
    var arrTableHead = ['组号', '药品名称', '剂型', '单次剂量', '给药频率', '给药途径', '发药数量', '包装数量', '给药时机', '给药部位', '销售单价', '包装规格', '生产厂家'];
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
    function setTbody(tbodyList) {
        for (var i = 0; i < tbodyList.length; i++) {
            var $tr = $("<tr><td title=" + tbodyList[i]['groupNo'] + ">" + (tbodyList[i]['groupNo'] || '') + "</td><td title=" + (tbodyList[i]['drugName'] + '\xa0\xa0\xa0' + tbodyList[i]['drugNameMap']) + "><a>" + (tbodyList[i]['drugName'] || '') + "<a/><br/><span>" + (tbodyList[i]['drugNameMap'] || '') + "</span></td><td title=" + (tbodyList[i]['prep'] + '\xa0\xa0\xa0' + tbodyList[i]['prepMap']) + ">" + (tbodyList[i]['prep'] || '') + "<br><span>" + (tbodyList[i]['prepMap'] || '') + "</span></td><td title=" + tbodyList[i]['drugDose'] + ">" + (tbodyList[i]['drugDose'] || '') + "</td><td title=" + tbodyList[i]['drugUsingFreqMap'] + '\xa0\xa0\xa0' + tbodyList[i]['drugUsingFreq'] + ">" + (tbodyList[i]['drugUsingFreqMap'] || '') + "<br/><span>" + (tbodyList[i]['drugUsingFreq'] || '') + "</span></td><td title=" + tbodyList[i]['drugAdminRouteName'] + '\xa0\xa0\xa0' + tbodyList[i]['drugAdminRouteNameMap'] + ">" + (tbodyList[i]['drugAdminRouteName'] || '') + "<br/><span>" + (tbodyList[i]['drugAdminRouteNameMap'] || '') + "</span></td><td title=" + tbodyList[i]['price'] + ">" + (tbodyList[i]['price'] || '') + "</td><td title=" + tbodyList[i]['drugUsingOpporunity'] + ">" + (tbodyList[i]['drugUsingOpporunity'] || '') + "</td><td title=" + tbodyList[i]['despensingNumAndPackUnit'] + ">" + (tbodyList[i]['despensingNumAndPackUnit'] || '') + "</td><td title=" + tbodyList[i]['drugUsingArea'] + ">" + (tbodyList[i]['drugUsingArea'] || '') + "</td><td title=" + tbodyList[i]['producerName'] + '\xa0\xa0\xa0' + tbodyList[i]['producerNameMap'] + ">" + (tbodyList[i]['producerName'] || '') + "<br/><span>" + (tbodyList[i]['producerNameMap'] || '') + "</span></td><td title=" + tbodyList[i]['spec'] + ">" + (tbodyList[i]['spec'] || '') + "</td><td title=" + tbodyList[i]['countUnit'] + ">" + (tbodyList[i]['countUnit'] || '') + "</td></tr>");
            // 把创建出来的$tr 添加到tbody中
            $('#_tbody').append($tr);
        }

        $('#tbodyDiv').on('scroll', function () {
            $("#theadDiv").scrollLeft($('#tbodyDiv').scrollLeft());
        });

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
     * 获取table 数据
     */
    function getTableData() {
        $.ajax({
            url: "./detailIptdrugInfo.json", success: function (res) {
                if (res.obj && res.obj.dataList.length > 0) {
                    setTbody(res.obj.dataList);
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

    // 获取申述意见
    $('#saveOpportuinty').click(function () {
        console.log($('#opportuinty').val());
    });

    // 设置诊断记录
    function getIptDetails() {
        $.ajax({
            url: "./iptSearchHeadDetail_2.json", success: function (res) {
                if (res && res.obj) {
                    // 检验
                    if (res.obj.hasOwnProperty('exams') && res.obj.exams) {
                        setExams(res.obj.exams);
                    }
                    //  警示信息
                    if (res.obj.hasOwnProperty('messages') && res.obj.messages) {
                        setMsg(res.obj.messages);
                    }
                    // 患者信息
                    if (res.obj.hasOwnProperty('patientInfo') && res.obj.patientInfo) {
                        setPatientInfo(res.obj.patientInfo);
                    }
                    // 手术
                    if (res.obj.hasOwnProperty('operations') && res.obj.operations) {
                        setOperations(res.obj.operations);
                    }
                    // 诊断
                    if(res.obj.hasOwnProperty('dtoCydpIptDaignoses') && res.obj.dtoCydpIptDaignoses) {
                        setDtoCydpIptDaignoses(res.obj.dtoCydpIptDaignoses)
                    }
                }
            }
        });
    };

    function setDtoCydpIptDaignoses(dtoCydpIptDaignoses) {
        var list = "";
        for (let i = 0; i < dtoCydpIptDaignoses.length; i++) {
            list += '<tr>';
            list += '<td>' + (dtoCydpIptDaignoses[i].diagnosisName || '') + '</td>';
            list += '<td>' + (dtoCydpIptDaignoses[i].diagnosisTime || '') + '</td>';
            list += '<td>' + (dtoCydpIptDaignoses[i].docName || '') + '</td>';
            list += '<td>' + (dtoCydpIptDaignoses[i].diagnosisType || '') + '</td>';
            list += '<td>' + (dtoCydpIptDaignoses[i].diagnosisCategory || '') + '</td>';
            list += '<td>' + (dtoCydpIptDaignoses[i].diagnosisCode || '') + '</td>';
            list += '</tr>';

        }
        $('#diagnosisRecordTbody').append(list);
    }

    // 设置手术
    function setOperations(operations) {
        var list = "";
        for (let i = 0; i < operations.length; i++) {
            list += '<tr>';
            list += '<td>' + (operations[i].operationOrderTime || '') + '</td>';
            list += '<td>' + (operations[i].operationCode || '') + '</td>';
            list += '<td>' + (operations[i].operationName || '') + '</td>';
            list += '<td>' + (operations[i].operationCutType || '') + '</td>';
            list += '<td>' + (operations[i].incisionHealingCode || '') + '</td>';
            list += '<td>' + (operations[i].hasImplant || '') + '</td>';
            list += '<td>' + (operations[i].operationStartTime || '') + '</td>';
            list += '<td>' + (operations[i].operationEndTime || '') + '</td>';
            list += '</tr>';

        }
        $('#operationNoteTbody').append(list);
    }

    // 设置检验
    function setExams(exams) {
        var list = '';
        for (var i = 0; i < exams.length; i++) {
            list += '<div>';
            list += '<ul>';
            list += '<li>';
            list += '<span class="title">检验项目：</span>';
            list += '<span class="content">' + (exams[i].examItem || '') + '</span>';
            list += '</li>';
            list += '<li>';
            list += '<span class="title">报告日期：</span>';
            list += '<span class="content">' + (exams[i].reportTime || '') + '</span>';
            list += '</li>';
            list += '<li>';
            list += '<span class="title">采样日期：</span>';
            list += '<span class="content"' + (exams[i].sampleCollectTime || '') + '</span>';
            list += '</li>';
            list += '</ul>';
            list += '<table width="100%">';
            list += '<thead>';
            list += '<tr>';
            list += '<th width="24.5%">指标名称</th>';
            list += '<th width="26%">检验结果</th>';
            list += '<th width="14.5%">单位</th>';
            list += '<th width="35%">参考结果</th>';
            list += '</tr>';
            list += '</thead>';
            list += '<tbody>';
            if (exams[i].examData && exams[i].examData.length > 0) {
                for (var j = 0; j < exams[i].examData.length; j++) {
                    list += '<tr>';
                    list += '<td>' + (exams[i].examData[j].indicatorName || '') + '</td>' +
                        '<td>' + (exams[i].examData[j].examResult || '') + '</td>' +
                        '<td>' + (exams[i].examData[j].examResultUnit || '') + '</td>' +
                        '<td>' + (exams[i].examData[j].referenceResult || '') + '</td>' +
                        '</tr>';
                }
            }
            list += '</tbody>';
            list += '</table>';
            list += '</div>';
        }
        $('#inspectionRecord').append(list);
    }

    //设置警示信息
    function setMsg(msg) {
        var list = '';
        for (var i = 0; i < msg.length; i++) {
            list += '<li>' +
                '<em class="' + gradeIdentification(msg[i].severity) + '"></em>' +
                '<span>[' + msg[i].severity + '级]' + msg[i].drug + ':' + msg[i].message + '</span>' +
                '</li>';
        }
        $('#msgList').append(list)
    }

    // 返回 警示等级标识
    function gradeIdentification(severity) {
        if (severity >= 5) {
            return 'warning-III';
        } else if (severity >= 3 && severity <= 4) {
            return 'warning-II';
        } else if (severity <= 2) {
            return 'warning-I';
        }
    }


    // 设置患者信息
    function setPatientInfo(patient) {
        var diagnose = '', allergy = '';
        // 拼装诊断数据
        if (patient.hasOwnProperty('diagnoses') && patient.diagnoses) {
            diagnose = assemblyData(patient.diagnoses, 'originalDiagnose');
        }

        var patientInfoDom = '<div>' +
            '<span>' + patient.patientName + (patient.age ? ' / ' + patient.age : ' / -岁 ') + (patient.sex ? ' / ' + patient.sex : '-') + (patient.height ? ' / ' + patient.height : ' / -cm ') + (patient.weight ? ' / ' + patient.weight : ' / -kg ') + '</span>' +
            '</div >' +
            '<div>' +
            '<span class="title">过敏：</span>' +
            '<span class="content" title="' + patient.allergyList + '">' + (patient.allergyList || "") + '</span>' +
            '</div>' +
            '<ul>' +
            '<li>' +
            '<span class="title">患者号：</span>' +
            '<span class="content" title="' + patient.patientId + '">' + (patient.patientId || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">就诊流水号：</span>' +
            '<span class="content" title="' + patient.eventNo + '">' + (patient.eventNo || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">就诊医院：</span>' +
            '<span class="content" title="' + patient.hospitalName + '">' + (patient.hospitalName || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">病案号：</span>' +
            '<span class="content" title="' + patient.caseNo + '">' + (patient.caseNo || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">医疗组：</span>' +
            '<span class="content" title="' + patient.docGroup + '">' + (patient.docGroup || "") + '</span>' +
            '</li>' +
            '</ul>' +
            '<ul>' +
            '<li>' +
            '<span class="title">是否怀孕：</span>' +
            '<span class="content" title="' + patient.isPregnant + '">' + (patient.isPregnant || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">孕期：</span>' +
            '<span class="content" title="' + patient.timeOfPreg + '">' + (patient.timeOfPreg || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">是否哺乳：</span>' +
            '<span class="content" title="' + patient.isBreastFeeding + '">' + (patient.isBreastFeeding || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">出生日期：</span>' +
            '<span class="content" title="' + patient.birthDay + '">' + (patient.birthDay || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">出生时体重：</span>' +
            '<span class="content" title="' + patient.birthWeight + '">' + (patient.birthWeight || "") + '</span>' +
            '</li>' +
            '</ul>' +
            '<ul>' +
            '<li>' +
            '<span class="title">体表面积：</span>' +
            '<span class="content" title="' + patient.bsa + '">' + (patient.bsa || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">入院时间：</span>' +
            '<span class="content" title="' + patient.inDeptTime + '">' + (patient.inDeptTime || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">入院科室：</span>' +
            '<span class="content" title="' + patient.inDeptName + '">' + (patient.inDeptName || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">入院病区：</span>' +
            '<span class="content"  title="' + patient.inWardName + '">' + (patient.inWardName || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">出院时间：</span>' +
            '<span class="content" title="' + patient.dischargeDate + '">' + (patient.dischargeDate || "") + '</span>' +
            '</li>' +
            '</ul>' +
            '<ul>' +
            '<li>' +
            '<span class="title">出院科室：</span>' +
            '<span class="content" title="' + patient.outDeptName + '">' + (patient.outDeptName || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">出院病区：</span>' +
            '<span class="content" title="' + patient.outWardName + '">' + (patient.outWardName || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">住院天数：</span>' +
            '<span class="content" title="' + patient.inHospitalDays + '">' + (patient.inHospitalDays || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">费用类别：</span>' +
            '<span class="content" title="' + patient.feeType + '">' + (patient.feeType || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">患者电话：</span>' +
            '<span class="content" title="' + patient.phoneNo + '">' + (patient.phoneNo || "") + '</span>' +
            '</li>' +
            '</ul>' +
            '<ul>' +
            '<li>' +
            '<span class="title">是否透析：</span>' +
            '<span class="content" title="' + patient.isDialysis + '">' + (patient.isDialysis || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">CCR：</span>' +
            '<span class="content" title="' + patient.ccr + '">' + (patient.ccr || "") + '</span>' +
            '</li>' +
            '<li>' +
            '<span class="title">床位号：</span>' +
            '<span class="content" title="' + patient.bedNo + '">' + (patient.bedNo || "") + '</span>' +
            '</li></ul>'
        $('#patientInfo').append(patientInfoDom);
    }

    //  拼装诊断 / 过敏 数据
    function assemblyData(arr, key) {
        var tempList = [];
        for (var i = 0; i < arr.length; i++) {
            tempList.push(arr[i][key]);
        }
        return tempList.join(',');
    }


    (function init() {
        login();
        setThead();
        getTableData();
        setTab();
        getIptDetails();
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

    // 选项卡逻辑
    function setTab() {
        var aLi = $('.tab-menu').find('li');
        var aDiv = $('.tab-content');
        for (var i = 0; i < aLi.length; i++) {
            $(aLi[i])[0].index = i;
            $(aLi[i]).click(function () {
                for (var j = 0; j < aLi.length; j++) {
                    $(aLi[j]).removeClass('active');//JavaScript使用obj.className = "";
                    $(aDiv[j]).removeClass('show');//JavaScript使用obj.className = "";
                }
                $(this).addClass('active');//JavaScript使用obj.className = "active";
                $(aDiv[$(this)[0].index]).addClass('show');//JavaScript使用obj.className = "show";

            });
        }
    }

}(window.jQuery));


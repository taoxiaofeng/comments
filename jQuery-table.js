(function ($) {

    /**
     *  给$的原型添加方法
     *  @param arrTableHead 生成表格表头的数组
     * @param arrTableBody 生成表格主体部分的数组 
     */
    $.fn.table = function (arrTableHead, arrTableBody) {
        // console.log(this); // 这里的this 是一个 Jquery 对象，是调用这个table方法的 jquery 对象
        var list = [];
        list.push('<table>');
        // 生成表头
        list.push('<thead>');
        list.push('<tr>');
        for (var i = 0; i < arrTableHead.length; i++) {
            list.push('<th>');
            list.push(arrTableHead[i]);
            list.push('</th>');
            // console.log(list.join(""))
        }
        list.push('</tr>');
        list.push('</thead>');

        // 生成表格主体部分
        for (var j = 0; j < arrTableBody.length; j++) {
            list.push('<tr>');
            // 遍历arrTableBody 这个数组的一个个元素
            for (var key in arrTableBody[j]) {
                if ( arrTableBody[j].hasOwnProperty(key)) {
                    list.push('<td>');
                    list.push(arrTableBody[j][key]);
                    list.push('</td>');
                }
            }
            list.push('</tr>');
        }

        list.push('</table>');
        // 设置 HTML
        this.html(list.join(""));
    }
}(window.jQuery))
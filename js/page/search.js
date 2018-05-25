define([
    'jquery',
    'template',
    "bscroll",
    "text!../../template/search.html"
], function($, tem, bscroll, search) {
    var searchArr = JSON.parse(window.localStorage.getItem('bookname')) || [];
    //搜索标签
    var listTags = $('#listTags').html();
    $.getJSON('/book/searchKey', function(data) {
            var b = newArr = data.ads.concat(searchArr)
            console.log(newArr);
            data.ads = newArr;
            //默认
            tem(listTags, data, '.search-tag');
        })
        //点击搜索 
    $('.search-input_btn').on('click', function() {
        //搜索框输入的值
        var val = $.trim($(this).prev().val());
        if (val.length == "0") {
            alert("未输入数据")
            return false;
        }
        //搜索后的数据
        $.getJSON('/book/search', { title: val }, function(data) {
            var dataArr = [];
            data.items.filter(function(v, i) {
                if (v.title.indexOf(val) !== -1) {
                    dataArr.push(v);
                }
            });
            //判断是否返回数据
            if (dataArr.length) {
                $('#Tag_3').html('');
                // for (key in searchArr) {
                //     if (searchArr[key][ad_name] == val) {
                //         console.log(searchArr[key])
                //     }ffdvcvrfhhgjkw
                // }
                for (key in searchArr) {
                    if (searchArr[key]["ad_name"] == val) {
                        console.log(searchArr[key])
                        searchArr.splice(key, 1)
                    }
                }
                console.log(searchArr)
                searchArr.push({ ad_name: val });
                window.localStorage.setItem("bookname", JSON.stringify(searchArr));
                tem(search, { items: dataArr }, '#Tag_3');
            } else {
                $('#Tag_3').html('');
                tem(search, { items: dataArr }, '#Tag_3');
            }
        })
    })
});
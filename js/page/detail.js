define([
    'jquery',
    'template',
], function($, templat) {
    var sourceId = window.location.search.split('?')[1].split('=')[1];
    //搜索结果后
    $.getJSON('/book/detail', { source_id: sourceId }, function(data) {
        data.items.filter(function(v, i) {
            if (v.source_id === sourceId) {
                templat($("#detail").html(), v, ".wrap2");
            }
        })
    });
    //日常渲染数据
    $.getJSON('/book/data', { indexId: sourceId }, function(data) {
        // console.log(data);
        templat($("#wrap").html(), data.item, ".wrapper");
        //增加点击事件
        $(".book-dash-text").click(function() {
            //跳转页面
            location.href = "../../page/page.html"
        })
    })
})
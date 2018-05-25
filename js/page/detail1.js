define(["jquery", "base64"], function($, base64) {
    var initnum = 1;
    $.getJSON({
        url: "/book/reader",
        data: {
            step: 1
        },
        success: function(data) {
            console.log(data);
            getData(data.jsonp)
        }
    });

    function getData(url) {
        var scr = document.createElement('script');
        scr.src = url;
        window["duokan_fiction_chapter"] = function(data) {
            console.log($.base64().decode(data));
        }
        document.head.appendChild(scr);
    }
});

define([
    "jquery", "base64", 'hand', 'template'
], function($, base64, hand, tem) {
    var chapternum = null;
    //目录数据
    $.getJSON({
        url: "/book/chapterList",
        success: function(data) {
            tem($('#chapter-content').html(), data.item, '.chapter-list', 'html')

            //获取总张数
            chapternum = data.item.toc;
        }
    });
    //点击目录
    $('.reader__ft-toc').on('click', function() {
        $('.chapter-dialog').addClass('show');
    })

    //目录页返回
    $('.top_back').on('click', function() {
        $('.chapter-dialog').removeClass('show');
    })
    var pagenum = window.localStorage.getItem('pagenum') || 1;
    $('.chapter-list').on('click', 'li', function() {
        pagenum = $(this).data('id');
        $('.chapter-dialog').removeClass('show');
        getAticle();
    })
    getAticle();
    //第一章数据
    function getAticle() {
        $.getJSON({
            url: "/book/reader",
            data: {
                step: pagenum
            },
            success: function(data) {
                getData(data.jsonp)
            }
        })
    }
    //获取滚动条当前的位置 
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    //base64转数据
    function getData(url) {
        var scr = document.createElement('script');
        scr.src = url;
        window["duokan_fiction_chapter"] = function(data) {
            var text = JSON.parse($.base64().decode(data));
            tem($('#p-content').html(), text, $('.reader__content'), 'html');
            var sumNum = chapternum.length;
            $('#Tag__81').html(pagenum + "/" + sumNum);
            window.localStorage.setItem('pagenum', pagenum);
            document.head.removeChild(scr);
        }
        document.head.appendChild(scr);
    }

    //控制遮罩层显示隐藏
    $('.wrap').on('click', function() {
        if ($('.reader').hasClass('reader_op')) {
            $('.reader__font').css('display', 'none');
            $('.reader').removeClass('reader_op');
        } else {
            $('.reader').addClass('reader_op');
        }
    })

    //上一章
    $('.reader__prev-chapter').on('click', function() {
        pagenum--;
        if (pagenum <= 0) {
            return false;
        }
        getAticle();
    })

    //下一章
    $('.reader__next-chapter').on('click', function() {
        pagenum++;
        if (pagenum > chapternum.length) {
            return false;
        }
        getAticle();
    })

    //A字体框
    $('.reader__ft-font').on('click', function() {
        if ($('.reader__font').css('display') === "none") {
            $('.reader__font').css('display', 'block');
        } else {
            $('.reader__font').css('display', 'none');
        }
        event.stopPropagation();
    })

    //初始字体
    var fontSize = window.localStorage.getItem('fontS') || 16;
    $('.reader__bd').css('font-size', fontSize + 'px');


    //字体变大
    $('.reader__font-large').on('click', function() {
        changeFonts(+2);

    });
    //字体变小
    $('.reader__font-small').on('click', function() {
        changeFonts(-2);
    });

    function changeFonts(size) {
        var fontS = parseInt($('.reader__bd').css('font-size'));
        $('.reader__bd').css('font-size', fontS + size + 'px');
        window.localStorage.setItem('fontS', fontS);
        event.stopPropagation();
    }
    //初始背景
    var initbg = window.localStorage.getItem('bg');
    //$('.reader__bd').css('background', initbg);

    //点击变换背景 reader__bd
    $('.reader__font-bg>a[data-bg]').on('click', function() {
        var bg = $(this).css('background');
        $('.reader__bd').css('background', bg);
        window.localStorage.setItem('bg', bg);
        event.stopPropagation();
    });

    //获取当前时间对象
    var myDate = new Date();
    var time = myDate.getHours();

    var initnight = window.localStorage.getItem('night') || 1;
    console.log(initnight);
    //$('.reader_op').attr('data-night', initnight);
    // if (time > 22) {
    //     $('.reader_op').attr('data-night', 0);
    // }
    console.log(time);
    //黑夜模式

    $('.reader__ft-night').on('click', function() {

        if ($('.reader_op').attr('data-night') == 0) {
            $('.reader_op').attr('data-night', 1);
        } else {
            $('.reader_op').attr('data-night', 0);
        }

        window.localStorage.setItem('night', $('.reader_op').attr('data-night'));
        event.stopPropagation();
    })
});
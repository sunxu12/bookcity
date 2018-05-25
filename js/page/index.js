define(['jquery',
    'template',
    "swiper",
    "bscroll",
    "lazy",
    "text!../../template/banner.html",
    "text!../../template/weekhot.html",
    "text!../../template/recommed.html",
    "text!../../template/girllove.html",
    "text!../../template/boylove.html",
    "text!../../template/limitfree.html",
    "text!../../template/special.html",
    "text!../../template/listbook.html",
    "text!../../template/shelf.html",
    "text!../../template/search.html"
], function($, tem, swiper, bscroll, lazy, banner, weekhot, recommed, girllove, boylove, limitfree, special, listbook, shelf, search) {
    //请求回来的大数据
    $.ajax({
        url: "/book/index",
        dataType: 'json',
        success: function(data) {
            //banner
            tem(banner, data.items[0].data, ".index-banner");
            //banner轮播
            new swiper('.index-banner', {
                loop: true,
                autoplay: {
                    delay: 2000
                }
            });
            //书城 书架切换
            var indexSwiper = new swiper('.wrap-content', {
                on: {
                    slideChangeTransitionStart: function() {
                        var index = this.activeIndex;
                        $('.tab_box>span').eq(index).addClass('active').siblings().removeClass('active');
                    }
                }
            })
            $('.tab_box>span').eq(0).addClass('active');
            $('.tab_box>span').on('click', function() {
                indexSwiper.slideTo($(this).index());
            });
            //本周最火 
            tem(weekhot, data.items[1], ".week-hot");
            //重磅推荐 
            tem(recommed, data.items[2], ".recommed");
            //女生最爱
            tem(girllove, data.items[3], ".girllove");
            //男生最爱
            tem(boylove, data.items[4], ".boylove");
            //限时免费
            tem(limitfree, data.items[5], ".limitfree");
            //精选专题
            tem(special, data.items[6], ".special");
            //图片懒加载
            $("img.lazy").lazyload({ effect: "fadeIn", failurelimit: 100, "placeholder": "http://img1.cache.netease.com/house/2015/9/29/2015092915152118128.gif" });
            //tab1---scroll
            var defaultTip = {
                up: "上拉加载更多",
                down: "下拉刷新"
            }; //初始状态
            var tip = {
                up: "释放加载更多",
                down: "释放刷新"
            };
            var page = 1;
            //书城滚动条
            var indexScroll = new bscroll('.index-wrap', {
                //监听间隔
                probeType: 2,
                //允许使用点击
                click: true,
                scrollbar: true
            });
            //上拉加载
            indexScroll.on('scroll', function() {
                //判断距离
                if (this.y < this.maxScrollY - 40) {
                    $('.index-content').attr('data-up', tip.up);
                } else if (this.y < this.maxScrollY - 20) {
                    $('.index-content').attr('data-up', defaultTip.up);
                } else if (this.y > 40) {
                    $('.index-content').attr('data-down', tip.down);
                } else if (this.y > 20) {
                    $('.index-content').attr('data-down', defaultTip.down);
                }
            });
            indexScroll.on('scrollEnd', function() {
                $('.index-content').attr('data-up', defaultTip.up);
                $('.index-content').attr('data-down', defaultTip.down);
            });
            //没有数据后的改变
            // if (page > 3) {
            //     $('.index-content').attr('data-up', "数据加载完成");
            //     return false;
            // }
            indexScroll.on('touchEnd', function() {
                if (page > 3) {
                    $('.index-content').attr('data-up', "数据加载完成");
                    return false;
                }
                page++;
                //加载后的数据
                $.getJSON('/book/list', { page: page }, function(data) {
                    tem(listbook, data, ".list-book");
                    //刷新滚动条
                    indexScroll.refresh();
                    //图片懒加载
                    $("img.lazy").lazyload({ effect: "fadeIn", failurelimit: 100, "placeholder": "http://img1.cache.netease.com/house/2015/9/29/2015092915152118128.gif" });
                })
            });
            //书架
            tem(shelf, data.items[3], ".list-content");
            //书架scroll
            new bscroll('.list-wrap', {
                //开启点击事件
                click: true
            })
        }
    });
    //点击切换样式
    var onOff = true;
    //点击名称
    $('.change-btn').on('click', function() {
        //判断类名
        if (onOff) {
            $(this).addClass('activebtn');
            if ($('.shelf-list').hasClass('change-html')) {
                $('.shelf-list').removeClass('change-html');
            } else {
                $('.shelf-list').addClass('change-html');
            }
            onOff = false;
        } else {
            $(this).removeClass('activebtn');

            if ($('.shelf-list').hasClass('change-html')) {
                $('.shelf-list').removeClass('change-html');
            } else {
                $('.shelf-list').addClass('change-html');
            }
            onOff = true;
        }
    })
});
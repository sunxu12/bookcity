define(['jquery', 'hand'], function($, hand) {
    var setHtml = function(text, data, parent) { //模板内容 数据 父级盒子
        var fun = hand.compile(text);
        hand.registerHelper("iflength", function(items, options) {

            return options.fn(items.splice(0, 5));
        });
        $(parent).append(fun(data));
    }

    return setHtml;
})
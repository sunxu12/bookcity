require.config({
    baseUrl: "js/",
    paths: {
        "jquery": "lib/jquery",
        "handlebars": "lib/handlebars",
        "swiper": "lib/swiper.min",
        "bscroll": "lib/bscroll.min",
        "index": "page/index",
        "text": "lib/text",
        "template": "common/template",
    }
});

document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px';
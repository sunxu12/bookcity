define([
    "jquery",
], function($) {
    var tip = "";
    $('#loginBtn').on('click', function() {
        var user = $('#user').val();
        var pwd = $('#pwd').val();
        if ($.trim(user) === "") {
            tip = "请输入账号";
        } else if ($.trim(pwd) === "") {
            tip = "请输入密码";
        };
        var data = {
            user: user,
            pwd: pwd
        };
        if (tip) {
            $('.tip').html(tip);
        } else {
            $.ajax({
                url: '/loginUser',
                data: data,
                type: 'post',
                success: function(d) {
                    if (d == 0) {
                        history.go(-1);
                        window.location.href = '/index.html';

                    } else if (d == 1) {
                        $('.tip').html("账号密码输入错误");
                    }

                }
            })
        }
    })
})
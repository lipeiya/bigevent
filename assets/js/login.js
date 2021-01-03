$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致!"
            }
        }
    })
    var layer = layui.layer;
    $('.reg-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: "/api/reguser",
            type: 'POST',
            data: {
                username: $('.reg-form [name=username]').val(),
                password: $('.reg-form [name=password]').val(),
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                $('#link_login').click()
            }
        })
    })
    $('.login-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
                layer.msg('登录成功')
            }
        })
    })


})
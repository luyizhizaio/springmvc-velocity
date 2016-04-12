$(document).ready(function () {

    if ($.browser.msie == true && $.browser.version.slice(0, 3) < 10) {

        $('input[placeholder]').each(function () {

            var input = $(this);

            $(input).val(input.attr('placeholder'));

            $(input).focus(function () {
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });

            $(input).blur(function () {
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            });
        });
    }

    $("#login_form").validate({
        rules:{
            uname:{
                required:true
            },
            upwd:{
                required:true
            }
        },
        messages: {
            uname: "请输入用户名",
            upwd: "请输入密码"
        },
        errorClass: "help-inline",
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
            $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass('success');
        },
        submitHandler:function(form){
            $.ajax({
                type: 'POST',
                url: '/login/login',
                data: {
                    uname: $("#uname").val(),
                    upwd: $("#upwd").val()
                },
                cache:false,
                success: function (result) {
                    if(result.code == "success"){
                        window.location.href = "/ec/list";
                    }else{
                        Modal.alert({
                            msg: '用户名或密码不正确',
                            title: '操作提示',
                            btnok: '确定',
                            btncl:'取消'
                        });
                    }
                }
            });
        }
    });
});
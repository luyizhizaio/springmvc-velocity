$(document).ready(function(){

    $('select').select2();

    $("#autoHeight").height(768-$("#main").outerHeight(true));

    $("#add_form").validate({
        rules:{
            path:{
                required:true
            },
            code:{
                required:true
            },
            msg:{
                required:true
            },
            errorCode:{
                required:true
            },
            errorMessage:{
                required:true
            }
        },
        messages: {
            path: "分组不能为空",
            code: "请输入对外统一提示码",
            msg: "请输入对内提示错误码",
            errorCode: "请输入对内提示错误码",
            errorMessage: "请输入对内提示错误码信息"
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
                url: '/ec/save',
                data: {
                    path: $("#path").val().trim(),
                    code: $("#code").val().trim(),
                    msg: $("#msg").val().trim(),
                    errorCode: $("#errorCode").val().trim(),
                    errorMessage: $("#errorMessage").val().trim()
                },
                cache:false,
                success: function (result) {
                    if(result.code == "0"){
                        window.location.href = "/ec/list";
                    }else{
                        Modal.alert({
                            msg: result.msg,
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

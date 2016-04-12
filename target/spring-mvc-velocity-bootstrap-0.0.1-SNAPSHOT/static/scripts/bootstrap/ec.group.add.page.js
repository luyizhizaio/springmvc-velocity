$(document).ready(function(){

    $('select').select2();

    $("#autoHeight").height(768-$("#main").outerHeight(true));

    $("#add_group_form").validate({
        rules:{
            name:{
                required:true
            },
            path:{
                required:true
            }
        },
        messages: {
            name: "请输入分组名称",
            path: "请输入分组路径"
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
                url: '/group/save',
                data: {
                    name: $("#name").val(),
                    path: $("#path").val()
                },
                cache:false,
                success: function (result) {
                    if(result.code == "0"){
                        window.location.href = "/group/list";
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

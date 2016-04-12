$(document).ready(function(){

    $('.data-table').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "sDom": '<""l>t<"F"fp>'
    });

    $('select').select2();

    $("#autoHeight").height(768-$("#main").outerHeight(true));

    updateEC = function (index, path, groupname, code, msg, errorCode, errorMessage) {
        $("#path" + index).html("<input type='text' id='editpath" + index + "' disabled style='width: 200px;height: 20px' value='" + path + "' />");
        $("#gname" + index).html("<input type='text' id='editgname" + index + "' disabled style='width: 200px;height: 20px' value='" + groupname + "' />");
        $("#code" + index).html("<input type='text' id='editcode" + index + "' disabled style='width: 200px;height: 20px' value='" + code + "' />");
        $("#msg" + index).html("<input type='text' id='editmsg" + index + "' style='width: 200px;height: 20px' value='" + msg + "' />");
        $("#ecode" + index).html("<input type='text' id='editecode" + index + "' style='width: 200px;height: 20px' value='" + errorCode + "' />");
        $("#emsg" + index).html("<input type='text' id='editemsg" + index + "' style='width: 200px;height: 20px' value='" + errorMessage + "' />");

        $("#" + index + "btn").html("<button onclick=\"modifyEC('" + index + "','" + code + "','" + groupname + "')\" class=\"btn\" ><i class=\"icon-check\"></i> 保存</button>");
    }

    modifyEC = function (index,code,groupname) {
        $.ajax({
            type: 'POST',
            url: '/ec/modify',
            data: {
                path: $("#editpath"+index).val().trim(),
                code: $("#editcode"+index).val().trim(),
                msg: $("#editmsg"+index).val().trim(),
                errorCode: $("#editecode"+index).val().trim(),
                errorMessage: $("#editemsg"+index).val().trim()
            },
            cache:false,
            success: function (result) {
                if(result.code == "0"){
                    $("#path" + index).html(result.data.path);
                    $("#gname" + index).html(groupname);
                    $("#code" + index).html(result.data.code);
                    $("#msg" + index).html(result.data.msg);
                    $("#ecode" + index).html(result.data.errorCode);
                    $("#emsg" + index).html(result.data.errorMessage);
                    $("#" + index + "btn").html("<button onclick=\"updateEC('"+index+"','"+result.data.path+"','"+groupname+"','"+result.data.code+"','"+result.data.msg+"','"+result.data.errorCode+"','"+result.data.errorMessage+"')\" class=\"btn\"><i class=\"icon-edit\"></i> 编辑</button>");
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

    // 删除
    removeEC = function (path,code) {
        Modal.confirm({
            msg: "是否删除错误码？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/ec/remove',
                    data: {
                        path: path,
                        code: code
                    },
                    cache:false,
                    success: function (result) {
                        if(result.code == "0"){
                            window.location.href = "/ec/list";
                        }else{
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    }

    // 禁用
    banEC = function (code, path) {
        Modal.alert({
            msg: '错误码已禁用',
            title: '操作提示',
            btnok: '确定',
            btncl:'取消'
        });
    }
});

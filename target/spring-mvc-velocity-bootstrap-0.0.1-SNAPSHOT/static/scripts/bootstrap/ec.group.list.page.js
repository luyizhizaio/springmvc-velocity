$(document).ready(function(){

    $('.data-table').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "sDom": '<""l>t<"F"fp>'
    });

    $('select').select2();

    $("#autoHeight").height(768-$("#main").outerHeight(true));

    modifyGroup = function (index,gpath,oname,opath) {
        $.ajax({
            type: 'POST',
            url: '/group/modify',
            data: {
                oldgname: oname,
                oldgpath: opath,
                gname: $("#editname"+index).val().trim(),
                gpath: $("#editpath"+index).val().trim()
            },
            cache:false,
            success: function (result) {
                if(result.code == "0"){
                    $("#path" + index).html(result.data.path);
                    $("#name" + index).html(result.data.name);
                    $("#" + index + "btn").html("<button onclick=\"updateGroup('"+index+"','"+result.data.name+"','"+result.data.path+"')\" class=\"btn\"><i class=\"icon-edit\"></i> 编辑</button>");
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

    // 修改
    updateGroup = function (index, gname, gpath) {
        $("#name" + index).html("<input type='text' id='editname"+index+"' style='width: 200px;height: 20px' value='"+gname+"' />");
        $("#path" + index).html("<input type='text' id='editpath"+index+"' disabled style='width: 200px;height: 20px' value='"+gpath+"' />");

        $("#" + index + "btn").html("<button onclick=\"modifyGroup('"+index+"','"+gpath+"','"+gname+"','"+gpath+"')\" class=\"btn\" ><i class=\"icon-check\"></i> 保存</button>");
    }

    // 删除
    removeGroup = function (gpath) {
        Modal.confirm({
            msg: "是否删除分组？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/group/remove',
                    data: {
                        gpath: gpath
                    },
                    cache:false,
                    success: function (result) {
                        if(result.code == "0"){
                            window.location.href = "/group/list";
                        }else{
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    }

    // 禁用
    banGroup = function (gpath) {
        Modal.alert({
            msg: '分组已禁用',
            title: '操作提示',
            btnok: '确定',
            btncl:'取消'
        });
    }
});

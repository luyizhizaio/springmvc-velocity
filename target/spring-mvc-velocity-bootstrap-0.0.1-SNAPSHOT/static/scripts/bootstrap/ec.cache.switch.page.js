$(document).ready(function(){

    $('select').select2();

    $("#autoHeight").height(768-$("#main").outerHeight(true));

    $("#localOpen").live("click", function () {
        Modal.confirm({
            msg: "是否开启本地缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/localSwitch',
                    cache:false,
                    success: function (result) {
                        if (result.code == "0") {
                            $("#localState").html("<span class=\"label label-success\">开启</span>");
                            $("#localBtn").html("<button id=\"localBan\" class=\"btn\"><i class=\"icon-ban-circle\"></i> 禁用</button>");
                        } else {
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#localBan").live("click", function () {
        Modal.confirm({
            msg: "是否禁用本地缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/localSwitch',
                    cache:false,
                    success: function (result) {
                        if(result.code == "0"){
                            $("#localState").html("<span class=\"label label-important\">关闭</span>");
                            $("#localBtn").html("<button id=\"localOpen\" class=\"btn btn-success\"><i class=\"icon-ok-circle\"></i> 开启</button>");
                        }else{
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#redisOpen").live("click", function () {
        Modal.confirm({
            msg: "是否开启Redis缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/redisSwitch',
                    cache:false,
                    success: function (result) {
                        if(result.code == "0"){
                            $("#redisState").html("<span class=\"label label-success\">开启</span>");
                            $("#redisBtn").html("<button id=\"redisBan\" class=\"btn\"><i class=\"icon-ban-circle\"></i> 禁用</button>");
                        }else{
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#redisBan").live("click", function () {
        Modal.confirm({
            msg: "是否禁用Redis缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/redisSwitch',
                    cache:false,
                    success: function (result) {
                        if(result.code == "0"){
                            $("#redisState").html("<span class=\"label label-important\">关闭</span>");
                            $("#redisBtn").html("<button id=\"redisOpen\" class=\"btn btn-success\"><i class=\"icon-ok-circle\"></i> 开启</button>");
                        }else{
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#localClear").live("click", function () {
        Modal.confirm({
            msg: "是否清除分组信息的本地缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/clear',
                    data: {
                        type: "localGroup"
                    },
                    cache:false,
                    success: function (result) {
                        if (result.code != "0") {
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#redisGroupClear").live("click", function () {
        Modal.confirm({
            msg: "是否清除分组信息的Redis缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/clear',
                    data: {
                        type: "redisGroup"
                    },
                    cache:false,
                    success: function (result) {
                        if (result.code != "0") {
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#redisECClear").live("click", function () {
        Modal.confirm({
            msg: "是否清除错误码信息的Redis缓存？"
        })
        .on(function (e) {
            if(e){
                $.ajax({
                    type: 'POST',
                    url: '/sys/clear',
                    data: {
                        type: "redisEC"
                    },
                    cache:false,
                    success: function (result) {
                        if (result.code != "0") {
                            alert(result.msg);
                        }
                    }
                });
            }
        });
    });

    $("#localShare").live("click", function () {
        Modal.confirm({
            msg: "是否同步分组信息 from Db4o to local cache？"
        })
            .on(function (e) {
                if(e){
                    $.ajax({
                        type: 'POST',
                        url: '/sys/synch',
                        data: {
                            type: "localGroup"
                        },
                        cache:false,
                        success: function (result) {
                            if (result.code != "0") {
                                alert(result.msg);
                            }
                        }
                    });
                }
            });
    });

    $("#redisGroupShare").live("click", function () {
        Modal.confirm({
            msg: "是否同步分组信息 from Db4o to Redis？"
        })
            .on(function (e) {
                if(e){
                    $.ajax({
                        type: 'POST',
                        url: '/sys/synch',
                        data: {
                            type: "redisGroup"
                        },
                        cache:false,
                        success: function (result) {
                            if (result.code != "0") {
                                alert(result.msg);
                            }
                        }
                    });
                }
            });
    });

    $("#redisECShare").live("click", function () {
        Modal.confirm({
            msg: "是否同步错误码信息 from Zookeeper to Redis？"
        })
            .on(function (e) {
                if(e){
                    $.ajax({
                        type: 'POST',
                        url: '/sys/synch',
                        data: {
                            type: "redisEC"
                        },
                        cache:false,
                        success: function (result) {
                            if (result.code != "0") {
                                alert(result.msg);
                            }
                        }
                    });
                }
            });
    });


});

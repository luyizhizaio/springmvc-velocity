$(document).ready(function () {

    $('select').select2();

    $('#startTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss'
    });

    $('#stopTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss'
    });

    $("#autoHeight").height(398 - $("#main").outerHeight(true));

    // 初始
    getListByPage(0, 10);

    $("#searchBtn").live("click", function () {

        var pin = $("#pin").val().trim();
        var startTime = $("#startTime").val().trim();
        var stopTime = $("#stopTime").val().trim();
        var code = $("#code").val().trim();
        var outCode = $("#outCode").val().trim();

        if (pin == "" && startTime == "" && stopTime == "" && code == "" && outCode == "")
            return;

        $("#pin").val(pin);
        $("#startTime").val(startTime);
        $("#stopTime").val(stopTime);
        $("#code").val(code);
        $("#outCode").val(outCode);

        var pageSize = $("#pageSize").val();
        getListByPage(0, pageSize);
    });

    $("#pageSize").live("click", function () {
        var pageStart = $("#currentNum").val();
        var pageSize = $("#pageSize").val();
        getListByPage(pageStart, pageSize);
    });

    // 第一页
    $("#firstPage").live("click", function () {
        var pageSize = $("#pageSize").val();
        getListByPage(0, pageSize);
    });

    // 最后一页
    $("#lastPage").live("click", function () {
        var totalNum = $("#totalNum").html();
        var pageSize = $("#pageSize").val();
        var totalPage = Math.ceil(totalNum / pageSize);
        console.info((totalPage - 1) * pageSize);
        getListByPage((totalPage - 1) * pageSize, pageSize);
    });

    // 上一页
    $("#prePage").live("click", function () {
        var pageStart = $("#currentNum").val();
        var pageSize = $("#pageSize").val();
        var startPage = parseInt(pageStart) - parseInt(pageSize);
        if (startPage < 0) {
            startPage = 0;
        }
        getListByPage(startPage, pageSize);
    });

    // 下一页
    $("#nextPage").live("click", function () {
        var pageStart = $("#currentNum").val();
        var pageSize = $("#pageSize").val();
        var totalNum = $("#totalNum").html();
        var totalPage = Math.ceil(totalNum / pageSize);
        var startPage = parseInt(pageStart) + parseInt(pageSize);
        if (startPage >= totalNum) {
            startPage = (totalPage - 1) * pageSize;
        }
        getListByPage(startPage, pageSize);
    });

});

function getListByPage(pageStart, pageSize) {

    var pin = $("#pin").val().trim();
    var startTime = $("#startTime").val().trim();
    var stopTime = $("#stopTime").val().trim();
    var code = $("#code").val().trim();
    var outCode = $("#outCode").val().trim();

    console.info(startTime);
    console.info(stopTime);

    $.ajax({
        type: 'POST',
        url: '/log/list',
        data: {
            pageStart: pageStart,
            pageSize: pageSize,
            pin: pin,
            startTime: startTime,
            stopTime: stopTime,
            code: code,
            outCode: outCode
        },
        cache: false,
        success: function (result) {

            console.info(result.code);

            if (result.code == "0" && result.data.totalSize > 0) {
                haveData();
                setPage(result.data.pageStart, result.data.pageSize, result.data.totalSize);
                initPage(result.data.pageStart, result.data.pageSize, result.data.totalSize);
                initData(result.data.list);
            } else {
                nonData();
            }
        }
    });
}

function getListByPageNum(pageNum) {
    var pageSize = $("#pageSize").val();
    getListByPage((pageNum - 1) * pageSize, pageSize);
}

function initPage(pageStart, pageSize, totalSize) {
    $("#pageList").find("li").remove();

    if (pageStart <= 0) {
        var firstLi = "<li class=\"disabled\"><a>First</a></li>";
        $("#pageList").append(firstLi);
    } else {
        var firstLi = "<li><a id=\"firstPage\">First</a></li>";
        $("#pageList").append(firstLi);
    }

    if (pageStart / pageSize == 0) {
        var previousLi = "<li class=\"disabled\"><a>Previous</a></li>";
        $("#pageList").append(previousLi);
    } else {
        var previousLi = "<li><a id=\"prePage\">Previous</a></li>";
        $("#pageList").append(previousLi);
    }

    pageList(pageStart, pageSize, totalSize);

    if (pageStart + pageSize >= totalSize) {
        var nextLi = "<li class=\"disabled\"><a>Next</a></li>";
        $("#pageList").append(nextLi);
        var lastLi = "<li class=\"disabled\"><a>Last</a></li>";
        $("#pageList").append(lastLi);
    } else {
        var nextLi = "<li><a id=\"nextPage\">Next</a></li>";
        $("#pageList").append(nextLi);
        var lastLi = "<li><a id=\"lastPage\">Last</a></li>";
        $("#pageList").append(lastLi);
    }
}

function pageList(pageStart, pageSize, totalSize){
    var totalPage = Math.ceil(totalSize / pageSize);
    var currentPage = Math.floor(pageStart / pageSize) + 1;
    startPage = 0;
    limitPage = totalPage;
    if (totalPage > 5) {
        if (currentPage + 2 >= totalPage) {
            startPage = totalPage - 5;
            limitPage = totalPage;
        } else {
            if (currentPage - 3 > 0) {
                startPage = currentPage - 3;
            }
            limitPage = startPage + 5;
        }
    }
    for (i = startPage; i < limitPage; i++) {
        if (currentPage - 1 == i) {
            var li = "<li class=\"active\"><a>" + (i + 1) + "</a></li>";
            $("#pageList").append(li);
        } else {
            var li = "<li><a onclick=\"getListByPageNum(" + (i + 1) + ")\">" + (i + 1) + "</a></li>";
            $("#pageList").append(li);
        }
    }
}

function initData(list) {
    $.each(list, function (n, obj) {
        var row = "<tr>" +
            "<td><input type=\"checkbox\" /></td> " +
            "<td> " + obj.pin + " </td> " +
            "<td> " + obj.createTime + " </td> " +
            "<td> " + obj.code + " </td> " +
            "<td> " + obj.msg + " </td> " +
            "<td> " + obj.outCode + " </td> " +
            "<td> " + obj.outMsg + " </td> " +
            "</tr>";
        $("#data").append(row);
    });
}

function setPage(pageStart, pageSize, totalSize) {
    $("#currentNum").val(pageStart);
    $("#pageSize").attr("value", pageSize);
    $("#totalNum").html(totalSize);
}

function nonData() {
    $("#tip").show();
    $("#page").html("");
}

function haveData() {
    $("#tip").hide();
    $("#data").html("");
}

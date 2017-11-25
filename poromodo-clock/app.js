"use strict"
$(function() {
    let time = $("p#time"),
        workTime = $("p#workLength"),
        restTime = $("p#restLength"),
        secs = 1500, // 默认25分钟
        status = 1, // 1表示工作状态，2表示休息状态
        timer = null;

    function refreshTime() {
        let h = Math.floor(secs / 3600),
            m = Math.floor(secs % 3600 / 60),
            s = Math.floor(secs % 3600 % 60);
        secs -= 1;
        if (secs === -1 && status === 1) { // 工作时间完毕
            status = 2; // 转为休息时间
            secs = restTime.text() * 60;
            $("h2").text("休息啦");
        } else if (secs == -1 && status == 2) { // 休息时间完毕
            status = 1; // 转为工作时间
            secs = workTime.text() * 60;
            $("h2").text("工作啦");
        }
        // 格式整理
        return (h > 0 ? h + ":" : "") + (m >= 10 ? m + ":" : "0" + m + ":") + (s >= 10 ? s : "0" + s);
    };

    function timeGoesBy() {
        time.text(refreshTime());
    }

    $("body").click(function(e) {
        let tg = $(e.target);
        switch (tg.attr("class")) {
            case "plus": // 增加时间
                if (!timer) {
                    let pre = parseInt(tg.prev().text()) + 1;
                    tg.prev().text(pre);
                    if (tg.attr("id") === "workPlus") {
                        time.text(workTime.text());
                        secs = workTime.text() * 60;
                    };
                    if (tg.attr("id") === "restPlus") {
                        time.text(restTime.text());
                        secs = restTime.text() * 60;
                    };
                };
                break;
            case "minus": // 减少时间
                if (!timer) {
                    let next = parseInt(tg.next().text() - 1);
                    tg.next().text(next);
                    if (tg.attr("id") === "workMinus") {
                        time.text(workTime.text());
                        secs = workTime.text() * 60;
                    };
                    if (tg.attr("id") === "restMinus") {
                        time.text(restTime.text());
                        secs = restTime.text() * 60;
                    };
                }
                break;
            case "timer":
                if (timer) {
                    clearInterval(timer);
                    timer = null;

                } else {
                    timeGoesBy(); // 立即启动
                    timer = setInterval(timeGoesBy, 1000);
                }
                break;
            default:
                break;
        };
    });
})
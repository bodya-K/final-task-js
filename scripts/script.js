let a, b, data = $(), startL, startT, elem = $(), number, f = new Array(15), m = 0, q = true, arr = new Array(15), start_position = []

for (i = 0; i <= 15; i++) {
    start_position.splice(i, 1, [$(`.block-start:eq(${i})`).offset().top, $(`.block-start:eq(${i})`).offset().left])
}

$('.block-start').draggable({
    start: function () {
        startT = $(this).offset().top
        startL = $(this).offset().left
        elem = $(this)
        elem.attr("data", "false")
        elem.css("z-index", "1")
    },
    stop: function () {
        for (i = 0; i < f.length; i++) {
            if (number == f[i]) {
                m++
            }
        }
        if (m == 1 & elem.attr("data") == "true" & q == true) {
            $(this).offset({ top: a, left: b })
            m--
            if ($("button:eq(0)").css("backgroundColor") == "rgb(231, 70, 64)") {
                timer_Interval = setInterval(timer, 1000)
                $("button:eq(0)").addClass("button-active")
                $("button:eq(1)").removeClass("button-active")
            }

        }
        else if (elem.attr("data") == "false" || q == false) {
            $(this).offset({ top: startT, left: startL })
            m = 0
        }
    },
});
$('.block-end').droppable({
    accept: '.block-start',
    hoverClass: 'hov',
    tolerance: 'intersect',
    activate: function () {
    },
    drop: function (element, ui) {
        data = $(this)
        number = data.attr('id')
        elem.attr("data", "true")
        elem.css("z-index", "0")
        for (i = 0; i < f.length; i++) {
            if ($(this).attr("id") == f[i]) {
                q = false
                return
            }
            if ($(this).attr("id") != f[i]) {
                q = true
            }
        }
        if (q == true) {
            f.splice(elem.attr("data-id"), 1, $(this).attr("id"))
            arr.splice(element.target.id, 1, ui.draggable.attr("data-id"))
        }
        a = $(this).offset().top
        b = $(this).offset().left
    },
})
let start = false, timer_Interval, second = 60
$("button:eq(0)").click(function () {
    if ($(this).css("backgroundColor") == "rgb(231, 70, 64)") {
        timer_Interval = setInterval(timer, 1000)
        start = true
        $(this).addClass("button-active")
        $("button:eq(1)").removeClass("button-active")
    }
})

$("button:eq(1)").click(function () {
    if ($(this).css("backgroundColor") == "rgb(231, 70, 64)") {
        $(".modal").css("display", "block")
    }
})

function timer() {
    if (second > 0) {
        second--
    }
    if (second < 10) second = "0" + second
    $(".timer").html(`00:${second}`)
    $(".timer-1").html(`00:${second}`)
    if (second == 0) clearInterval(timer_Interval)
    if (second == "00") {
        $(".modal").css("display", "block")
        $(".modal-block-2").css("display", "flex")
        $("button:eq(1)").addClass("button-active")
        for (i = 0; i < $(".block-end").length; i++) {
            if (i != arr[i]) {
                $(".modal-text:eq(1)").html("It's a pity, but you lost")
                return
            }
            if (i == arr[i]) {
                console.log(arr[i] == i)
                $(".modal-text:eq(1)").html("Woohoo, well done, you did it!")
            }
        }
    }
}

$(".close:eq(0)").click(function () {
    $(".modal").css("display", "none")
})

$(".close-1").click(function () {
    $(".modal").css("display", "none")
    $(".modal-block-2").css("display", "none")
})

$(".check").click(function () {
    clearInterval(timer_Interval)
    $("button:eq(1)").addClass("button-active")
    for (i = 0; i < $(".block-end").length; i++) {
        if (i != arr[i]) {
            $(".modal-block-2").css("display", "flex")
            $(".modal-text:eq(1)").html("It's a pity, but you lost")
            return
        }
        if (i == arr[i]) {
            console.log(arr[i] == i)
            $(".modal-block-2").css("display", "flex")
            $(".modal-text:eq(1)").html("Woohoo, well done, you did it!")
        }
    }
})

$("button:eq(2)").click(function () {
    second = 60
    $(".timer").html("01:00")
    for (i = 0; i <= 15; i++) {
        $(`.block-start:eq(${i})`).offset({ top: start_position[i][0], left: start_position[i][1] })
    }
    clearInterval(timer_Interval)
    f = new Array(15)
    $("button:eq(0)").removeClass("button-active")
    $("button:eq(1)").addClass("button-active")
    for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], i = a.length; i--;) {
        var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)
        $(`.block-start:eq(${i})`).attr(`data-id`, random)
    }
})

$("button:eq(2)").trigger("click")

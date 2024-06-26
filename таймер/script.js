const info = document.querySelector('.info');

const daysInfo = document.querySelector('#days');
const hoursInfo = document.querySelector('#hours');
const minutesInfo = document.querySelector('#minutes');
const secondsInfo = document.querySelector('#seconds');
var timesInfo = [daysInfo, hoursInfo, minutesInfo, secondsInfo];

var d, h, m, s;

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

var timerTick = false;
startBtn.onclick = start;

function moveCursor(num) {
    console.log(num);
    if (timerTick) {
        return;
    }
}

function start() {
    if (timerTick) {
        return;
    }
    for (var i = 0; i < timesInfo.length; i++) {timesInfo[i].setAttribute('readonly', 'readonly');}
    info.innerHTML = '<span style="font-size: 30px">&#9203;</span>';
    try {
        d = eval(daysInfo.value);
        h = eval(hoursInfo.value);
        m = eval(minutesInfo.value);
        s = eval(secondsInfo.value);
    } catch {
        error();
        return;
    }
    if ((d == undefined) || (d == NaN) || (h == undefined) || (h == NaN) || (m == undefined) || (m == NaN) || (s == undefined) || (s == NaN) || (d < 0) || (h < 0) || (m < 0) || (s < 0) || (!Number.isInteger(d)) || (!Number.isInteger(h)) || (!Number.isInteger(m)) || (!Number.isInteger(s))) {
        error();
        return;
    }
    if (s >= 60) {
        s -= 60;
        m += 1;
    }
    if (m >= 60) {
        m -= 60;
        h += 1;
    }
    while (h >= 24) {
        h -= 24;
        d += 1;
    }
    daysInfo.value = d;
    hoursInfo.value = h;
    minutesInfo.value = m;
    secondsInfo.value = s;

    showTime();
    var timerSec = setInterval(showTime, 1000);
    stopBtn.onclick = stop;
    timerTick = true;

    function timeUp() {
        var audio = new Audio('fonts/Smeshariki_-_OT_VINTA_Bass_Boosted_63361235.mp3');
        audio.play();
        info.innerHTML = 'вадим';
        for (var i = 0; i < timesInfo.length; i++) {timesInfo[i].removeAttribute('readonly');}
        clearInterval(timerSec);
        timerTick = false;
    }

    function showTime() {
        d = daysInfo.value;
        h = hoursInfo.value;
        m = minutesInfo.value;
        s = secondsInfo.value;
        if (d == 0 && h == 0 && m == 0 && s == 0) {
            timeUp();
            return;
        }
        s -= 1;
        if (s < 0) {
            if (!(m == 0)) {
                s = 59;
                m -= 1;
            } else if (m == 0 && h !== 0) {
                s = 59;
                m = 59;
                h -= 1;
            }
        }
        if ((m < 0) && !(h == 0)) {
            m = 59;
            h -= 1;
        }
        if ((h < 0) && !(d == 0)) {
            h = 23;
            d -= 1;
        }
        daysInfo.value = d;
        hoursInfo.value = h;
        minutesInfo.value = m;
        secondsInfo.value = s;
    }

    function stop() {
        for (var i = 0; i < timesInfo.length; i++) {timesInfo[i].removeAttribute('readonly');}
        clearInterval(timerSec);
        timerTick = false;
    }

    function error() {
        info.innerHTML = 'это печально';
        for (var i = 0; i < timesInfo.length; i++) {timesInfo[i].removeAttribute('readonly');}
        timerTick = false;
        for (var i = 0; i < timesInfo.length; i++) {timesInfo[i].value = 0;}
    }
}

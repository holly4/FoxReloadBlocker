function notifierFlasher(element, activeColor, idleColor) {

    function notify(times, delay) {
        var timesLeft = times;
        flasher = setInterval(function () {
            if (timesLeft-- <= 0) {
                clearInterval(flasher);
            } else {
                $(element).css("background-color", activeColor);
                setTimeout(function () {
                    $(element).css("background-color", idleColor);
                }, delay / 2 * 1000);
            }
        }, delay * 1000)
    }

    return notify;
}

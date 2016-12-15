// content_script.js - injected into the web page

// simple logging function
function log(line) {
    console.log("FoxReloadBlocker: " + line);
}

// run onLoad() on page load
if (window.attachEvent) {
    window.attachEvent('onload', onLoad);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function (evt) {
            curronload(evt);
            onLoad(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = onLoad;
    }
}

// return any string to indicate to prompt user on this page unload
function onBeforeUnload(evt) {
    evt.returnValue = "Refresh the page?";
}

// add the event handler on all fox news pages except the main page
function onLoad() {
    // get the current url and trim off any trailing slash
    var url = window.location.href.replace(/\/$/, "");

    // only run on urls with more than 2 slashes
    // i.e., 
    // don't run on http://fox.news.com
    // do run on    http://fox.news.com/section/article

    if (url.match(/\//g).length > 2) {
        log('added listener on ' + url);
        window.addEventListener("beforeunload", onBeforeUnload);
    } else {
        log('not adding listener on' + url);
    }
}
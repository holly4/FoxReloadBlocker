// content_script.js - injected into the web page

var verbose = true;

// simple logging functions
function logAll(line) {
    console.log("FoxReloadBlocker: " + line);
}

function log(line) {
    if (verbose) {
        console.log("FoxReloadBlocker: " + line);
    }
}

var lastRefreshTime;
var warned = false;
var flasher;

// use these setting until loaded
var settings = {
    refreshInterval: 60*10,
    warningDelay: 5 
}

// main timer
function secondTimer() {
    var now = Math.floor((new Date()).getTime()/1000);

    if (!lastRefreshTime) {
        lastRefreshTime = now;        
        warned = false;
    }

    var nextRefreshTime = lastRefreshTime + parseInt(settings.refreshInterval, 10);

    // have the warning initiate a second earlier as it does not actually occur
    // until the tick of a one second timer
    var nextWarningTime = nextRefreshTime - (parseInt(settings.warningDelay, 10)+1);

    var tilRefresh = nextRefreshTime - now;
    var tilWarning = nextWarningTime - now;
    log("time until: refresh=: " + tilRefresh + ", warning=" + tilWarning);

    if (!warned && now >= nextWarningTime) {
        warned = true;
        notify();
    }
}

// notify of pending refresh
function notify() {
    if (!settings.flashScreen===undefined) {
        log('notify called but no settings');
        return;
    }

    if (settings.flashScreen) {
        flasher = notifierFlasher(
            $("body")[0], 
            settings.flashScreenColor,
            $("body").css("background-color"));
        flasher(parseInt(settings.flashScreenTimes), 
            parseFloat(settings.flashScreenInterval));
    }  
}

// handler for onBeforeUnload event. 
// cancel any notifications and
// return any string to indicate to prompt user on this page unload
function onBeforeUnload(evt) {
    log("...onBeforeUnload");
    var now = new Date().getTime();
    var elapsed = (now - lastRefreshTime)/1000;

    logAll("seconds since last refresh: " + elapsed);
    evt.returnValue = "Refresh the page?";
    lastRefreshTime = null;
    log("onBeforeUnload..." + evt.returnValue);
}

// add the event handler on all fox news pages except the main page
// and with a comment stream. (The main page is not likely to have
// a comment page but will still exclude that)
$(document).ready(function () {
    // set the timer
    setInterval(secondTimer, 1000);

    // load settings
    settings = SETTINGS.load(function(data) {
        logAll("loaded settings: " + JSON.stringify(data));        
        settings = data;
        verbose = settings.verboseLogging;
    });

    // get the current url and trim off any trailing slash
    var url = window.location.href.replace(/\/$/, "");

    // the main page has only 2 slashes
    // i.e., http://fox.news.com, vs http://fox.news.com/section/article
    const isMainPage = url.match(/\//g).length > 2;
    const hasCommentsStream = $("#commenting").length > 0;

    log("isMainPage: " + isMainPage);
    log("hasCommentsStream" + hasCommentsStream);

    if (isMainPage && hasCommentsStream) {
        log("added listener on " + url);
        window.addEventListener("beforeunload", onBeforeUnload);
        chrome.runtime.sendMessage("show");
        //playSound("sound2.mp3");
    } else {
        log("not adding listener on" + url);
        chrome.runtime.sendMessage("hide");
    }
});
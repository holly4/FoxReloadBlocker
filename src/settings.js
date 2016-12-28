var SETTINGS = (function () {
	var module = {};

    const SETTINGS_KEY = "settings";

    // module logging function
    function log(line) {
        console.log("settings: " + line);
    }
    
    // default setttings
    defaultSettings = {
            refreshInterval: "600",
            warningDelay: "5",
            flashScreen: true,
            flashScreenColor: "#C0C0C0",
            flashScreenInterval: "1",
            flashScreenTimes: "5",
            verboseLogging: false
    }

    // save settings to storage.sync
	module.save = function (settings, onSaved) {
        if (chrome && chrome.storage) {
            log("save: " + JSON.stringify(settings));
            var items = {};
            items[SETTINGS_KEY] = settings;        
            chrome.storage.sync.set(items, function () {
                onSaved(true);
            });
        } else {
            log("save: no storage api");
            onSaved(false);
        }
    }

    // load settings to storage.sync
    module.load = function (onLoaded) {
        if (chrome && chrome.storage) {
            chrome.storage.sync.get(SETTINGS_KEY , function (items) {
                if (items && items[SETTINGS_KEY]) {
                    settings = items[SETTINGS_KEY];
                    //log("load: " + JSON.stringify(settings));
                    onLoaded(settings);
                } else {
                    log("load: failed to retrieve options");
                    onLoaded(defaultSettings);
                }
            });
        }
        else {
            log("load: no storage api");
            onLoaded(defaultSettings);
        }
    }

	return module;
}());

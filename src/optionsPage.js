$(document).ready(function () {

    // simple logging functions
    function logAll(line) {
        console.log("SettingsPage: " + line);
    }
    function log(line) {
        if ($("#verbose-logging").is(":checked")) {
            console.log("SettingsPage: " + line);
        }
    }

    // extract the Settings from the page
    function getSettings()
    {
        var data = {
            refreshInterval:     $("#refresh-interval").val(),
            warningDelay:        $("#warning-delay").val(),
            flashScreen:         $("#flash-screen").is(":checked"),
            flashScreenColor:    $("#flash-screen-color").val(),
            flashScreenInterval: $("#flash-screen-interval").val(),
            flashScreenTimes:    $("#flash-screen-times").val(),
            verboseLogging:      $("#verbose-logging").is(":checked"),            
        }

        log("getSettings: " + JSON.stringify(data));
        return data;
    }

    // set the Settings from the page
    function setSettings(data)
    {
        log("setSettings: " + JSON.stringify(data));

        $("#refresh-interval").val(data.refreshInterval);
        $("#warning-delay").val(data.warningDelay);
        $("#flash-screen").prop("checked", data.flashScreen);
        $("#flash-screen-color").val(data.flashScreenColor);       
        $("#flash-screen-interval").val(data.flashScreenInterval);
        $("#flash-screen-times").val(data.flashScreenTimes);
        $("#verbose-logging").prop("checked", data.verboseLogging); 
    }

    // show the status text field
    function showStatusText(text) {
        $("#status").text(text);
        setTimeout(function () {
            $("#status").text("");
        }, 750);
    }

    // handle save button
    $("#save-button").click(function() {
        SETTINGS.save(getSettings(), function(state) {
            if (state) {
                showStatusText("saved settings...");
            }
        });
    });

    // handle test button
    $("#test-button").click(function() {
        var settings = getSettings();
        if (settings.flashScreen) {
            var flasher = notifierFlasher(
                $("body")[0], 
                settings.flashScreenColor,
            $("body").css("background-color"));
            flasher( parseInt(settings.flashScreenTimes), 
                parseFloat(settings.flashScreenInterval));
        }
    });


    // load settings on page load
    SETTINGS.load(function(data) {
        setSettings(data);
        showStatusText("loaded settings...");
    });    
});
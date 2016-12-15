# FoxReloadBlocker

WebExtension to handle the onBeforeUnload event on Fox News Web Pages. 

This portable code should run on the Google Chrome, FireFox and Opera browsers. Extending to Microsoft Edge should be trivial.

This code works by installing a handler for the [onBeforeUnload event](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload). Returning any string from the handler causes compatibile browsers to show a dialog to the user to confirm the page should be unloaded. Declining the page unload averts the page reload (or navigation).

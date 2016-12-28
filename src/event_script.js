// listen for install event
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "http://hollies.pw/static/frb/v110/"}, function (tab) {
    });
});

// listen for request to show the icon
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == "show") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
document.getElementById("apply-css").addEventListener("click", function() {
    chrome.storage.sync.get(["urlPattern", "customCSS"], function(data) {
      if (data.customCSS) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const tab = tabs[0];
          const urlMatches = new RegExp(data.urlPattern.replace(/\*/g, ".*")).test(tab.url);
  
          if (urlMatches) {
            chrome.scripting.insertCSS({
              target: { tabId: tab.id },
              css: data.customCSS
            }, () => {
              console.log("CSS applied to current tab");
            });
          } else {
            alert("The current URL does not match the pattern.");
          }
        });
      }
    });
  });
  
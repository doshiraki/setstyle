chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      chrome.storage.sync.get(["urlPattern", "customCSS"], function(data) {
        if (data.urlPattern && data.customCSS) {
          const urlMatches = new RegExp(data.urlPattern.replace(/\*/g, ".*")).test(tab.url);
  
          if (urlMatches) {
            chrome.scripting.insertCSS({
              target: { tabId: tabId },
              css: data.customCSS
            }, () => {
              console.log("CSS applied to tab with ID:", tabId);
            });
          }
        }
      });
    }
  });
  
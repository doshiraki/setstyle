document.getElementById("settings-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const urlPattern = document.getElementById("url-pattern").value;
    const customCSS = document.getElementById("custom-css").value;
  
    chrome.storage.sync.set({ urlPattern, customCSS }, function() {
      alert("Settings saved!");
    });
  });
  
  // ページ読み込み時に保存された設定を復元
  document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get(["urlPattern", "customCSS"], function(data) {
      if (data.urlPattern) {
        document.getElementById("url-pattern").value = data.urlPattern;
      }
      if (data.customCSS) {
        document.getElementById("custom-css").value = data.customCSS;
      }
    });
  });
  
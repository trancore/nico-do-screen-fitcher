chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.isValid === true && message.tabId) {
    chrome.scripting.insertCSS(
      {
        target: { tabId: message.tabId, allFrames: true },
        files: ["css/niconico.css"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log("CSS incerted successfully");
        }
      }
    );
  }
  if (message.isValid === false && message.tabId) {
    chrome.scripting.removeCSS(
      {
        target: { tabId: message.tabId, allFrames: true },
        files: ["css/niconico.css"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log("CSS removed successfully");
        }
      }
    );
  }
});

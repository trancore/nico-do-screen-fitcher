async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}

document.addEventListener("DOMContentLoaded", async function () {
  const storageCache = { isValid: false };
  await chrome.storage.sync.get("isValid").then((items) => {
    if (items.isValid !== undefined) {
      storageCache.isValid = items.isValid;
    }
  });

  const toggleButton = document.getElementById("toggle-button");

  if (toggleButton) {
    toggleButton.checked = storageCache.isValid;
    const tabId = await getCurrentTab();

    toggleButton.addEventListener("change", async function () {
      const isValid = this.checked;

      await chrome.storage.sync.set({ isValid: isValid });

      if (isValid) {
        // TODO styleを適応する
        chrome.runtime.sendMessage({
          isValid: true,
          tabId: tabId,
        });
      } else {
        // TODO styleを外す
        chrome.runtime.sendMessage({
          isValid: false,
          tabId: tabId,
        });
      }
    });

    if (toggleButton.checked) {
      // TODO styleを適応する
      chrome.runtime.sendMessage({
        isValid: true,
        tabId: tabId,
      });
    } else {
      // TODO styleを外す
      chrome.runtime.sendMessage({
        isValid: false,
        tabId: tabId,
      });
    }
  }
});

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}

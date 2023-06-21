chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url?.startsWith("https://chrome") || tab.url?.startsWith("chrome://")) return undefined;

    if (tab.active && changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./imagePass.js"],
        });
    }
});

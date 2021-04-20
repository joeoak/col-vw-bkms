chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});

chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
  if (changeInfo) chrome.runtime.sendMessage(chrome.runtime.id, changeInfo);
});

chrome.bookmarks.onChildrenReordered.addListener((id, reorderInfo) => {
  if (reorderInfo) chrome.runtime.sendMessage(chrome.runtime.id, reorderInfo);
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  if (bookmark) chrome.runtime.sendMessage(chrome.runtime.id, bookmark);
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
  if (moveInfo) chrome.runtime.sendMessage(chrome.runtime.id, moveInfo);
});

chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
  if (removeInfo) chrome.runtime.sendMessage(chrome.runtime.id, removeInfo);
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes) console.log(changes);
});

chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
  if (changeInfo) console.log(changeInfo);
});

chrome.bookmarks.onChildrenReordered.addListener((id, reorderInfo) => {
  if (reorderInfo) console.log(reorderInfo);
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  if (bookmark) console.log(bookmark);
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
  if (moveInfo) console.log(moveInfo);
});

chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
  if (removeInfo) console.log(removeInfo);
});

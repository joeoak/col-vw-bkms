/* global chrome */
import React, { useEffect, useState } from 'react';
// import { fakeTree } from '../fakeTree';
import Column from './Column';
import './App.scss';

const App = () => {
  const [bookmarkTree, setBookmarkTree] = useState([]);
  const [focusColumn, setFocusColumn] = useState();
  const [openFolderElements, setOpenFolderElements] = useState([]);
  const [openFolderIds, setOpenFolderIds] = useState([{ id: '0', parentId: null }]);

  useEffect(() => {
    chrome.bookmarks.getTree((tree) => setBookmarkTree(tree));
    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.storage.local.get('columnViewBookmarksOpenFolderIds', (result) => {
      let target = result.columnViewBookmarksOpenFolderIds;
      if (target) setOpenFolderIds(JSON.parse(target));
    });
    // setBookmarkTree(fakeTree);
  }, []);

  useEffect(() => {
    if (bookmarkTree.length > 0) {
      setOpenFolderElements([]);
      findAndSetOpenFolders(bookmarkTree);
    }
    // eslint-disable-next-line
  }, [bookmarkTree, focusColumn, openFolderIds]);

  const findAndSetOpenFolders = (arr) => {
    arr.forEach((node) => {
      if (node.children) {
        if (openFolderIds.some((obj) => obj.id === node.id)) {
          setOpenFolderElements((openFolderElements) => [
            ...openFolderElements,
            <Column
              columnIndex={openFolderElements.length} // prettier ignore
              isColumnFocused={openFolderElements.length === focusColumn}
              node={node}
              rootObj={rootObj}
              key={node.id}
            />,
          ]);
        }
        findAndSetOpenFolders(node.children);
      }
    });
  };

  const handleMessage = (msg) => chrome.bookmarks.getTree((tree) => setBookmarkTree(tree));

  const removeNode = (node) => {
    if (node.children) {
      let confirmRemove = window.confirm('Are you sure you want to remove this folder and all of its contents?');
      if (confirmRemove) chrome.bookmarks.removeTree(node.id);
    } else {
      let confirmRemove = window.confirm('Are you sure you want to remove this bookmark?');
      if (confirmRemove) chrome.bookmarks.remove(node.id);
    }
  };

  const renameNode = (node, newTitle) => {
    chrome.bookmarks.update(node.id, { title: newTitle });
  };

  const updateOpenFolderIds = (folderObj) => {
    const findParentFolder = (parentId) => openFolderIds.find((obj) => obj.id === parentId);
    let newOpenFolderIds = [folderObj];
    let targetFolder = folderObj;
    let parentFolder;
    while (targetFolder.id !== '0') {
      parentFolder = findParentFolder(targetFolder.parentId);
      newOpenFolderIds.unshift(parentFolder);
      targetFolder = parentFolder;
    }
    chrome.storage.local.set({ columnViewBookmarksOpenFolderIds: JSON.stringify(newOpenFolderIds) });
    setOpenFolderIds(newOpenFolderIds);
  };

  const rootObj = {
    focusColumn: focusColumn,
    removeNode: removeNode,
    renameNode: renameNode,
    setFocusColumn: setFocusColumn,
    openFolderIds: openFolderIds,
    updateOpenFolderIds: updateOpenFolderIds,
  };

  return (
    <>
      <div className='app-header'>Column View Bookmarks</div>
      <div className='columns'>{openFolderElements}</div>
    </>
  );
};

export default App;

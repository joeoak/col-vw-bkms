/* global chrome */
import React, { useEffect, useState } from 'react';
import './App.scss';
// import { fakeTree } from './fakeTree';
import { Column } from './Column';

export const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  // const bookmarks = fakeTree;
  const [openFolders, setOpenFolders] = useState([]);
  const [openFoldersIds, setOpenFoldersIds] = useState([{ id: '0', parentId: null }]);

  useEffect(() => {
    chrome.bookmarks.getTree((tree) => {
      setBookmarks(tree);
    });
  }, []);

  const findAndSetOpenFolders = (arr) => {
    arr.forEach((bookmark) => {
      if (bookmark.children) {
        if (openFoldersIds.some((obj) => obj.id === bookmark.id)) {
          setOpenFolders((openFolders) => [...openFolders, <Column callback={updateOpenFoldersIds} bookmarks={bookmark.children} key={bookmark.id} openFoldersIds={openFoldersIds} />]);
        }
        return findAndSetOpenFolders(bookmark.children);
      }
    });
  };

  const updateOpenFolders = () => {
    setOpenFolders([]);
    findAndSetOpenFolders(bookmarks);
  };

  const updateOpenFoldersIds = (folderObj) => {
    if (!openFoldersIds.some((obj) => obj.id === folderObj)) {
      let newArr = [folderObj];
      let targetFolder = folderObj;
      let findParentFolder = (parentId) => openFoldersIds.find((obj) => obj.id === parentId);

      while (targetFolder.id !== '0') {
        let parentFolder = findParentFolder(targetFolder.parentId);
        newArr.unshift(parentFolder);
        targetFolder = parentFolder;
      }

      setOpenFoldersIds(newArr);
    }
  };

  useEffect(() => {
    if (bookmarks.length > 0) updateOpenFolders();
    // eslint-disable-next-line
  }, [bookmarks]);

  useEffect(() => {
    updateOpenFolders();
    // eslint-disable-next-line
  }, [openFoldersIds]);

  return <div className="columns">{openFolders}</div>;
};

/* global chrome */
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [openFolders, setOpenFolders] = useState([]);
  const [openFoldersIds, setOpenFoldersIds] = useState([{ id: '0', parentId: null }]);

  useEffect(() => {
    chrome.bookmarks.getTree((tree) => {
      setBookmarks(tree);
    });
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      updateOpenFolders();
    }
  }, [bookmarks]);

  useEffect(() => {
    updateOpenFolders();
  }, [openFoldersIds]);

  const findAndSetOpenFolders = (arr) => {
    arr.forEach((bookmark) => {
      if (bookmark.children) {
        if (openFoldersIds.some((obj) => obj.id === bookmark.id)) {
          setOpenFolders((openFolders) => [...openFolders, <Column callback={updateOpenFoldersIds} bookmarks={bookmark.children} />]);
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

      while (targetFolder.id !== '0') {
        let parentFolder = openFoldersIds.find((obj) => obj.id === targetFolder.parentId);
        newArr.unshift(parentFolder);
        targetFolder = parentFolder;
      }

      setOpenFoldersIds(newArr);
    }
  };

  return <div className="columns">{openFolders}</div>;
};

const Column = (props) => {
  return (
    <div className="column">
      {props.bookmarks.map((bookmark) => (
        <Bookmark callback={props.callback} bookmark={bookmark}>
          {bookmark.title}
        </Bookmark>
      ))}
    </div>
  );
};

const Bookmark = (props) => {
  const onClick = () => {
    return props.callback({ id: props.bookmark.id, parentId: props.bookmark.parentId });
  };

  return (
    <div className="bookmark">
      <a href={props.bookmark.url} onClick={() => onClick()}>
        {props.children}
      </a>
    </div>
  );
};

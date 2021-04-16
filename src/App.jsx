/* global chrome */
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [openFolders, setOpenFolders] = useState([]);
  const [openFoldersIds, setOpenFoldersIds] = useState([]);

  useEffect(() => {
    chrome.bookmarks.getTree((tree) => {
      setBookmarks(tree[0].children);
    });
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      setOpenFolders([<Column callback={updateOpenFoldersIds} bookmarks={bookmarks} />]);
      findAndSetOpenFolders(bookmarks);
    }
  }, [bookmarks]);

  useEffect(() => {
    console.log(openFoldersIds);
    setOpenFolders([<Column callback={updateOpenFoldersIds} bookmarks={bookmarks} />]);
    findAndSetOpenFolders(bookmarks);
  }, [openFoldersIds]);

  const updateOpenFoldersIds = (id) => {
    if (!openFoldersIds.includes(id)) {
      setOpenFoldersIds((openFoldersIds) => [...openFoldersIds, id]);
    }
  };

  const findAndSetOpenFolders = (arr) => {
    arr.forEach((bookmark) => {
      if (bookmark.children) {
        if (openFoldersIds.includes(bookmark.id)) {
          setOpenFolders((openFolders) => [...openFolders, <Column callback={updateOpenFoldersIds} bookmarks={bookmark.children} />]);
        }
        return findAndSetOpenFolders(bookmark.children);
      }
    });
  };

  return <div className="columns">{openFolders}</div>;
};

const Column = (props) => {
  return (
    <div className="column">
      {props.bookmarks.map((bookmark) => (
        <Bookmark callback={props.callback} id={bookmark.id} url={bookmark.url}>
          {bookmark.title}
        </Bookmark>
      ))}
    </div>
  );
};

const Bookmark = (props) => {
  const onClick = () => {
    return props.callback(props.id);
  };

  return (
    <div className="bookmark">
      <a href={props.url} onClick={() => onClick()}>
        {props.children}
      </a>
    </div>
  );
};

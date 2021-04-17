import React from 'react';
import { Bookmark } from './Bookmark';
import { Folder } from './Folder';

export const Column = (props) => {
  const returnBookmarks = () => {
    const bookmarksArr = props.bookmarks.map((bookmark) => {
      if (bookmark.children) {
        return <Folder callback={props.callback} folder={bookmark} key={bookmark.id} openFoldersIds={props.openFoldersIds} />;
      } else {
        return <Bookmark bookmark={bookmark} key={bookmark.id} />;
      }
    });
    return bookmarksArr;
  };

  const returnEmptyState = () => {
    return (
      <div className="column-item empty">
        <div className="column-item-title">This folder is empty</div>
      </div>
    );
  };

  return <div className="column">{props.bookmarks.length > 0 ? returnBookmarks() : returnEmptyState()}</div>;
};

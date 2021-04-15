/* global chrome */
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    chrome.bookmarks.getTree((tree) => {
      setBookmarks(tree[0].children);
    });
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) console.log(bookmarks);
    if (bookmarks[0]) console.log(bookmarks[0].children);
  }, [bookmarks]);

  return (
    <div className="cols">
      <Column bookmarks={bookmarks} />
      {bookmarks[0] ? <Column bookmarks={bookmarks[0].children} /> : ''}
    </div>
  );
};

const Column = (props) => {
  return (
    <div className="col">
      {props.bookmarks.map((bookmark) => (
        <Link url={bookmark.url}>{bookmark.title}</Link>
      ))}
    </div>
  );
};

const Link = (props) => {
  return (
    <div className="bkm">
      <a href={props.url}>{props.children}</a>
    </div>
  );
};

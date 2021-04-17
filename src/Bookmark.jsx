import React from 'react';

export const Bookmark = ({ bookmark }) => {
  const faviconStyle = {
    backgroundImage: `url(http://www.google.com/s2/favicons?domain=${bookmark.url})`,
  };

  return (
    <a href={bookmark.url}>
      <div className="column-item bookmark">
        <div className="column-item-icon" style={faviconStyle}></div>
        <div className="column-item-title">{bookmark.title}</div>
      </div>
    </a>
  );
};

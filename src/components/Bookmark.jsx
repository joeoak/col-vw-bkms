import React, { useEffect, useRef } from 'react';

const Bookmark = ({ bookmark, columnObj, rootObj }) => {
  useEffect(() => {
    if (columnObj.isColumnFocused && columnObj.currentFocus === bookmark.index) bookmarkRef.current.focus();
  }, [bookmark, columnObj]);

  const bookmarkRef = useRef();

  const faviconStyle = {
    backgroundImage: `url(chrome://favicon/${bookmark.url})`,
  };

  const handleOnFocus = () => {
    columnObj.setCurrentFocus(bookmark.index);
    rootObj.setFocusColumn(columnObj.columnIndex);
  };

  const handleSelect = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      columnObj.updateCurrentFocus(bookmark.index, e.key);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (columnObj.columnIndex >= 0) rootObj.setFocusColumn(columnObj.columnIndex - 1);
    }
    if (e.key === 'Backspace') {
      rootObj.removeNode(bookmark);
    }
  };

  return (
    <a
      className='column-item bookmark' // prettier ignore
      href={bookmark.url}
      onFocus={handleOnFocus}
      onKeyDown={(e) => handleSelect(e)}
      ref={bookmarkRef}
      tabIndex={0}
    >
      <div className='column-item-icon'>
        <div className='favicon' style={faviconStyle}></div>
      </div>
      <div className='column-item-title'>{bookmark.title}</div>
    </a>
  );
};

export default Bookmark;

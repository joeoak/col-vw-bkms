import React, { useEffect, useRef, useState } from 'react';
import Bookmark from './Bookmark';
import Folder from './Folder';

const Column = ({ columnIndex, isColumnFocused, node, rootObj }) => {
  const [currentFocus, setCurrentFocus] = useState(0);

  useEffect(() => {
    columnRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isColumnFocused && !currentFocus) setCurrentFocus(0);
  }, [isColumnFocused]);

  const columnRef = useRef();

  const returnElements = () => {
    if (node.children.length > 0) {
      return node.children.map((child) => {
        if (child.children) {
          return <Folder columnObj={columnObj} folder={child} key={child.id} rootObj={rootObj} />;
        } else {
          return <Bookmark bookmark={child} columnObj={columnObj} key={child.id} rootObj={rootObj} />;
        }
      });
    } else {
      return (
        <div className='column-item empty'>
          <div className='column-item-title'>This folder is empty</div>
        </div>
      );
    }
  };

  const updateCurrentFocus = (index, key) => {
    if (key === 'ArrowUp') {
      index === 0 ? setCurrentFocus(node.children.length - 1) : setCurrentFocus(index - 1);
    }
    if (key === 'ArrowDown') {
      index === node.children.length - 1 ? setCurrentFocus(0) : setCurrentFocus(index + 1);
    }
  };

  const columnObj = {
    columnIndex: columnIndex,
    currentFocus: currentFocus,
    isColumnFocused: isColumnFocused,
    setCurrentFocus: setCurrentFocus,
    updateCurrentFocus: updateCurrentFocus,
  };

  return (
    <div className='column' ref={columnRef}>
      {returnElements()}
    </div>
  );
};

export default Column;

import React, { useEffect, useRef } from 'react';
import * as Icons from './Icons';

const Folder = ({ columnObj, folder, rootObj }) => {
  useEffect(() => {
    if (columnObj.isColumnFocused && columnObj.currentFocus === folder.index) folderRef.current.focus();
  }, [columnObj, folder]);

  const folderRef = useRef();

  const handleOnFocus = () => {
    columnObj.setCurrentFocus(folder.index);
    rootObj.setFocusColumn(columnObj.columnIndex);
    if (!isSelected) rootObj.openFolderIdsCallback({ id: folder.id, parentId: folder.parentId });
  };

  const handleSelect = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      columnObj.updateCurrentFocus(folder.index, e.key);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (folder.children.length > 0) rootObj.setFocusColumn(columnObj.columnIndex + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (columnObj.columnIndex >= 0) rootObj.setFocusColumn(columnObj.columnIndex - 1);
    }
    if (e.key === 'Backspace') {
      rootObj.removeNode(folder);
    }
  };

  const isSelected = rootObj.openFolderIds.some((obj) => obj.id === folder.id);

  return (
    <div
      className={isSelected ? 'column-item folder selected' : 'column-item folder'} // prettier ignore
      onFocus={handleOnFocus}
      onKeyDown={(e) => handleSelect(e)}
      ref={folderRef}
      tabIndex={0}
    >
      <div className='column-item-icon'>{Icons.Folder}</div>
      <div className='column-item-title'>{folder.title}</div>
      <div className='column-item-icon'>{Icons.Chevron}</div>
    </div>
  );
};

export default Folder;

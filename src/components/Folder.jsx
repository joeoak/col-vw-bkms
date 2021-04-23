import React, { useEffect, useRef, useState } from 'react';
import * as Icons from './Icons';
import TitleInput from './TitleInput';

const Folder = ({ columnObj, folder, rootObj }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (columnObj.isColumnFocused && columnObj.currentFocus === folder.index) folderRef.current.focus();
  }, [columnObj, folder]);

  const folderRef = useRef();

  const handleOnFocus = () => {
    columnObj.setCurrentFocus(folder.index);
    rootObj.setFocusColumn(columnObj.columnIndex);
    if (!isSelected) rootObj.updateOpenFolderIds({ id: folder.id, parentId: folder.parentId });
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
    if (e.key === 'e') {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  const isSelected = rootObj.openFolderIds.some((obj) => obj.id === folder.id);

  const renameCallback = (newTitle) => {
    if (newTitle !== folder.title) rootObj.renameNode(folder, newTitle);
    setIsEditing(false);
  };

  return (
    <div
      className={isSelected ? 'column-item folder selected' : 'column-item folder'} // prettier ignore
      onFocus={handleOnFocus}
      onKeyDown={(e) => (!isEditing ? handleSelect(e) : '')}
      ref={folderRef}
      tabIndex={0}
    >
      <div className='column-item-icon'>{Icons.Folder}</div>
      <div className='column-item-title'>{isEditing ? <TitleInput placeholder={folder.title} renameCallback={renameCallback} /> : folder.title}</div>
      <div className='column-item-icon'>{Icons.Chevron}</div>
    </div>
  );
};

export default Folder;

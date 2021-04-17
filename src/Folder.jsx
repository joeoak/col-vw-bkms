import React from 'react';
import * as Icons from './Icons'

export const Folder = ({ callback, folder, openFoldersIds }) => {
  const onClick = () => {
    return callback({ id: folder.id, parentId: folder.parentId });
  };

  const isSelected = () => {
    return openFoldersIds.some((obj) => obj.id === folder.id);
  };

  return (
    <div className={isSelected() ? 'column-item folder selected' : 'column-item folder'} onClick={() => onClick()} tabIndex="0">
      <div className="column-item-icon">{Icons.Folder}</div>
      <div className="column-item-title">{folder.title}</div>
      <div className="column-item-icon">{Icons.Chevron}</div>
    </div>
  );
};

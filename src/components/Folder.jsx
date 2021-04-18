import React, { useCallback, useEffect, useRef } from 'react';
import * as Icons from './Icons';

export const Folder = ({ folder, columnObj, rootObj }) => {
	const folderRef = useRef();

	const handleSelect = useCallback(
		(e) => {
			columnObj.setFocus(folder.index);
			if (e.type === 'click') {
				rootObj.setFocusColumn(columnObj.columnIndex);
				if (!isSelected()) rootObj.openFolderIdsCallback({ id: folder.id, parentId: folder.parentId });
			}
			if (e.key === 'ArrowRight') {
				if (folder.children.length > 0) rootObj.setFocusColumn(columnObj.columnIndex + 1);
				if (!isSelected()) rootObj.openFolderIdsCallback({ id: folder.id, parentId: folder.parentId });
			}
			if (e.key === 'ArrowLeft') {
				if (columnObj.columnIndex >= 0) rootObj.setFocusColumn(columnObj.columnIndex - 1);
			}
		},
		[columnObj, folder, rootObj]
	);

	// const handleSelect = useCallback(() => {
	// 	columnObj.setFocus(folder.index);
	// }, [folder, columnObj]);

	const isSelected = () => {
		return rootObj.openFolderIds.some((obj) => obj.id === folder.id);
	};

	useEffect(() => {
		if (columnObj.isFocus && columnObj.focus) {
      folderRef.current.focus();
      if (!isSelected()) rootObj.openFolderIdsCallback({ id: folder.id, parentId: folder.parentId });
    }
	}, [columnObj]);

	return (
		<div className={isSelected() ? 'column-item folder selected' : 'column-item folder'} onClick={(e) => handleSelect(e)} onKeyDown={(e) => handleSelect(e)} ref={folderRef} tabIndex={columnObj.isFocus && columnObj.focus ? 0 : -1}>
			<div className='column-item-icon'>{Icons.Folder}</div>
			<div className='column-item-title'>{folder.title}</div>
			<div className='column-item-icon'>{Icons.Chevron}</div>
		</div>
	);
};

import React from 'react';
import * as Icons from './Icons';

export const Folder = ({ folder, rootObj }) => {
	const isSelected = () => {
		return rootObj.openFolderIds.some((obj) => obj.id === folder.id);
	};

	const handleOnClick = () => {
		return rootObj.openFolderIdsCallback({ id: folder.id, parentId: folder.parentId });
	};

	return (
		<div className={isSelected() ? 'column-item folder selected' : 'column-item folder'} onClick={() => handleOnClick()} tabIndex='0'>
			<div className='column-item-icon'>{Icons.Folder}</div>
			<div className='column-item-title'>{folder.title}</div>
			<div className='column-item-icon'>{Icons.Chevron}</div>
		</div>
	);
};

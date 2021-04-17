import React from 'react';
import * as Icons from './Icons';

export const Folder = ({ callback, contextMenuCallback, folder, openFoldersIds }) => {
	const isSelected = () => {
		return openFoldersIds.some((obj) => obj.id === folder.id);
	};

	const onClick = () => {
		return callback({ id: folder.id, parentId: folder.parentId });
	};

	const onContextMenu = (e) => {
		e.preventDefault();
		let coordinates = { x: e.pageX, y: e.pageY, title: 'whatyousay' };
		return contextMenuCallback(coordinates);
	};

	return (
		<div className={isSelected() ? 'column-item folder selected' : 'column-item folder'} onClick={() => onClick()} onContextMenu={(e) => onContextMenu(e)} tabIndex='0'>
			<div className='column-item-icon'>{Icons.Folder}</div>
			<div className='column-item-title'>{folder.title}</div>
			<div className='column-item-icon'>{Icons.Chevron}</div>
		</div>
	);
};

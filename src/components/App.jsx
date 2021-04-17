/* global chrome */
import React, { useEffect, useState } from 'react';
import { Column } from './Column';
import { ContextMenu } from './ContextMenu';
import { fakeTree } from './fakeTree';
import './App.scss';

export const App = () => {
	const [bookmarks, setBookmarks] = useState([]);
	const [openFolders, setOpenFolders] = useState([]);
	const [openFoldersIds, setOpenFoldersIds] = useState([{ id: '0', parentId: null }]);
	const [contextMenuCoordinates, setContextMenuCoordinates] = useState({});

	useEffect(() => {
		// chrome.bookmarks.getTree((tree) => {
		//   setBookmarks(tree);
		// });
		setBookmarks(fakeTree);
	}, []);

	const findAndSetOpenFolders = (arr) => {
		arr.forEach((bookmark) => {
			if (bookmark.children) {
				if (openFoldersIds.some((obj) => obj.id === bookmark.id)) {
					setOpenFolders((openFolders) => [...openFolders, <Column callback={updateOpenFoldersIds} contextMenuCallback={updateContextMenu} bookmarks={bookmark.children} key={bookmark.id} openFoldersIds={openFoldersIds} />]);
				}
				return findAndSetOpenFolders(bookmark.children);
			}
		});
	};

	const updateContextMenu = (msg) => {
		return setContextMenuCoordinates(msg);
	};

	const updateOpenFolders = () => {
		setOpenFolders([]);
		return findAndSetOpenFolders(bookmarks);
	};

	const updateOpenFoldersIds = (folderObj) => {
		if (!openFoldersIds.some((obj) => obj.id === folderObj)) {
			let newArr = [folderObj];
			let targetFolder = folderObj;
			let findParentFolder = (parentId) => openFoldersIds.find((obj) => obj.id === parentId);

			while (targetFolder.id !== '0') {
				let parentFolder = findParentFolder(targetFolder.parentId);
				newArr.unshift(parentFolder);
				targetFolder = parentFolder;
			}

			setOpenFoldersIds(newArr);
		}
	};

	useEffect(() => {
		if (bookmarks.length > 0) updateOpenFolders();
		// eslint-disable-next-line
	}, [bookmarks]);

	useEffect(() => {
		updateOpenFolders();
		// eslint-disable-next-line
	}, [openFoldersIds]);

	const onClick = () => {
		return setContextMenuCoordinates({ x: '0px', y: '0px', msg: '' });
	};

	return (
		<>
			{/* <ContextMenu coordinates={contextMenuCoordinates} /> */}
			<div className='columns' onClick={() => onClick()}>
				{openFolders}
			</div>
		</>
	);
};

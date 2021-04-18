/* global chrome */
import React, { useEffect, useState } from 'react';
import { Column } from './Column';
import { fakeTree } from './fakeTree';
import './App.scss';

export const App = () => {
	const [bookmarkTree, setBookmarkTree] = useState([]);
	const [openFolderElements, setOpenFolderElements] = useState([]);
	const [openFolderIds, setOpenFolderIds] = useState([{ id: '0', parentId: null }]);

	const findAndSetOpenFolders = (arr) => {
		arr.forEach((node) => {
			if (node.children) {
				if (openFolderIds.some((obj) => obj.id === node.id)) {
					setOpenFolderElements((openFolderElements) => [...openFolderElements, <Column node={node} rootObj={rootObj} key={node.id} />]);
				}
				return findAndSetOpenFolders(node.children);
			}
		});
	};

	const updateOpenFolderIds = (folderObj) => {
		if (!openFolderIds.some((obj) => obj.id === folderObj)) {
			const findParentFolder = (parentId) => openFolderIds.find((obj) => obj.id === parentId);
			let newOpenFolderIds = [folderObj];
			let targetFolder = folderObj;
			let parentFolder;
			while (targetFolder.id !== '0') {
				parentFolder = findParentFolder(targetFolder.parentId);
				newOpenFolderIds.unshift(parentFolder);
				targetFolder = parentFolder;
			}
			setOpenFolderIds(newOpenFolderIds);
		}
	};

	const rootObj = {
		openFolderIdsCallback: updateOpenFolderIds,
		openFolderIds: openFolderIds,
	};

	useEffect(() => {
		// chrome.bookmarks.getTree((tree) => {
		//   setBookmarkTree(tree);
		// });
		setBookmarkTree(fakeTree);
	}, []);

	useEffect(() => {
		if (bookmarkTree.length > 0) {
			setOpenFolderElements([]);
			return findAndSetOpenFolders(bookmarkTree);
		}
		// eslint-disable-next-line
	}, [bookmarkTree]);

	useEffect(() => {
		setOpenFolderElements([]);
		return findAndSetOpenFolders(bookmarkTree);
		// eslint-disable-next-line
	}, [openFolderIds]);

	return (
		<>
			<div className='app-header'>Bookmarks</div>
			<div className='columns'>{openFolderElements}</div>
		</>
	);
};

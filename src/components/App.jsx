/* global chrome */
import React, { useEffect, useState } from 'react';
import { fakeTree } from '../fakeTree';
import Column from './Column';
import './App.scss';

const App = () => {
	const [bookmarkTree, setBookmarkTree] = useState([]);
	const [focusColumn, setFocusColumn] = useState(0);
	const [openFolderElements, setOpenFolderElements] = useState([]);
	const [openFolderIds, setOpenFolderIds] = useState([{ id: '0', parentId: null }]);

	useEffect(() => {
		chrome.bookmarks.getTree((tree) => {
			setBookmarkTree(tree);
		});
		// setBookmarkTree(fakeTree);
		getOpenFolderIdsLocalStorage();
	}, []);

	useEffect(() => {
		if (bookmarkTree.length > 0) {
			setOpenFolderElements([]);
			findAndSetOpenFolders(bookmarkTree);
		}
		// eslint-disable-next-line
	}, [bookmarkTree, focusColumn, openFolderIds]);

	const findAndSetOpenFolders = (arr) => {
		arr.forEach((node) => {
			if (node.children) {
				if (openFolderIds.some((obj) => obj.id === node.id)) {
					setOpenFolderElements((openFolderElements) => [
						...openFolderElements,
						<Column
							columnIndex={openFolderElements.length} // prettier ignore
							isColumnFocused={openFolderElements.length === focusColumn}
							node={node}
							rootObj={rootObj}
							key={node.id}
						/>,
					]);
				}
				findAndSetOpenFolders(node.children);
			}
		});
	};

	const getOpenFolderIdsLocalStorage = () => {
		let openFolderIdsLocalStorage = JSON.parse(window.localStorage.getItem('columnViewBookmarks-openFolderIds'));
		if (openFolderIdsLocalStorage) return setOpenFolderIds(openFolderIdsLocalStorage);
	};

	const setOpenFolderIdsLocalStorage = (newOpenFolderIds) => {
		window.localStorage.setItem('columnViewBookmarks-openFolderIds', JSON.stringify(newOpenFolderIds));
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
			setOpenFolderIdsLocalStorage(newOpenFolderIds);
			setOpenFolderIds(newOpenFolderIds);
		}
	};

	const rootObj = {
		focusColumn: focusColumn,
		setFocusColumn: setFocusColumn,
		openFolderIds: openFolderIds,
		openFolderIdsCallback: updateOpenFolderIds,
	};

	return (
		<>
			<div className='app-header'>Column View Bookmarks</div>
			<div className='columns'>{openFolderElements}</div>
		</>
	);
};

export default App;

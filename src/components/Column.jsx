import React, { useEffect, useRef } from 'react';
import { Bookmark } from './Bookmark';
import { Folder } from './Folder';

export const Column = (props) => {
	useEffect(() => {
		columnRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const returnBookmarks = () => {
		const bookmarksArr = props.bookmarks.map((bookmark) => {
			if (bookmark.children) {
				return <Folder callback={props.callback} contextMenuCallback={props.contextMenuCallback} folder={bookmark} key={bookmark.id} openFoldersIds={props.openFoldersIds} />;
			} else {
				return <Bookmark contextMenuCallback={props.contextMenuCallback} bookmark={bookmark} key={bookmark.id} />;
			}
		});
		return bookmarksArr;
	};

	const returnEmptyState = () => {
		return (
			<div className='column-item empty'>
				<div className='column-item-title'>This folder is empty</div>
			</div>
		);
	};

	const columnRef = useRef();

	return (
		<div className='column' ref={columnRef}>
			{props.bookmarks.length > 0 ? returnBookmarks() : returnEmptyState()}
		</div>
	);
};

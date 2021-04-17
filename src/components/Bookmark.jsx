import React from 'react';

export const Bookmark = ({ contextMenuCallback, bookmark }) => {
	const faviconStyle = {
		backgroundImage: `url(http://www.google.com/s2/favicons?domain=${bookmark.url})`,
	};

	const onContextMenu = (e) => {
		e.preventDefault();
		let coordinates = { x: e.pageX, y: e.pageY, title: 'yomamasofat' };
		return contextMenuCallback(coordinates);
	};

	return (
		<a className='column-item bookmark' href={bookmark.url} onContextMenu={(e) => onContextMenu(e)}>
			<div className='column-item-icon' style={faviconStyle}></div>
			<div className='column-item-title'>{bookmark.title}</div>
		</a>
	);
};

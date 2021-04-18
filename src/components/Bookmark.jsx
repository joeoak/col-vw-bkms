import React from 'react';

export const Bookmark = ({ bookmark }) => {
	const faviconStyle = {
		backgroundImage: `url(http://www.google.com/s2/favicons?domain=${bookmark.url})`,
	};

	return (
		<a className='column-item bookmark' href={bookmark.url}>
			<div className='column-item-icon'><div className='favicon' style={faviconStyle}></div></div>
			<div className='column-item-title'>{bookmark.title}</div>
		</a>
	);
};

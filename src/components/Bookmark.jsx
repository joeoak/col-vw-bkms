import React, { useCallback, useEffect, useRef } from 'react';

export const Bookmark = ({ bookmark, columnObj, rootObj }) => {
	const bookmarkRef = useRef();

	const faviconStyle = {
		backgroundImage: `url(https://www.google.com/s2/favicons?domain=${bookmark.url})`,
	};

	const handleSelect = useCallback((e) => {
		columnObj.setFocus(bookmark.index);
		rootObj.setFocusColumn(columnObj.columnIndex);
		if (e.key === 'ArrowLeft') {
			if (columnObj.columnIndex >= 0) rootObj.setFocusColumn(columnObj.columnIndex - 1);
		}
	}, [columnObj, bookmark, rootObj]);

	useEffect(() => {
		if (columnObj.isFocus && columnObj.focus) bookmarkRef.current.focus();
	}, [columnObj]);

	return (
		<a className='column-item bookmark' href={bookmark.url} onClick={(e) => handleSelect(e)} onKeyDown={(e) => handleSelect(e)} ref={bookmarkRef} tabIndex={columnObj.isFocus && columnObj.focus ? 0 : -1}>
			<div className='column-item-icon'>
				<div className='favicon' style={faviconStyle}></div>
			</div>
			<div className='column-item-title'>{bookmark.title}</div>
		</a>
	);
};

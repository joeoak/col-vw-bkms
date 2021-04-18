import React, { useEffect, useRef } from 'react';
import { Bookmark } from './Bookmark';
import { Folder } from './Folder';

export const Column = ({ node, rootObj }) => {
	useEffect(() => {
		columnRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const columnRef = useRef();

	const returnElements = () => {
		const elements = node.children.map((child) => {
			if (child.children) {
				return <Folder folder={child} key={child.id} rootObj={rootObj} />;
			} else {
				return <Bookmark bookmark={child} key={child.id} />;
			}
		});
		return elements;
	};

	const returnEmptyMessage = () => {
		return (
			<div className='column-item empty'>
				<div className='column-item-title'>This folder is empty</div>
			</div>
		);
	};

	return (
		<div className='column' ref={columnRef}>
			{node.children.length > 0 ? returnElements() : returnEmptyMessage()}
		</div>
	);
};

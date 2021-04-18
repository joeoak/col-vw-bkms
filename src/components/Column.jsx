import React, { useEffect, useRef } from 'react';
import { Bookmark } from './Bookmark';
import { Folder } from './Folder';
import { useRoveFocus } from './useRoveFocus';

export const Column = ({ columnIndex, node, rootObj }) => {
	const [focus, setFocus] = useRoveFocus(node.children.length);

	const columnRef = useRef();

	const returnColumnObj = (index) => {
		const columnObj = {
			columnIndex: columnIndex,
      folderIndex: node.index,
			focus: focus === index,
			isFocus: rootObj.focusColumn === columnIndex ? true : false,
			setFocus: setFocus,
		};
		return columnObj;
	};

	const returnElements = () => {
		const elements = node.children.map((child) => {
			if (child.children) {
				return <Folder columnObj={returnColumnObj(child.index)} folder={child} key={child.id} rootObj={rootObj} />;
			} else {
				return <Bookmark bookmark={child} columnObj={returnColumnObj(child.index)} key={child.id} rootObj={rootObj} />;
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

	useEffect(() => {
		columnRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div className='column' ref={columnRef}>
			{node.children.length > 0 ? returnElements() : returnEmptyMessage()}
		</div>
	);
};

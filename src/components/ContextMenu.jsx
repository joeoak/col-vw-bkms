import React from 'react';

export const ContextMenu = (props) => {
	const contextMenuStyle = {
		position: 'fixed',
		top: props.coordinates.y,
		left: props.coordinates.x,
		zIndex: 1000,
		backgroundColor: 'pink',
	};

	return (
		<div className='context-menu' style={contextMenuStyle}>
			{props.coordinates.title}
      <div onClick={() => alert('showmethemoney')}>Click me!</div>
		</div>
	);
};

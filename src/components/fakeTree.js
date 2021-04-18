const levelFour = (parentId) => {
	return [
		{
			children: [],
			id: '10',
			parentId: parentId,
			title: 'Airbnb',
			url: 'https://www.airbnb.com',
		},
		{
			id: '11',
			parentId: parentId,
			title: 'Airbnb',
			url: 'https://www.airbnb.com',
		},
		{
			id: '12',
			parentId: parentId,
			title: 'Airbnb',
			url: 'https://www.airbnb.com',
		},
	];
};

const levelThree = (parentId) => {
	return [
		{
			children: levelFour('7'),
			id: '7',
			parentId: parentId,
			title: 'Airbnb',
			url: 'https://www.airbnb.com',
		},
		{
			id: '8',
			parentId: parentId,
			title: 'Airbnb',
			url: 'https://www.airbnb.com',
		},
		{
			id: '9',
			parentId: parentId,
			title: 'Airbnb',
			url: 'https://www.airbnb.com',
		},
	];
};

const levelTwo = (parentId) => {
	return [
		{
			children: levelThree('4'),
			id: '4',
			parentId: parentId,
			title: 'Fake folder',
			url: null,
		},
		{
			id: '5',
			parentId: parentId,
			title: 'Facebook',
			url: 'https://www.facebook.com',
		},
		{
			id: '6',
			parentId: parentId,
			title: 'Facebook',
			url: 'https://www.facebook.com',
		},
	];
};

const levelOne = (parentId) => {
	return [
		{
			children: levelTwo('1'),
			id: '1',
			parentId: parentId,
			title: 'Fake folder',
			url: null,
		},
		{
			id: '2',
			parentId: parentId,
			title: 'Google',
			url: 'https://www.google.com',
		},
		{
			id: '3',
			parentId: parentId,
			title: 'Google',
			url: 'https://www.google.com',
		},
	];
};

export const fakeTree = [
	{
		children: levelOne('0'),
		id: '0',
		parentId: null,
		title: null,
		url: null,
	},
];

const levelFive = (parentId) => {
  return [
    {
      children: [],
      id: '13',
      index: 0,
      parentId: parentId,
      title: 'Empty folder',
      url: null,
    },
    {
      id: '14',
      index: 1,
      parentId: parentId,
      title: 'Twitter',
      url: 'https://www.twitter.com',
    },
    {
      id: '15',
      index: 2,
      parentId: parentId,
      title: 'Twitter',
      url: 'https://www.twitter.com',
    },
  ];
};

const levelFour = (parentId) => {
  return [
    {
      children: levelFive('10'),
      id: '10',
      index: 0,
      parentId: parentId,
      title: 'Twitter',
      url: null,
    },
    {
      id: '11',
      index: 1,
      parentId: parentId,
      title: 'Yelp',
      url: 'https://www.yelp.com',
    },
    {
      id: '12',
      index: 2,
      parentId: parentId,
      title: 'Yelp',
      url: 'https://www.yelp.com',
    },
  ];
};

const levelThree = (parentId) => {
  return [
    {
      children: levelFour('7'),
      id: '7',
      index: 0,
      parentId: parentId,
      title: 'Yelp',
      url: null,
    },
    {
      id: '8',
      index: 1,
      parentId: parentId,
      title: 'Airbnb',
      url: 'https://www.airbnb.com',
    },
    {
      id: '9',
      index: 2,
      parentId: parentId,
      title: 'Airbnb',
      url: 'https://www.airbnb.com',
    },
  ];
};

const levelTwo = (parentId) => {
  return [
    {
      id: '4',
      index: 0,
      parentId: parentId,
      title: 'Facebook',
      url: 'https://www.facebook.com',
    },
    {
      children: levelThree('5'),
      id: '5',
      index: 1,
      parentId: parentId,
      title: 'Airbnb',
      url: null,
    },
    {
      id: '6',
      index: 2,
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
      index: 0,
      parentId: parentId,
      title: 'Facebook',
      url: null,
    },
    {
      children: [],
      id: '2',
      index: 1,
      parentId: parentId,
      title: 'Empty folder',
      url: null,
    },
    {
      id: '3',
      index: 2,
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
    index: 0,
    parentId: null,
    title: null,
    url: null,
  },
];

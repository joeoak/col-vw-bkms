const fakeChildrenThree = [
  {
    id: '7',
    parentId: '4',
    title: 'Airbnb',
    url: 'https://www.airbnb.com',
  },
  {
    id: '8',
    parentId: '4',
    title: 'Airbnb',
    url: 'https://www.airbnb.com',
  },
];

const fakeChildrenTwo = [
  {
    children: fakeChildrenThree,
    id: '4',
    parentId: '1',
    title: 'Fake folder',
    url: null,
  },
  {
    id: '5',
    parentId: '1',
    title: 'Very very very very very very very very long title',
    url: 'https://www.facebook.com',
  },
  {
    id: '6',
    parentId: '1',
    title: 'Facebook',
    url: 'https://www.facebook.com',
  },
];

const fakeChildrenOne = [
  {
    children: fakeChildrenTwo,
    id: '1',
    parentId: '0',
    title: 'Fake folder',
    url: null,
  },
  {
    id: '2',
    parentId: '0',
    title: 'Google',
    url: 'https://www.google.com',
  },
  {
    id: '3',
    parentId: '0',
    title: 'Google',
    url: 'https://www.google.com',
  },
];

export const fakeTree = [
  {
    children: fakeChildrenOne,
    id: '0',
    parentId: null,
    title: null,
    url: null,
  },
];

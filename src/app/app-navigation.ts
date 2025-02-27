export const navigation = [
  {
    text: 'Dash Board',
    path: '/dash',
    icon: 'mediumiconslayout'
  },
  {
    text: 'Shops',
    icon: 'home',
    items: [
      // { text: 'Accounts', path: '/accounts' },
      { text: 'Shop List', path: '/shops' },
      { text: 'Shop Locations', path: '/shops/locations' },
      // { text: 'Multi Shop Note', path: '/shops/multi/notes' },
      // { text: 'Advanced Search', path: '/search/shop' }
    ]
  },
  {
    text: 'Insurers',
    icon: 'car',
    items: [
      {
        text: 'Manager List',
        path: '/managers'
      },
      {
        text: 'Open Marketing Efforts',
        path: '/managers/efforts'
      },
      // {
      //   text: 'Advanced Search',
      //   path: '/search/manager'
      // }
    ]
  },
  {
    text: 'Reports',
    icon: 'chart',
    items: [
      {
        text: 'Shop Health Scores',
        path: '/reports/shs'
      }
    ]
  },
  // {
  //   text: 'Vendors',
  //   icon: 'link',
  //   items: [
  //     {
  //       text: 'Vendor List',
  //       path: '/vendors'
  //     },
  //     {
  //       text: 'Advanced Search',
  //       path: '/search/vendor'
  //     }
  //   ]
  // }
];

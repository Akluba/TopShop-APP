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
      {
        text: 'Accounts',
        path: '/accounts'
      },
      {
        text: 'Shop List',
        path: '/shops'
      },
      {
        text: 'Advanced Search',
        path: '/search/shop'
      },
      {
        text: 'Multi Shop Note',
        path: '/shops/multi/notes'
      }
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
        text: 'Advanced Search',
        path: '/search/manager'
      }
    ]
  },
  {
    text: 'Vendors',
    icon: 'link',
    items: [
      {
        text: 'Vendor List',
        path: '/vendors'
      },
      {
        text: 'Advanced Search',
        path: '/search/vendor'
      }
    ]
  }
];

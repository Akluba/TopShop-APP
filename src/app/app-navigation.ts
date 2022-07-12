export const navigation = [
  {
    text: 'Dash Board',
    path: '/dash',
    icon: 'mediumiconslayout'
  },
  {
    text: 'Members',
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
      },
      {
        text: 'Custom Fields',
        path: '/setup/shop'
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
      },
      {
        text: 'Custom Fields',
        path: '/setup/manager'
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
      },
      {
        text: 'Custom Fields',
        path: '/setup/vendor'
      }
    ]
  }
  // {
  //   text: 'Home',
  //   path: '/home',
  //   icon: 'home'
  // },
  // {
  //   text: 'Examples',
  //   icon: 'folder',
  //   items: [
  //     {
  //       text: 'Profile',
  //       path: '/profile'
  //     },
  //     {
  //       text: 'Tasks',
  //       path: '/tasks'
  //     }
  //   ]
  // }
];

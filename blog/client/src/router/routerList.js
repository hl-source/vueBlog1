const routerList = [
  { path: '/', name: 'Home', chName : '首页' },
  { path: '/Blog/:id', name: 'Blog' , chName : '博客' },
  { path: '/Message', name: 'Message', chName : '留言'  },
  { path: '/Diary', name: 'Diary', chName : '日记'  },
  { path: '/Links', name: 'Links', chName : '友链'  },
  { path: '/About', name: 'About', chName : '关于'  },
  { path: '/Article/:_id', name: 'Article', chName : '文章'  },
  { path: '*', name: '404', chName : '404'},
];
export default routerList;

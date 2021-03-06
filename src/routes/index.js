export default {
  childRoutes: [
    {
      path: '/',
      component: require('../containers/index').default,
      indexRoute: {
        component: require('../containers/Post').PostListPage,
      },
      childRoutes: [
        {
          path: 'posts',
          getComponent(nextState, cb) {
            cb(null, require('../containers/Post').PostListPage)
          },
        },
        {
          path: 'post/:id',
          getComponent(nextState, cb) {
            cb(null, require('../containers/Post').PostPage)
          },
        },
        {
          path: 'archives',
          getComponent(nextState, cb) {
            cb(null, require('../containers/Archive').ArchivePage)
          },
        },
        {
          path: 'about',
          getComponent(nextState, cb) {
            cb(null, require('../containers/About').AboutPage)
          },
        },
      ],
    },
  ],
}

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://api.iamsuperman.cn'   // 生产环境的api地址
    : 'http://api.iamsuperman.cn'

export const API_CATEGORIES = '/categories'
export const API_TAGS = '/tags'
export const API_ADD_COMMENT = '/comments'
export const API_GET_COMMENTS_POST_ID = '/comments/post/:id'
export const API_POSTS = '/posts'
export const API_LAST_POSTS = '/posts/list/last'
export const API_POST_BY_ID = '/posts/:id'
export const API_ADD_VISIT_COUNT = '/posts/:id'
export const API_ABOUT = '/about'

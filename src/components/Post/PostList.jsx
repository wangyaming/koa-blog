import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { format } from 'date-fns'
import _ from 'lodash'
import {
  Pagination,
  Loading,
} from '../common'
import { CONF_DATE } from '../../constants/Conf'
import {
  PAGE,
  PAGE_SIZE
} from '../../constants/Pagination'

const propTypes = {
  fetchPosts: PropTypes.func,
}

class PostList extends Component {
  constructor(props) {
    super(props);
    const params = {
      ...props.location.query,
      ...{
        page: PAGE,
        pageSize: PAGE_SIZE,
        total: 0,
      }
    }

    this.state = {
      params,
      posts: [],
      loading: true,
    }
  }

  componentWillMount() {
    this.loadPostData()
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps.location
    if (_.isEqual(query, this.props.location.query)) {
      let nextParams = {
        ...this.state.params,
        ...{
          word: query.word,
        }
      }

      this.setState({
        params: nextParams,
      })
      this.loadPostData(nextParams)
    }
  }

  loadPostData = (params = this.state.params) => {
    const { fetchPosts } = this.props
    const nextParams = _.omit(params, 'total')
    fetchPosts && fetchPosts(nextParams)
      .then((response) => {
        this.setState({
          params: response.page,
          posts: response.items,
          loading: false,
        })
      })
      .catch(err => console.error(err))
  }

  handlePaginationChange = (page) => {
    const nextParams = { ...this.state.params, page }
    this.loadPostData(nextParams)
  }

  renderPost() {
    const { posts } = this.state
    return posts.map(post => (
      <div className="post" key={post._id}>
        <h1 className="post-title">
          <Link to={{ pathname: `post/${post._id}` }}>
            {post.title}
          </Link>
        </h1>
        <div className="post-meta">
          {format(post.createTime, CONF_DATE)}
        </div>
        <div className="post-content">
          <p>
            {post.desc}
          </p>
        </div>
        <p className="readmore">
          <Link to={{ pathname: `post/${post._id}` }}>
            阅读全文
          </Link>
        </p>
      </div>
    ))
  }

  renderPagination() {
    const { page, total } = this.state.params
    return (
      <Pagination
        page={page}
        total={total}
        onChange={this.handlePaginationChange}
      />
    )
  }

  render() {
    const { loading } = this.state
    if (loading) {
      return <Loading />
    }
    return (
      <div className="content_container">
        {this.renderPost()}
        {this.renderPagination()}
      </div>
    )
  }
}

PostList.propTypes = propTypes
export default PostList

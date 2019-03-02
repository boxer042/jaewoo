import React, { Component, Fragment } from 'react';
import type { State } from 'store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostsActions } from 'store/actionCreators';
import PostComments from './../../components/post/PostComments/PostComments';

class PostCommentsContainer extends Component {
  render() {
    const {
      comments,
    } = this.props;

    return (
      <Fragment>
        <PostComments
          comments={comments}
        />
      </Fragment>
    );
  }
}

export default connect(
  (state: State) => ({
    comments: state.posts.comments,
    commentsCount: state.posts.post && state.posts.post.comments_count,
  }),
  () => ({}),
)(withRouter(PostCommentsContainer));
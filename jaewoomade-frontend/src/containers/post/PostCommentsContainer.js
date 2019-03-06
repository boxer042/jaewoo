import React, { Component, Fragment } from 'react';
import type { State } from 'store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostsActions } from 'store/actionCreators';
import PostComments from 'components/post/PostComments/PostComments';
import PostCommentInput from 'components/post/PostCommentInput/PostCommentInput';

class PostCommentsContainer extends Component {
  onWriteComment = async (text: string, replyTo: ?string, parentId?: ?string) => {
    const { postId } = this.props;
    if (!postId) return Promise.resolve();
    let comment = null;
    try {
      comment = await PostsActions.writeComment({
        postId,
        text,
        replyTo,
      });
      if (replyTo) {
        await this.onReadReplies(replyTo, parentId);
      } else {
        await PostsActions.readComments({ postId });
      }
    } catch (e) {
      console.log(e);
    }
    return comment;
  };

  initialize = async () => {
    const { postId } = this.props;
    if (!postId) return;
    try {
      await PostsActions.readComments({ postId });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.postId !== this.props.postId) {
      this.initialize();
    }
  }

  onReadReplies = (commentId: string, parentId?: ?string) => {
    const { postId } = this.props;
    if (!postId) return Promise.resolve(null);
    return PostsActions.readSubcomments({
      postId,
      commentId,
      parentId,
    });
  };

  render() {
    const {
      comments,
      subcommentsMap,
      username,
      commentsCount,
      logged,
    } = this.props;

    return (
      <Fragment>
        <PostComments
          logged={logged}
          commentInput={logged && <PostCommentInput onWriteComment={this.onWriteComment} />}
          comments={comments}
          subcommentsMap={subcommentsMap}
          onReply={this.onWriteComment}
          onReadReplies={this.onReadReplies}
          username={username}
          commentsCount={commentsCount || 0}
        />
      </Fragment>
    );
  }
}

export default connect(
  (state: State) => ({
    logged: !!state.user.user,
    postId: state.posts.post && state.posts.post.id,
    comments: state.posts.comments,
    commentsCount: state.posts.post && state.posts.post.comments_count,
    subcommentsMap: state.posts.subcommentsMap,
    username: state.user.user && state.user.user.username,
  }),
  () => ({}),
)(withRouter(PostCommentsContainer));
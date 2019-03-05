import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { ListingActions } from 'store/actionCreators';

class UserPosts extends Component {
  initialize = async () => {
    const { username } = this.props;
    ListingActions.getUserPosts({
      username,
    });
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <div>{this.props.username}님이</div>
        {posts && posts.map((post) => {
          return <div>{post.title}</div>;
        })}
      </div>
    );
  }
}

export default connect(
  ({ listing, pender }) => ({
    posts: listing.user.posts,
  }),
  () => ({}),
)(UserPosts);
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { ListingActions, ProfileActions } from 'store/actionCreators';
import UserPostCardList from 'components/user/UserPostCardList';
import { getScrollBottom, preventStickBottom } from 'lib/common';
import throttle from 'lodash/throttle';

class UserPosts extends Component {
  prevCursor: ?string = null;

  state = {
    loading: false,
  };

  initialize = async () => {
    const { username, tag } = this.props;
    ListingActions.clearUserPosts();
    this.setState({ loading: true });
    if (tag) {
      try {
        await ProfileActions.getTagInfo(tag);
      } catch (e) {
        this.setState({ loading: false });
        console.log(e);
      }
    }
    const { rawTagName } = this.props;
    try {
      await ListingActions.getUserPosts({
        username,
        tag: tag ? rawTagName || undefined : undefined,
      });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
    this.prefetch();
  }

  componentDidMount() {
    this.initialize();
    this.listenScroll();
  }
  componentWillUnmount() {
    this.unlistenScroll();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tag !== this.props.tag || prevProps.profile !== this.props.profile) {
      this.initialize();
    }
  }

  prefetch = async () => {
    const { prefetched, hasEnded, posts, prefetching, loading, username, tag } = this.props;
    if (prefetched) {
      ListingActions.revealPrefetched('user');
      await Promise.resolve(); // next tick
    }
    if (hasEnded || prefetching || loading || !posts || posts.length === 0) return;
    const lastId = posts[posts.length - 1].id;
    if (this.prevCursor === lastId) return;
    this.prevCursor = lastId;
    try {
      await ListingActions.prefetchUserPosts({
        username,
        tag,
        cursor: lastId,
      });
      preventStickBottom();
    } catch (e) {
      console.log(e);
    }
  };

  onScroll = throttle(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom > 1000) return;
    this.prefetch();
  }, 100);

  listenScroll = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  unlistenScroll = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  render() {
    const { prefetching, loading, posts } = this.props;

    if (!posts) {
      // TODO: Show placeholder
      return <UserPostCardList.Placeholder />;
    }

    return (
      <Fragment>
         <UserPostCardList posts={posts} username={this.props.username} />
      </Fragment>
    );
  }
}

export default connect(
  ({ listing, pender, profile }) => ({
    posts: listing.user.posts,
    prefetched: listing.user.prefetched,
    hadEnded: listing.user.end,
    prefetching: pender.pending['listing/PREFETCH_USER_POSTS'],
    loading: pender.pending['listing/GET_USER_POSTS'] || pender.pending['profile/GET_TAG_INFO'],
    rawTagName: profile.rawTagName,
    currentUsername: listing.user.currentUsername,
    currentTag: listing.user.currentTag,
  }),
  () => ({}),
)(UserPosts);
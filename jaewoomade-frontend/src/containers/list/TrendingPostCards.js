import React, { Component } from 'react';
import PostCardList from 'components/common/PostCardList/PostCardList';
import { connect } from 'react-redux';
import { ListingActions } from 'store/actionCreators';
import throttle from 'lodash/throttle';
import { getScrollBottom, preventStickBottom } from 'lib/common';

class TrendingPostCards extends Component {
  prevCursor = null;

  prefetch = async () => {
    const { posts, prefetching, loading } = this.props;
    if (!posts || posts.length === 0 || prefetching || loading) return;
    const lastId = posts[posts.length - 1].id;
    if (this.props.prefetched) {
      ListingActions.revealPrefetched('trending');
      await Promise.resolve(); // next tick
    }
    if (lastId === this.prevCursor) return;
    this.prevCursor = lastId;
    try {
      await ListingActions.prefetchTrendingPosts(
        (this.props.posts && this.props.posts.length) || 0,
      );
    } catch (e) {
      console.log(e);
    }
    preventStickBottom();
    this.onScroll();
  };

  initialize = async () => {
    if (this.props.posts && this.props.posts.length > 0) {
      // do not fetch post data when already exists
      return;
    }
    try {
      await ListingActions.getTrendingPosts();
      this.prefetch();
    } catch (e) {
      console.log(e);
    }
  };

  onScroll = throttle(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom > 1000) return;
    this.prefetch();
  }, 250);

  listenScroll = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  unlistenScroll = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  componentDidMount() {
    this.initialize();
    this.listenScroll();
  }
  componentWillUnmount() {
    this.unlistenScroll();
  }

  render() {
    return (
      <PostCardList
        posts={this.props.posts}
        loading={this.props.loading}
        prefetching={
          (this.props.prefetched && this.props.prefetched.length > 0) || this.props.prefetching
        }
        width={this.props.width}
        hasEnded={this.props.hasEnded}
      />
    );
  }
}

const mapStateToProps = ({ listing, pender, base }) => ({
  posts: listing.trending.posts,
  prefetched: listing.trending.prefetched,
  prefetching: pender.pending['listing/PREFETCH_TRENDING_POSTS'],
  loading: pender.pending['listing/GET_TRENDING_POSTS'],
  width: base.windowWidth,
  hasEnded: listing.trending.end,
});

export default connect(mapStateToProps, () => ({}))(TrendingPostCards);
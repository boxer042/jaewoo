// @flow
import React, { Component } from 'react';
import PostCardList from 'components/common/PostCardList/PostCardList';
import type { State } from 'store';
import { ListingActions } from 'store/actionCreators';
import type { PostItem } from 'store/modules/listing';
import { connect } from 'react-redux';

type Props = {
  posts: ?(PostItem[]),
  prefetched: ?(PostItem[]),
};

class RecentPostCards extends Component<Props> {
  initialize = async () => {
    try {
      if (this.props.posts && this.props.posts.length > 0) {
        // do not fetch post data when already exists
        return;
      }
      if (!this.props.shouldCancel) {
        await ListingActions.getRecentPosts();
      }
      this.prefetch();
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <PostCardList
        posts={this.props.posts}
      />
    );
  }
}

const mapStateToProps = ({ listing }: State) => ({
  posts: listing.recent.posts,
  prefetched: listing.prefetched,
});

export default connect(mapStateToProps, () => ({}))(RecentPostCards);
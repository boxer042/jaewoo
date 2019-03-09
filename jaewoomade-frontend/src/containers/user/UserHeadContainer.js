import React, { Component } from 'react';
import { FollowActions } from 'store/actionCreators';
import { connect } from 'react-redux';
import UserHead from 'components/user/UserHead';

class UserHeadContainer extends Component {
  initialize = () => {
    const { profile, logged } = this.props;
    if (!profile || !logged) return;
    FollowActions.getUserFollow(profile.id);
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.profile !== this.props.profile) {
      this.initialize();
    }
  }

  componentDidMount() {
    this.initialize();
  }

  onToggleFollow = () => {
    const { profile, followingUsers, followLoading } = this.props;
    if (!profile || followLoading) return;

    const { id } = profile;
    const following = followingUsers[id];

    if (following) {
      FollowActions.unfollowUser(id);
      return;
    }
    FollowActions.followUser(id);
  };

  render() {
    const { profile, username, self, followingUsers } = this.props;

    if (!profile) return <UserHead.Placeholder />;

    const following = followingUsers[profile.id];
    return (
      <UserHead
        username={username}
        profile={profile}
        self={self}
        following={following}
        onToggleFollow={this.onToggleFollow}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    profile: state.profile.profile,
    self: (state.user.user && state.user.user.username) === ownProps.username,
    logged: !!state.user.user,
    followingUsers: state.follow.users,
    followLoading:
      state.pender.pending['follow/FOLLOW_USER'] || state.pender.pending['follower/UNFOLLOW_USER'],
  }),
  () => ({}),
)(UserHeadContainer);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserHead from 'components/user/UserHead';

class UserHeadContainer extends Component {
  render() {
    const { profile, username, self } = this.props;
    if (!profile) return <UserHead.Placeholder />;

    return (
      <UserHead
        username={username}
        profile={profile}
        self={self}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    profile: state.profile.profile,
    self: (state.user.user && state.user.user.username) === ownProps.username,
    logged: !!state.user.user,
  }),
  () => ({}),
)(UserHeadContainer);
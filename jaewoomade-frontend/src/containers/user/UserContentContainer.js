import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import UserContent from 'components/user/UserContent/UserContent';
import UserTagView from 'components/user/UserTagView/UserTagView';
import UserPostsSubpage from 'pages/user/UserPostsSubpage';
import { connect } from 'react-redux';
import { ProfileActions } from 'store/actionCreators';
import type { State } from 'store';
import { compose } from 'redux';

class UserContentContainer extends Component {
  initialize = async () => {
    const { username } = this.props.match.params;
    if (!username) return;
    await ProfileActions.getUserTags(username);
    await ProfileActions.getProfile(username);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.initialize();
    }
  }

  render() {
    const { match, tagCounts } = this.props;
    const username = match.params.username || '';
    const type = match.params.tab || 'posts';
    return (
      <UserContent
        username={username}
        type={type}
        side={
          <UserTagView
            tagCounts={tagCounts}
            username={username}
          />
        }
      >
        <Route exact path="/@:username" component={UserPostsSubpage} />
      </UserContent>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ profile }: State) => ({
      profile: profile.profile,
      tagCounts: profile.tagCounts,
      side: profile.side,
    }),
    () => ({}),
  ),
)(UserContentContainer);
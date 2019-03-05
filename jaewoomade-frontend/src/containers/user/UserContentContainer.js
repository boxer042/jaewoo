import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import UserContent from 'components/user/UserContent/UserContent';
import UserTagView from 'components/user/UserTagView/UserTagView';
import UserPostsSubpage from 'pages/user/UserPostsSubpage';

class UserContentContainer extends Component {
  render() {
    const { match } = this.props;
    const username = match.params.username || '';
    const type = match.params.tab || 'posts';
    return (
      <UserContent
        username={username}
        type={type}
        side={
          <UserTagView
            username={username}
          />
        }
      >
        <Route exact path="/@:username" component={UserPostsSubpage} />
      </UserContent>
    );
  }
}

export default withRouter(UserContentContainer);
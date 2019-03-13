// @flow

import React, { Component } from 'react';
import MainSidebar from 'components/main/MainSidebar/MainSidebar';
import { withRouter, type Match } from 'react-router-dom';

type Props = {
  match: Match,
};

class MainSidebarContainer extends Component<Props> {
  render() {
    return <MainSidebar url={this.props.match.url} />;
  }
}

export default withRouter(MainSidebarContainer);

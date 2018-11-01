// @flow
import React, { Component } from 'react';
import MainTemplate from 'components/main/MainTemplate';
import MainTab from 'components/main/MainTab';
import Trending from 'pages/Trending';
import Recent from 'pages/Recent';
import { Switch, Route, withRouter, type ContextRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import type { State } from 'store';
import MainSidebarContainer from './MainSidebarContainer';
import MainHeadContainer from './MainHeadContainer';
import Posts from './../../pages/Posts';

type Props = {
  landing: boolean,
};

class MainContainer extends Component<Props> {
  render() {
    if (this.props.landing) return null;
    return (
      <MainTemplate sidebar={<MainSidebarContainer />}>
        <MainHeadContainer />
        <Switch>
          <Route exact path="/(|trending)" component={Trending} />
          <Route path="/recent" component={Recent} />
          <Route path="/tags/:tag?" component={Posts} />
        </Switch>
      </MainTemplate>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ base }: State) => ({
      landing: base.landing,
    }),
    () => ({}),
  ),
)(MainContainer);
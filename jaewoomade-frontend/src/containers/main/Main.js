// @flow
import React, { Component } from 'react';
import MainTemplate from 'components/main/MainTemplate';
import MainTab from 'components/main/MainTab';
import MainSidebarContainer from './MainSidebarContainer';
import MainHeadContainer from './MainHeadContainer';

type Props = {};

class MainContainer extends Component<Props> {
  render() {
    return (
      <MainTemplate sidebar={<MainSidebarContainer />}>
        <MainHeadContainer />
        작은 물고기가뭐지
      </MainTemplate>
    );
  }
}

export default MainContainer;
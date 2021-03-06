// @flow
import React, { Component } from 'react';
import MainHead from 'components/main/MainHead/MainHead';
import { BaseActions } from 'store/actionCreators';
import withUser from 'lib/hoc/withUser';
import type { UserData } from 'store/modules/user';
import RightCorner from 'containers/base/RightCorner';

type Props = {
  user: ?UserData,
};

class MainHeadContainer extends Component<Props> {
  onEnterLanding = () => {
    BaseActions.enterLanding();
  };

  render() {
    const { onEnterLanding } = this;
    const { user } = this.props;

    return (
      <MainHead onLogin={onEnterLanding} logged={!!user} rightArea={user && <RightCorner />} />
    );
  }
}

export default withUser(MainHeadContainer);
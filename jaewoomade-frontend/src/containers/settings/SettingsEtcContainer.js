import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SettingsEtc from 'components/settings/SettingsEtc/SettingsEtc';
import { SettingsActions } from 'store/actionCreators';
import { withRouter } from 'react-router-dom';
import QuestionModal from 'components/common/QuestionModal/QuestionModal';
import storage from 'lib/storage';

class SettingsEtcContainer extends Component {
  onConfirmUnregister = async () => {
    try {
      await SettingsActions.generateUnregisterToken();
      const { unregisterToken } = this.props;
      if (!unregisterToken) return;
      await SettingsActions.unregister(unregisterToken);
      storage.clear();
      if (window && window.location) {
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  }
  onAskUnregister = () => {
    SettingsActions.askUnregister(true);
  };
  onCancelUnregister = () => {
    SettingsActions.askUnregister(false);
  };
  render() {
    const { askUnregister } = this.props;
    return (
      <Fragment>
        <SettingsEtc onAskUnregister={this.onAskUnregister} />
        <QuestionModal
          title="회원탈퇴"
          description="정말로 회원탈퇴를 하시겠습니까? 작성하신 포스트는 초기화되며 복구가 불가능합니다."
          open={askUnregister}
          onCancel={this.onCancelUnregister}
          onConfirm={this.onConfirmUnregister}
          confirmText="탈퇴"
        />
      </Fragment>
    );
  }
}

export default connect(
  ({ settings }: State) => ({
    askUnregister: settings.askUnregister,
    unregisterToken: settings.unregisterToken,
  }),
  () => ({}),
)(withRouter(SettingsEtcContainer));
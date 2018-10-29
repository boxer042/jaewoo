import React, { Component } from 'react';
import WriteExtra from 'components/write/WriteExtra/WriteExtra';
import { connect } from 'react-redux';
import type { State } from 'store';
import { WriteActions } from 'store/actionCreators';
import type { PostData } from 'store/modules/write';

type Props = {
  visible: boolean,
  mode: string,
}

class WriteExtraContainer extends Component<Props> {
  onSelectLayoutMode = (mode) => {
    WriteActions.setLayoutMode(mode);
  };

  render() {
    const { mode } = this.props;
    return (
      <WriteExtra
        visible={this.props.visible}
        onSelectLayoutMode={this.onSelectLayoutMode}
        mode={mode}
      />
    );
  }
}

export default connect(
  ({ write, base }: State) => ({
    visible: write.writeExtra.visible,
    mode: write.writeExtra.layoutMode,
  }),
  () => ({}),
)(WriteExtraContainer);
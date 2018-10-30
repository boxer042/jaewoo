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
  onClickOutside = (e: SyntheticMouseEvent<any>) => {
    if (!this.props.visible) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    WriteActions.hideWriteExtra();
  };

  render() {
    const { mode } = this.props;
    return (
      <WriteExtra
        visible={this.props.visible}
        onSelectLayoutMode={this.onSelectLayoutMode}
        onClickOutside={this.onClickOutside}
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
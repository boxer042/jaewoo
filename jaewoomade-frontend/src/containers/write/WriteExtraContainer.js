import React, { Component } from 'react';
import WriteExtra from 'components/write/WriteExtra/WriteExtra';
import WriteExtraTempSaveList from 'components/write/WriteExtraTempSaveList';
import { connect } from 'react-redux';
import { WriteActions } from 'store/actionCreators';

class WriteExtraContainer extends Component<Props> {
  async listTempSave() {
    const { postData } = this.props;
    if (!postData) return;
    WriteActions.listTempSaves(postData.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      // WriteExtra is now visible
      this.listTempSave();
    }
  }

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

  onLoadTempSave = async (id) => {
    const { postData } = this.props;
    if (!postData) return;
    await WriteActions.loadTempSave({
      postId: postData.id,
      saveId: id,
    });
  };

  render() {
    const { mode, tempSaves } = this.props;
    return (
      <WriteExtra
        visible={this.props.visible}
        onSelectLayoutMode={this.onSelectLayoutMode}
        onClickOutside={this.onClickOutside}
        mode={mode}
        tempSaveList={
          <WriteExtraTempSaveList tempSaves={tempSaves} onLoadTempSave={this.onLoadTempSave} />
        }
      />
    );
  }
}

export default connect(
  ({ write }: State) => ({
    visible: write.writeExtra.visible,
    mode: write.writeExtra.layoutMode,
    postData: write.postData,
    tempSaves: write.tempSaves,
    title: write.title,
    body: write.body,
    changed: write.changed,
  }),
  () => ({}),
)(WriteExtraContainer);
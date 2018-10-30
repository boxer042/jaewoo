// @flow
import React, { Component, type Node } from 'react';
import WritePanes from 'components/write/WritePanes';
import type { State } from 'store';
import { WriteActions } from 'store/actionCreators';
import { connect } from 'react-redux';
import MarkdownPreviewContaner from 'containers/write/MarkdownPreviewContainer';
import CodeEditorContainer from 'containers/write/CodeEditorContainer';

type Props = {
  mode: string,
}
class WritePanesContainer extends Component<Props> {
  componentWillUnmount() {
    WriteActions.reset(); // reset Write Module on page leave
  }
  onSetLayoutMode = (mode) => {
    WriteActions.setLayoutMode(mode);
  };
  render() {
    return (
      <WritePanes
        left={<CodeEditorContainer />}
        right={<MarkdownPreviewContaner />}
        mode={this.props.mode}
        onSetLayoutMode={this.onSetLayoutMode}
      />
    );
  }
}

export default connect(
  ({ write, base }: State) => ({
    mode: write.writeExtra.layoutMode,
    width: base.windowWidth,
  }),
  () => ({}),
)(WritePanesContainer);
import React, { Component } from 'react';
import CodeEditor from 'components/write/CodeEditor';
import { connect } from 'react-redux';
import { WriteActions } from 'store/actionCreators';

type Props = {
  body: string
}

class CodeEditorContainer extends Component<Props> {
  onEditBody = (value) => {
    WriteActions.editBody(value);
  }

  render() {
    const { onEditBody } = this;
    const { body } = this.props;
    return (
      <CodeEditor onEditBody={onEditBody} body={body} />
    );
  }
}

export default connect(
  ({ write }: State) => ({
    body: write.body,
  }),
  () => ({}),
)(CodeEditorContainer);
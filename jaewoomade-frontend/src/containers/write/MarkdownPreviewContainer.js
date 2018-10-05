// @flow
import React, { Component } from 'react';
import MarkdownPreview from 'components/write/MarkdownPreview/MarkdownPreview';
import { connect } from 'react-redux';
import type { State } from 'store';

type Props = {
  title: string,
  body: string
};

class MarkdownPreviewContaner extends Component<Props> {
  render() {
    const { title, body } = this.props;
    return (
      <MarkdownPreview
        title={title}
        body={body}
      />
    );
  }
}

export default connect(
  ({ write }: State) => ({
    title: write.title,
    body: write.body,
  }),
  () => ({}),
)(MarkdownPreviewContaner);
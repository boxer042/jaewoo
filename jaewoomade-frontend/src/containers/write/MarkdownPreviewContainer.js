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
    const { title, body, meta, postData } = this.props;
    return (
      <MarkdownPreview
        title={title}
        body={body}
        theme={meta.code_theme || (postData && postData.meta.code_theme)}
      />
    );
  }
}

export default connect(
  ({ write }: State) => ({
    title: write.title,
    body: write.body,
    meta: write.meta,
    postData: write.postData,
  }),
  () => ({}),
)(MarkdownPreviewContaner);
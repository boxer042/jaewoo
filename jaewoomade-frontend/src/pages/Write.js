// @flow

import React from 'react';
import WriteTemplate from 'components/write/WriteTemplate';
import WritePanes from 'components/write/WritePanes';
import CodeEditorContainer from 'containers/write/CodeEditorContainer';
import WriteHeaderContainer from 'containers/write/WriteHeaderContainer';
import MarkdownPreviewContaner from 'containers/write/MarkdownPreviewContainer';
import SubmitBoxContainer from 'containers/write/SubmitBoxContainer';
import CategoryEditModalContainer from 'containers/write/CategoryEditModalContainer';
import DisablePanesContainer from 'containers/write/DisablePanesContainer';
import WriteExtraContainer from 'containers/write/WriteExtraContainer';

const Write = () => {
  return (
    <WriteTemplate header={<WriteHeaderContainer />}>
      <SubmitBoxContainer />
      <WritePanes left={<CodeEditorContainer />} right={<MarkdownPreviewContaner />} />
      <WriteExtraContainer />
      <DisablePanesContainer />
      <CategoryEditModalContainer />
    </WriteTemplate>
  );
};

export default Write;
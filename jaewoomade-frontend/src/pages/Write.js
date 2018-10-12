// @flow

import React from 'react';
import WriteTemplate from 'components/write/WriteTemplate';
import WritePanes from 'components/write/WritePanes';
import CodeEditorContainer from 'containers/write/CodeEditorContainer';
import WriteHeaderContainer from 'containers/write/WriteHeaderContainer';
import MarkdownPreviewContaner from 'containers/write/MarkdownPreviewContainer';
import SubmitBoxContainer from 'containers/write/SubmitBoxContainer';
import CategoryEditModalContainer from 'containers/write/CategoryEditModalContainer';

const Write = () => {
  return (
    <WriteTemplate
      header={<WriteHeaderContainer />}
    >
      <SubmitBoxContainer />
      <WritePanes
        left={
          <CodeEditorContainer />
        }
        right={
          <MarkdownPreviewContaner />
        }
      />
      <CategoryEditModalContainer />
    </WriteTemplate>
  );
};

export default Write;
// @flow

import React from 'react';
import WriteTemplate from 'components/write/WriteTemplate';
import WritePanes from 'components/write/WritePanes';
import SelectCategory from 'components/write/SelectCategory';
import CodeEditorContainer from 'containers/write/CodeEditorContainer';
import WriteHeaderContainer from 'containers/write/WriteHeaderContainer';
import MarkdownPreviewContaner from 'containers/write/MarkdownPreviewContainer';
import SubmitBox from 'components/write/SubmitBox';
import SubmitBoxContainer from 'containers/write/SubmitBoxContainer';

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
    </WriteTemplate>
  );
};

export default Write;
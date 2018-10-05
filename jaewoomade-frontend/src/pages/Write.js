import React from 'react';
import WriteTemplate from 'components/write/WriteTemplate';
import WritePanes from 'components/write/WritePanes';
import CodeEditorContainer from 'containers/write/CodeEditorContainer';
import WriteHeaderContainer from 'containers/write/WriteHeaderContainer';
import MarkdownPreviewContaner from 'containers/write/MarkdownPreviewContainer';

const Write = () => {
  return (
    <WriteTemplate
      header={<WriteHeaderContainer />}
      panes={(
      <WritePanes
        left={
          <CodeEditorContainer />
        }
        right={
          <MarkdownPreviewContaner />
        }
      />
      )}
    />
  );
};

export default Write;
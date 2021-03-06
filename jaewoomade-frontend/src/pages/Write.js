// @flow
import React from 'react';
import WriteTemplate from 'components/write/WriteTemplate';
import WriteHeaderContainer from 'containers/write/WriteHeaderContainer';
import SubmitBoxContainer from 'containers/write/SubmitBoxContainer';
import CategoryEditModalContainer from 'containers/write/CategoryEditModalContainer';
import DisablePanesContainer from 'containers/write/DisablePanesContainer';
import WriteExtraContainer from 'containers/write/WriteExtraContainer';
import WritePanesContainer from 'containers/write/WritePanesContainer';
import { Helmet } from 'react-helmet';

const Write = () => {
  return (
    <WriteTemplate header={<WriteHeaderContainer />}>
      <Helmet>
        <title>새 글 작성하기 | JAEWOOMADE</title>
      </Helmet>
      <SubmitBoxContainer />
      <WriteExtraContainer />
      <WritePanesContainer />
      <DisablePanesContainer />
      <CategoryEditModalContainer />
    </WriteTemplate>
  );
};

export default Write;
import React, { Fragment } from 'react';
import PostTemplate from 'components/post/PostTemplate';
import HeaderContainer from 'containers/base/HeaderContainer';
import PostViewer from 'containers/post/PostViewer';
import { type Match } from 'react-router-dom';
import ViewerHead from 'components/base/ViewerHead';
import RightCorner from 'containers/base/RightCorner';
import PostCommentsContainer from './../containers/post/PostCommentsContainer';

type Props = {
  match: Match
}
const Post = ({ match }) => {
  const { username, urlSlug } = match.params;

  return (
      <Fragment>
        <PostTemplate header={<ViewerHead rightCorner={<RightCorner />} />}>
          <PostViewer username={username} urlSlug={urlSlug} />
          <PostCommentsContainer />
        </PostTemplate>
      </Fragment>
  );
};

export default Post;
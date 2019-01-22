// @flow
import React from 'react';
import MarkdownRender from 'components/common/MarkdownRender';
import './PostContent.scss';

type Props = {
  body: string,
  thumbnail: ?string,
  onSetToc: (toc: any) => void,
  onActivateHeading: (headingId: string) => void,
};

const PostContent = ({ body, onSetToc, thumbnail, onActivateHeading }: Props) => (
  <div className="PostContent">
    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
      <polygon points="0 0, 100 0, 0 10" fill="#ffffff" />
    </svg> */}
    {thumbnail && (
      <div className="post-thumbnail">
        <img src={thumbnail} alt="" />
      </div>
    )}
    <div className="contents">
      <MarkdownRender
        body={body}
        onSetToc={onSetToc}
        onActivateHeading={onActivateHeading}
      />
    </div>
  </div>
);


export default PostContent;
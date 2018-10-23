// @flow
import React from 'react';
import MarkdownRender from 'components/common/MarkdownRender';
import './PostContent.scss';

type Props = {
  body: string
};

const PostContent = ({ body }: Props) => (
  <div className="PostContent">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
      <polygon points="0 0, 100 0, 0 10" fill="#ffffff" />
    </svg>
    <div className="wrapper">
      <div className="floating-box">
        <img src="https://shop.r10s.jp/minatodenk/cabinet/001/gz360ez_131024-06.jpg" alt="post-thumbnail" />
        <div className="contents">
          <MarkdownRender body={body} />
        </div>
      </div>
    </div>
  </div>
);


export default PostContent;
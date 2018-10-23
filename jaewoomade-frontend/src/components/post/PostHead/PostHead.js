// @flow
import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import './PostHead.scss';

type Props = {
  title: string,
  tags: string[],
  user: {
    username: string,
    id: string,
    thumbnail: ?string,
    short_bio: ?string,
  }
};

const PostHead = ({ title, tags, user }: Props) => (
  <div className="PostHead">
    <div className="sub-info">
      <div className="thumbnail util flex-center">
        <img
          src={defaultThumbnail}
          alt="user-thumbnail"
        />
      </div>
      <div className="information">
        <div>
          <div className="username">@boxer042</div>
          <div className="description">안녕하세요. </div>
          <div className="date-time">Mar 30</div>
        </div>
      </div>
    </div>
    <h1>{title}</h1>
    <div className="tags">
      <span className="tag">제노아</span>
      <span className="tag">허스크바나회사</span>
      <span className="tag">엔진톱</span>
    </div>
  </div>
);


export default PostHead;
// @flow
import React from 'react';
import ImageIcon from 'react-icons/lib/io/image';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import './PostCard.scss';

type Props = { }


const PostCard = (props: Props) => (
  <div className="PostCard">
    <div className="thumbnail-wrapper">
      <img
        src="https://shop.r10s.jp/minatodenk/cabinet/001/gz360ez_131024-06.jpg"
        alt="thumbnail"
      />
      <div className="white-mask" />
    </div>
    <div className="card-content">
      <div className="user-thumbnail-wrapper">
        <img
          src={defaultThumbnail}
          alt="@boxer042"
        />
      </div>
      <div className="content-head">
        <div className="username">@boxer042</div>
        <h3>
        허스크바나 제노아
        </h3>
        <div className="subinfo">
          <span>약 1분전</span>
          <span>10개의 댓글</span>
        </div>
      </div>
      <div className="description">
        Lorem viadell poter
      </div>
    </div>
  </div>
);


export default PostCard;
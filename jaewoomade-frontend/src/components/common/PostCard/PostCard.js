// @flow
import React from 'react';
import ImageIcon from 'react-icons/lib/io/image';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import './PostCard.scss';

type Props = { }


const PostCard = ({ thumbnail, username, userThumbnail, title, body }: Props) => (
  <div className="PostCard">
    <div className="thumbnail-wrapper">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
        />
      ) : (
        <div className="image-placeholder">
          <ImageIcon />
        </div>
      )}
      <div className="white-mask" />
    </div>
    <div className="card-content">
      <div className="user-thumbnail-wrapper">
        <img
          src={userThumbnail}
          alt={username}
        />
      </div>
      <div className="content-head">
        <div className="username">{username}</div>
        <h3>
          {title}
        </h3>
        <div className="subinfo">
          <span>약 1분전</span>
          <span>10개의 댓글</span>
        </div>
      </div>
      <div className="description">
        {body}
      </div>
    </div>
  </div>
);


export default PostCard;
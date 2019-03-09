// @flow
import React from 'react';
import ImageIcon from 'react-icons/lib/io/image';
import { Link } from 'react-router-dom';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import { fromNow, resizeImage } from 'lib/common';
import './PostCard.scss';

type Props = {
  thumbnail: ?string,
  username: string,
  title: string,
  body: string,
  date: string,
  urlSlug: string,
}


const PostCard = ({
  thumbnail,
  username,
  userThumbnail,
  title,
  body,
  date,
  urlSlug,
  commentsCount,
}: Props) => {
  const formattedDate = fromNow(date);
  const link = `/@${username}/${urlSlug}`;
  return (
    <div className="PostCard">
      <div className="thumbnail-wrapper">
        <Link to={link}>
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
        </Link>
      </div>
      <div className="card-content">
        <div className="user-thumbnail-wrapper">
          <img
            src={userThumbnail || defaultThumbnail}
            alt={username}
          />
        </div>
        <div className="content-head">
          <Link to={`/@${username}`} className="username">
              {username}
          </Link>
          <h3>
            <Link to={link}>{title}</Link>
          </h3>
          <div className="subinfo">
            <span>{formattedDate}</span>
            <span>{commentsCount}개의 댓글</span>
          </div>
        </div>
        <div className="description">
          {body}
        </div>
      </div>
    </div>
  );
};


export default PostCard;
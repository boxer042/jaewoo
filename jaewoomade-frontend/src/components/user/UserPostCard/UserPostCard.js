// @flow
import React from 'react';
import type { PostItem } from 'store/modules/listing';
import { Link } from 'react-router-dom';
import { escapeForUrl, fromNow, resizeImage } from 'lib/common';
import './UserPostCard.scss';

type Props = {
  post: PostItem,
  username: string,
};

const UserPostCard = ({ post, username }: Props) => {
  const { title, body, thumbnail, meta, tags, created_at, comments_count, url_slug } = post;

  // const sliced = (() => {
  //   const content = meta.short_description || body;
  //   return content.slice(0, 150) + (content.length > 150 ? '...' : '');
  // })();

  const link = `/@${username}/${url_slug}`;
  return (
    <div className="UserPostCard">
      {thumbnail && (
        <Link to={link} className="img-wrapper">
          <img src={thumbnail} alt={`${title} Thumbnail`} />
        </Link>
      )}
      <h2>
        <Link to={link}>{title}</Link>
      </h2>
      <p>{body}</p>
      <div className="card-subinfo">
        <span>{fromNow(created_at)}</span>
        <span>{comments_count}개의 댓글</span>
      </div>
      <div className="tags">
        {tags.map(tag => (
          <div className="tag" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

UserPostCard.Placeholder = () => {
  return (
    <div className="UserPostCard placeholder">
      <div className="img-wrapper">
        <div className="fake-img gray-box" />
      </div>
      <h2>
        <span className="gray-box" />
      </h2>
      <p>
        <span className="gray-box" style={{ width: '90%' }} />
        <span className="gray-box" style={{ width: '100%' }} />
        <span className="gray-box" style={{ width: '95%' }} />
      </p>
      <div className="card-subinfo-placeholder">
        <span className="gray-box" />
        <span className="gray-box" />
      </div>
      <div className="tags">
        <div className="tag gray-box" />
        <div className="tag gray-box" />
      </div>
    </div>
  );
};

export default UserPostCard;
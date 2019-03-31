// @flow
import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import { Link } from 'react-router-dom';
import { fromNow } from 'lib/common';
import PostLikeButton from 'components/post/PostLikeButton';
import './PostHead.scss';
import PostActionButtons from '../PostActionButtons';

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

const PostHead = ({
  id,
  title,
  date,
  categories,
  user,
  likes,
  liked,
  ownPost,
  onToggleLike,
  onAskRemove,
  logged,
}: Props) => {
  const userLink = `/@${user.username}`;
  return (
    <div className="PostHead">
      <div className="userinfo">
        <Link to={userLink} className="user-thumbnail">
          <img src={user.thumbnail || defaultThumbnail} alt="user-thumbnail" />
        </Link>
        <div className="info">
          <Link to={userLink} className="username">
            @{user.username}
          </Link>
          <div className="description">{user.short_bio}</div>
        </div>
      </div>
      <h1>{title}</h1>
      <div className="date-and-likes">
        <div className="date">{fromNow(date)}</div>
        <div className="placeholder" />
        <PostLikeButton onClick={onToggleLike} liked={liked} likes={likes} disabled={!logged} />
      </div>
      <div className="separator" />
      {ownPost && <PostActionButtons id={id} onAskRemove={onAskRemove} />}
    </div>
  );
};


export default PostHead;
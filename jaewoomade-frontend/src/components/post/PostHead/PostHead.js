// @flow
import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import { Link } from 'react-router-dom';
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

const PostHead = ({
  id,
  title,
  tags,
  user,
  date,
}: Props) => (
  <div className="PostHead">
    <div className="userinfo">
      <Link to="#" className="user-thumbnail">
        <img src={user.thumbnail || defaultThumbnail} alt="user-thumbnail" />
      </Link>
      <div className="info">
         <Link to="#" className="username">
           @{user.username}
         </Link>
         <div className="description">{user.short_bio}</div>
      </div>
    </div>
    <h1>{title}</h1>
    <div className="date-and-likes">
      <div className="date">{date}</div>
      <div className="placeholder" />
    </div>
    <div className="separator" />
  </div>
);


export default PostHead;
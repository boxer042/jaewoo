// @flow
import React from 'react';

import './PostCardList.scss';
import PostCard from './../PostCard/PostCard';


type Props = {
  posts: ?(PostItem[]),
}


const PostCardList = ({ posts }: Props) => {
  if (!posts) return null;
  const postList = posts.map(
    post => (
      <PostCard
        key={post.id}
        id={post.id}
        thumbnail={post.thumbnail}
        username={post.user.username}
        userThumbnail={post.user.thumbnail}
        title={post.title}
        body={post.body}
      />
    ),
  );
  return (
    <div className="PostCardList">
      {postList}
    </div>
  );
};

PostCardList.defaultProps = {
  posts: [],
};

export default PostCardList;
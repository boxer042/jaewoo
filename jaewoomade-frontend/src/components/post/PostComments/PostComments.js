import React from 'react';

import './PostComments.scss';
import PostComment from './../PostComment/PostComment';
import PostCommentInput from './../PostCommentInput/PostCommentInput';

const PostComments = ({ comments }) => {
  return (
    <div className="PostComments">
      <h3>0개의 댓글</h3>
      <div className="comment-input"><PostCommentInput /></div>
      <div className="comment-list">
        {comments &&
          comments.map((comment) => {
            return (
              <PostComment
                key={comment.id}
                username={comment.user.username}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default PostComments;
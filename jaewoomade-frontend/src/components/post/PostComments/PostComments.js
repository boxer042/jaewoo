import React from 'react';
import { Link } from 'react-router-dom';
import './PostComments.scss';
import PostComment from './../PostComment/PostComment';
import PostCommentInput from './../PostCommentInput/PostCommentInput';

const PostComments = ({
  comments,
  commentInput,
  onReply,
  onReadReplies,
  subcommentsMap,
  logged,
  username,
  commentsCount,
}) => {
  return (
    <div className="PostComments">
      <h3>{commentsCount}개의 댓글</h3>
      <div className="comment-input">{commentInput}</div>
      {!logged && (
      <div className="ask-login">
        <Link to="/">로그인</Link> 후 댓글을 작성 할 수 있습니다.
      </div>
    )}
      <div className="comment-list">
        {comments &&
          comments.map((comment) => {
            return (
              <PostComment
                key={comment.id}
                id={comment.id}
                username={comment.user.username}
                thumbnail={comment.user.thumbnail}
                date={comment.created_at}
                comment={comment.text}
                replies={subcommentsMap[comment.id]}
                repliesCount={comment.replies_count}
                subcommentsMap={subcommentsMap}
                onReadReplies={onReadReplies}
                onReply={onReply}
                logged={logged}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default PostComments;
import React, { Component, Fragment } from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import Button from 'components/common/Button';
import PlusIcon from 'react-icons/lib/fa/plus-square-o';
import MinusIcon from 'react-icons/lib/fa/minus-square-o';
import { Link } from 'react-router-dom';
import { fromNow } from 'lib/common';
import MarkdownRender from 'components/common/MarkdownRender';

import cx from 'classnames';

import './PostComment.scss';
import PostCommentInput from './../PostCommentInput/PostCommentInput';

class PostComment extends Component {
  static defaultProps = {
    repliesCount: 0,
    level: 0,
  }

  state = {
    open: false,
    showInput: false,
    editing: false,
  }

  onOpen = () => {
    this.setState({
      open: true,
      showInput: false,
    });
  }

  onClose = () => {
    this.setState({
      open: false,
    });
  }

  onShowInput = () => {
    this.setState({
      showInput: true,
    });
  };

  onHideInput = () => {
    this.setState({
      showInput: false,
    });
  };

  render() {
    const {
      username,
      thumbnail,
      comment,
      date,
      repliesCount,
      level,
    } = this.props;

    const { open, showInput, editing } = this.state;

    const userProfileLink = `/@${username || ''}`;

    return (
      <div className="PostComment">
        {/* <PostCommentInput /> */}
        <Fragment>
        <div className="comment-head">
          <Link to={userProfileLink}>
            <img src={thumbnail || defaultThumbnail} alt={username} />
          </Link>
          <div className="text-block">
            <Link to={userProfileLink} className="username">
              {username}
            </Link>
            <div className="date">{fromNow(date)}</div>
          </div>
            <div className="actions">
              <button className="edit">수정</button>
              <button className="remove">삭제</button>
            </div>
        </div>
        <div className="comment-body">{comment}</div>
          { level < 3 && (open ? (
            <button className="replies-button" onClick={this.onClose}>
              <MinusIcon />
              숨기기
            </button>
          ) : (
            (comment || repliesCount > 0) && (
              <button className="replies-button" onClick={this.onOpen}>
                <PlusIcon />
                {repliesCount === 0 ? '답글 달기' : `${repliesCount}개의 답글`}
              </button>
            )
          ))}
          {open && (
            <section className="replies">
              <PostComment
                username="JAEWOO"
                date="2019.3.2"
                comment="이것이 댓글대글댓글"
                level={level + 1}
              />
            {showInput ? (
              <PostCommentInput
                showCancel
                onCancel={this.onHideInput}
              />
            ) : (
              <button className="show-input-button" onClick={this.onShowInput}>
                  답글 작성하기
              </button>
            )}
            </section>
          )}
        </Fragment>
      </div>
    );
  }
}

export default PostComment;
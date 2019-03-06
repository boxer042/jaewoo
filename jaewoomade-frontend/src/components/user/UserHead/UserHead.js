// @flow
import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import Button from 'components/common/Button';
import { resizeImage } from 'lib/common';
import './UserHead.scss';

const UserHead = ({ username }: Props) => {
  return (
    <div className="UserHead">
      <img src={defaultThumbnail} alt="thumbnail" />
      <div className="user-info">
        <section className="top">
              <div className="subscribe-wrapper">
                  <Button className="subscribe">
                    구독하기
                  </Button>
              </div>
          <div className="username">@{username}</div>
        </section>
        <section className="mini-profile">
          <h2>이재우</h2>
          <p>날려먹고 다시 만드는 페이지!</p>
        </section>
      </div>
    </div>
  );
};

export default UserHead;

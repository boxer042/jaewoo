// @flow
import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import Button from 'components/common/Button';
import { resizeImage } from 'lib/common';
import './UserHead.scss';

const UserHead = ({ username, profile, self }: Props) => {
  return (
    <div className="UserHead">
      <img src={profile.thumbnail || defaultThumbnail} alt="thumbnail" />
      <div className="user-info">
        <section className="top">
            <div className="subscribe-wrapper">
              {!self &&
                <Button className="subscribe">
                  구독하기
                </Button>
              }
            </div>
          <div className="username">@{username}</div>

        </section>
        <section className="mini-profile">
          <h2>{profile.display_name}</h2>
          <p>{profile.short_bio}</p>
        </section>
      </div>
    </div>
  );
};

UserHead.Placeholder = () => (
  <div className="UserHead placeholder">
    <div className="fake-thumbnail" />
    <div className="user-info">
      <section className="top">
        <div className="username">
          <div className="gray-block _username" />
        </div>
      </section>
      <section className="mini-profile">
        <div className="gray-block _name" />
        <div className="gray-block _description" />
      </section>
    </div>
  </div>
);

export default UserHead;

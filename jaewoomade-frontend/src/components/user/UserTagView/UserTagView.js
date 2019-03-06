// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { escapeForUrl } from 'lib/common';

import './UserTagView.scss';

const UserTagView = ({ username }: Props) => (
  <div className="UserTagView">
    <section>
      <div className="section-title">태그</div>
        <ul>
          <li>
            <NavLink exact to={`/@${username}`} activeStyle={{ fontWeight: '600' }}>
              전체보기
            </NavLink>
          </li>
              <li>
              <NavLink
                activeClassName="active"
                to="/"
              >
                태그여
                <span className="count">1</span>
              </NavLink>
              </li>
          <li className="placer" />
        </ul>
    </section>
  </div>
);

export default UserTagView;

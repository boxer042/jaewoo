// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { escapeForUrl } from 'lib/common';

import './UserTagView.scss';

const UserTagView = ({ username, tagCounts }: Props) => (
  <div className="UserTagView">
    <section>
      <div className="section-title">태그</div>
        {tagCounts && (
          <ul>
            <li>
            <NavLink exact to={`/@${username}`} activeStyle={{ fontWeight: '600' }}>
              전체보기
            </NavLink>
            </li>
            {tagCounts.map(t => (
              <li key={t.tag}>
                <NavLink
                  activeClassName="active"
                  to="/"
                >
                  {t.tag}
                  <span className="count">{t.count}</span>
                </NavLink>
              </li>
            ))}
            <li className="placer" />
          </ul>
        )}
    </section>
  </div>
);

export default UserTagView;

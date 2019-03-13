// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './MainHead.scss';
import Button from './../../common/Button/Button';

type Props = {
  onLogin(): void,
  logged: boolean,
  rightArea: ?Node,
}


const MainHead = ({ logged, onLogin, rightArea }: Props) => (
  <div className="MainHead">
    <div className="button-area">{logged && <Button to="/write">새 포스트 작성</Button>}</div>
    <div className="spacer" />
    <Link to="/" className="mobile-logo">
      JAEWOOMADE
      <div className="badge">alpha</div>
    </Link>
    <div className="right-area">
      {rightArea || (
        <Button theme="outline" onClick={onLogin}>
          로그인
        </Button>
      )}
    </div>
  </div>
);


export default MainHead;
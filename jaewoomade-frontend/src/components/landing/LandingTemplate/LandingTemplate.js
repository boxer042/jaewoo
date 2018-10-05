import React from 'react';
import Responsive from 'components/common/Responsive';
import './LandingTemplate.scss';

const HomeTemplate = ({ form }) => {
  return (
      <div className="landing-template">
      <Responsive className="block">
          <div className="left-text">
              <div>
                  <h1>일단은 간단한 블로그<br /> 무슨내용이든 기능부터</h1>
                  <div className="description">
                      블로그래 블로그 뭐뭐뭐 넣어야하나. <br />이메일로 시작하기 누르면
                      가입되어있으면 로그인 페이지로 가고, 가입안되어있으면 회원가입 페이지로 가쟈
                  </div>
              </div>
          </div>
          <div className="right-form">
              <div className="black-box">
                  <h2>로그인 또는 회원가입</h2>
                  {form}
              </div>
              <div className="register-button">
                  시작하기
              </div>
          </div>
      </Responsive>
      </div>
  );
};

export default HomeTemplate;
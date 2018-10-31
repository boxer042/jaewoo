import React from 'react';
import Responsive from 'components/common/Responsive';
import './LandingTemplate.scss';

const LandingTemplate = ({ form }) => {
  return (
    <div className="LandingTemplate">
      <div className="left">
        <div>
          <div className="logo">JAEWOOMADE</div>
          <h2>어떤 서비스를 제공해야될까?</h2>
          <p>지속적으로 정보를 얻고 그 정보로 수익을 창출 할수 있는 플랫폼
            <br />하나? 두개? 사용자를 많이 이끌 수 있도록 만들어야하나?
            <br />필요하도록 만들어야한다.
          </p>
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>2018. JAEWOOMADE</h2>
          <div className="auth-form">
            {form}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingTemplate;

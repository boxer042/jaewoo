import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import HeaderContainer from 'containers/base/HeaderContainer';
import LandingTemplateContainer from 'containers/landing/LandingTemplateContainer';
import AuthFormContainer from 'containers/landing/AuthFormContainer';

const Home = () => {
  return (
    <PageTemplate header={<HeaderContainer />} >
      <LandingTemplateContainer
        form={<AuthFormContainer />}
      />
    </PageTemplate>
  );
};

export default Home;
import React from 'react';
import { Helmet } from 'react-helmet';
import RecentPostCards from './../containers/list/RecentPostCards';
import RecentTemplate from './../components/recent/RecentTemplate/RecentTemplate';

const Recent = () => {
  return (
    <RecentTemplate>
      <Helmet>
        <title>최신 포스트 | jaewoomade</title>
        <meta
          name="description"
          content="방금 작성된 다양한 개발자들이 작성한 따끈따끈한 포스트들을 읽어보세요."
        />
      </Helmet>
      <RecentPostCards />
    </RecentTemplate>
  );
};

export default Recent;
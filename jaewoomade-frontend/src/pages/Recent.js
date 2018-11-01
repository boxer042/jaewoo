import React from 'react';
import RecentPostCards from './../containers/list/RecentPostCards';
import RecentTemplate from './../components/recent/RecentTemplate/RecentTemplate';

const Recent = () => {
  return (
    <RecentTemplate>
      <RecentPostCards />
    </RecentTemplate>
  );
};

export default Recent;
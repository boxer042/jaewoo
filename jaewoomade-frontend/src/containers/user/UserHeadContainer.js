import React from 'react';
import UserHead from 'components/user/UserHead/UserHead';

const UserHeadContainer = ({ username }) => {
  return (
    <UserHead
      username={username}
    />
  );
};

export default UserHeadContainer;
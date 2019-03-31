// @flow
import React from 'react';
import SettingsTemplate from 'components/settings/SettingsTemplate';
import WhiteHeader from 'containers/base/WhiteHeader';
import SettingSections from 'containers/settings/SettingSections';

const Settings = () => {
  return (
    <SettingsTemplate header={<WhiteHeader />}>
      <SettingSections />
    </SettingsTemplate>
  );
};

export default Settings;

import React from 'react';
import SavesTemplate from 'components/saves/SavesTemplate';
import ViewerHead from 'components/base/ViewerHead';
import RightCorner from 'containers/base/RightCorner';

const Saves = () => {
  return (
    <SavesTemplate header={<ViewerHead rightCorner={<RightCorner />} />} >
      hi
    </SavesTemplate>
  );
};

export default Saves;
import React from 'react';
import WriteExtraTempSaveItem from '../WriteExtraTempSaveItem';

const WriteExtraTempSaveList = ({ tempSaves, onLoadTempSave }) => {
  if (!tempSaves) {
    return (
      <div className="WriteExtraTempSaveList">
        <div className="no-data">임시 저장 데이터가 없습니다.</div>
      </div>
    );
  }

  const tempSaveList = tempSaves.map(tempSave => (
    <WriteExtraTempSaveItem
      key={tempSave.id}
      title={tempSave.title}
      date={tempSave.created_at}
      id={tempSave.id}
      onClick={() => onLoadTempSave(tempSave.id)}
    />
  ));
  return <div className="WriteExtraTempSaveList">{tempSaveList}</div>;
};

export default WriteExtraTempSaveList;
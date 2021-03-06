// @flow
import React from 'react';
import BackIcon from 'react-icons/lib/md/arrow-back';
import MoreIcon from 'react-icons/lib/md/more-vert';
import CloseIcon from 'react-icons/lib/md/close';
import cx from 'classnames';
import './WriteHeader.scss';

type Props = {
  onChangeTitle(e: any): void,
  onOpenSubmitBox(): void,
  onShowWriteExtra(): void,
  onHideWriteExtra(): void,
  title: string,
  isEdit: boolean,
  isTemp: boolean,
  onTempSave(): void,
}
const WriteHeader = ({
  onChangeTitle,
  onOpenSubmitBox,
  onShowWriteExtra,
  onHideWriteExtra,
  writeExtraOpen,
  title,
  isEdit,
  onTempSave,
  onGoBack,
}: Props) => {
  return (
    <div className="WriteHeader">
      <BackIcon className="back-icon" onClick={onGoBack} />
      <div className="title-area">
        <input
          placeholder="제목을 입력해주세요."
          autoFocus
          onChange={onChangeTitle}
          value={title}
        />
      </div>
      <div className="actions">
        <div className="button temp-save" onClick={onTempSave} >
          임시저장
        </div>
        <div className={cx('button', isEdit ? 'edit' : 'submit')} onClick={onOpenSubmitBox}>
          {isEdit ? '업데이트' : '작성하기' }
        </div>
        {writeExtraOpen && (
          <div className="ignore-click-outside more util flex-center" onClick={onHideWriteExtra}>
            <CloseIcon className="ignore-click-outside" />
          </div>
        )}
        {!writeExtraOpen && (
          <div className="ignore-click-outside more util flex-center" onClick={onShowWriteExtra}>
            <MoreIcon className="ignore-click-outside" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteHeader;
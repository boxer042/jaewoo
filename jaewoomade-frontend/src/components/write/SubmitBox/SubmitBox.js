// @flow
import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import SettingsIcon from 'react-icons/lib/md/settings';

import cx from 'classnames';

import './SubmitBox.scss';

type Props = {
  isEditing: boolean,
  selectCategory: any,
  inputTags: any,
  visible: boolean,
  onClose(): void,
};

class SubmitBox extends Component<Props> {
  static defaultProps ={
    isEditing: false,
  }

  handleClickOutside = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { isEditing, selectCategory, inputTags, visible } = this.props;

    if (!visible) return null;

    return (
      <div className="SubmitBox">
        <div className="title">
          {isEditing ? '수정하기' : '새 글 작성하기'}
        </div>
        <div className="sections">
          <section>
            <div className="section-title">
              카테고리 선택
            </div>
            {selectCategory}
          </section>
          <section>
            <div className="section-title">
              태그설정
            </div>
            {inputTags}
          </section>
        </div>
        <div className="footer">
          <div className="open-options">
            <span>추가설정</span>
          </div>
          <div className="submit-button util flex-center">
            작성하기
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(SubmitBox);
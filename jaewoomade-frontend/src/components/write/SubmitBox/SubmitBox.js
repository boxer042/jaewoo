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
  isEdit: boolean,
  onClose(): void,
  categories: ?Categories,
  onSubmit(): void,
  onEditCategoryClick(): void,
};

type State = {
  animating: boolean,
};

class SubmitBox extends Component<Props, State> {
  animateTimeout: any;

  static defaultProps ={
    isEditing: false,
  }

  state = {
    animating: false,
  }

  handleClickOutside = () => {
    const { onClose, visible } = this.props;
    if (!visible) return;
    onClose();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && !nextProps.visible) {
      this.animate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animateTimeout);
  }

  animate = () => {
    clearTimeout(this.animateTimeout);
    this.setState({
      animating: true,
    });
    this.animateTimeout = setTimeout(() => {
      this.setState({
        animating: false,
      });
    }, 150);
  }

  render() {
    const {
      isEdit, selectCategory, inputTags, visible,
      onSubmit, onEditCategoryClick, onClose,
    } = this.props;
    const { animating } = this.state;
    if (!visible && !animating) return null;

    return (
      <div className={cx('SubmitBox', visible ? 'appear' : 'disappear')}>
        <div className="title">
          <div className="text">{isEdit ? '수정하기' : '새 글 작성하기'}</div>
          {isEdit && <div className="view">글 보기</div>}
        </div>
        <div className="sections">
          <section>
            <div className="section-title category" onClick={onEditCategoryClick}>
              카테고리 선택
              <div className="edit util flex-center">
                <SettingsIcon />
                <div>수정</div>
              </div>
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
          <div className={cx('submit-button', 'util', 'flex-center', { edit: isEdit })} onClick={onSubmit}>
            { isEdit ? '업데이트' : '작성하기' }
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(SubmitBox);
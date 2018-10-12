// @flow
import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import RemoveIcon from 'react-icons/lib/io/trash-b';
import EditIcon from 'react-icons/lib/md/edit';
import './CategoryEditItem.scss';

type Props = {
  edit?: boolean,
  name: string,
  temp?: boolean,
}

const defaultProps = {
  edit: false,
  temp: false,
  name: '카테고리',
};

const DefaultItem = ({ name }: Props) => {
  return (
    <Fragment>
      <div className="text">{name}</div>
      <div className="buttons">
        <div className="button edit"><EditIcon /></div>
        <div className="button remove"><RemoveIcon /></div>
      </div>
    </Fragment>
  );
};

DefaultItem.defaultProps = defaultProps;

const EditingItem = ({ edit, temp, name }: Props) => {
  return (
    <Fragment>
      <input plasceholdr="새 카테고리" />
      <div className="apply-button">
        적용
      </div>
    </Fragment>
  );
};

EditingItem.defaultProps = defaultProps;

class CategoryEditItem extends Component<Props> {
  static defaultProps = defaultProps;
  render() {
    const { name, edit } = this.props;
    return (
      <div className={cx('CategoryEditItem', { edit })}>
        {
          edit ? <EditingItem {...this.props} /> : <DefaultItem {...this.props} />
        }
      </div>
    );
  }
}


export default CategoryEditItem;
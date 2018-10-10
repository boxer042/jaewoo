// @flow
import React from 'react';
import cx from 'classnames';
import CheckIcon from 'react-icons/lib/md/check';
import type { Categories } from 'store/modules/write';
import './SelectCategory.scss';

type CategoryProps = {
  id: string,
  name: string,
  active?: boolean,
};

const Category = ({ id, name, active }: CategoryProps) => (
  <div className={cx('category', { active })}>
    <div className="text">{name}</div>
    <CheckIcon />
  </div>
);

Category.defaultProps = {
  active: false,
};

type Props = {
  categories: ?Categories
};

const SelectCategory = ({ categories }: Props) => {
  if (!categories || categories.size === 0) {
    return null;
  }

  const categoryList = categories.map(
    category => (
      <Category key={category.id} name={category.name} id={category.id} active={category.active} />
    ));
  return (
    <div className="SelectCategory">
      {categoryList}
    </div>
  );
};

export default SelectCategory;
// @flow
import React from 'react';
import RemoveIcon from 'react-icons/lib/io/trash-b';
import EditIcon from 'react-icons/lib/md/edit';
import CreateIcon from 'react-icons/lib/md/add-circle';
import type { Categories } from 'store/modules/write';
import CategoryEditItem from '../CategoryEditItem';
import './CategoryEditItemList.scss';

type Props = {
  categories: ?Categories,
  onCreate(): void,
  onToggleEditCategory(id: string): void,
  onChange({ id: string, name: string }): void
}

const CategoryEditItemList = ({ categories, onCreate, onToggleEditCategory, onChange }: Props) => {
  if (!categories) return null;
  const categoryList = categories.map(
    category => (
      <CategoryEditItem
        key={category.id}
        name={category.name}
        edit={category.edit}
        temp={category.temp}
        onToggleEditCategory={() => onToggleEditCategory(category.id)}
        onChange={(e: SyntheticInputEvent<HTMLInputElement>) => onChange({
          id: category.id,
          name: e.target.value,
        })}
      />
    ),
  );
  return (
    <div className="CategoryEditItemList">
      {categoryList}
      <div className="create-category util flex-center" onClick={onCreate}>
        <CreateIcon />
        <div>새 카테고리 만들기</div>
      </div>
    </div>
  );
};


export default CategoryEditItemList;
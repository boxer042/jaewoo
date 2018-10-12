import React, { Component } from 'react';
import CategoryEditModal from 'components/write/CategoryEditModal';
import CategoryEditItemList from 'components/write/CategoryEditItemList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { State } from 'store';
import { WriteActions } from 'store/actionCreators';
import type { Categories } from 'store/modules/write';

type Props = {
  open: boolean,
  categories: ?Categories
};

class CategoryEditModalContainer extends Component {
  onClose = () => {
    WriteActions.closeCategoryModal();
  }

  onCreate = () => {
    WriteActions.createTempCategory();
  }
  onToggleEditCategory = (id) => {
    WriteActions.toggleEditCategory(id);
  }
  onChange = ({ id, name }: { id: string, name: string }) => {
    WriteActions.changeCategoryName({
      id,
      name,
    });
  }
  render() {
    const { open, categories } = this.props;
    const { onClose, onCreate, onToggleEditCategory, onChange } = this;

    return (
      <CategoryEditModal open={open} onClose={onClose}>
        <CategoryEditItemList
          onChange={onChange}
          categories={categories}
          onCreate={onCreate}
          onToggleEditCategory={onToggleEditCategory}
        />
      </CategoryEditModal>
    );
  }
}

export default connect(
  ({ write }: State) => ({
    open: write.categoryModal.open,
    categories: write.categoryModal.categories,
  }),
  () => ({}),
)(CategoryEditModalContainer);
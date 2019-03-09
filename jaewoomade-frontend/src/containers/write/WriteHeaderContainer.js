// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'store';
import { WriteActions } from 'store/actionCreators';
import WriteHeader from 'components/write/WriteHeader';
import type { PostData } from 'store/modules/write';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

type Props = {
  title: string,
  body: string,
  postData: ?PostData,
  categories: ?(Category[]),
  tags: string[],
  writeExtraOpen: boolean,
};

class WriteHeaderContainer extends Component<Props> {
  onChangeTitle = (e) => {
    const { value } = e.target;
    WriteActions.editField({
      field: 'title',
      value,
    });
  }

  onOpenSubmitBox = () => {
    WriteActions.openSubmitBox();
  };

  onCloseSubmitBox = () => {
    WriteActions.closeSubmitBox();
  }

  onTempSave = async () => {
    const { postData, title, body, tags, categories } = this.props;

    const activeCategories = (() => {
      if (!categories || categories.length === 0) return [];
      return categories.filter(c => c.active).map(c => c.id);
    })();

    if (!postData) {
      WriteActions.writePost({
        title,
        body,
        tags,
        isMarkdown: true,
        isTemp: true,
        categories: activeCategories,
      });
    }
    if (postData && postData.is_temp) {
      WriteActions.updatePost({
        id: postData.id,
        title,
        body,
        tags,
        is_temp: postData.is_temp,
        categories: activeCategories,
      });
    }
    if (this.props.postData) {
      await WriteActions.tempSave({ title, body, postId: this.props.postData.id });
    }
  };

  onShowWriteExtra = () => {
    WriteActions.showWriteExtra();
  };

  onHideWriteExtra = () => {
    WriteActions.hideWriteExtra();
  };

  onGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { onChangeTitle, onOpenSubmitBox, onTempSave, onShowWriteExtra, onHideWriteExtra } = this;
    const { title, postData, writeExtraOpen } = this.props;
    return (
      <WriteHeader
        onOpenSubmitBox={onOpenSubmitBox}
        onChangeTitle={onChangeTitle}
        onShowWriteExtra={onShowWriteExtra}
        onHideWriteExtra={onHideWriteExtra}
        title={title}
        onTempSave={onTempSave}
        isEdit={!!postData && !postData.is_temp}
        writeExtraOpen={writeExtraOpen}
        onGoBack={this.onGoBack}
      />
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ write }: State) => ({
      title: write.title,
      body: write.body,
      postData: write.postData,
      categories: write.submitBox.categories,
      tags: write.submitBox.tags,
      writeExtraOpen: write.writeExtra.visible,
    }),
    () => ({}),
  ),
)(WriteHeaderContainer);
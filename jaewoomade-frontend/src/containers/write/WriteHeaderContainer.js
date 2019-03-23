// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import type { State } from 'store';
import { WriteActions } from 'store/actionCreators';
import WriteHeader from 'components/write/WriteHeader';
import Blocker from 'components/common/Blocker';
import type { PostData } from 'store/modules/write';
import queryString from 'query-string';
import { compose } from 'redux';
import { Prompt, withRouter } from 'react-router-dom';

type Props = {
  title: string,
  body: string,
  postData: ?PostData,
  categories: ?(Category[]),
  tags: string[],
  writeExtraOpen: boolean,
};

class WriteHeaderContainer extends Component<Props> {
  timer = null;

  componentDidMount() {
    this.timer = setInterval(this.autoTempSave, 30000);
    // reads edit_id
    const query = queryString.parse(this.props.location.search);
    if (query.edit_id) {
      this.loadPost(query.edit_id);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  autoTempSave = () => {
    const { postData, changed } = this.props;
    if (!postData || !changed) return;
    this.onTempSave();
  };

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
    const { postData, title, body, tags, categories, thumbnail } = this.props;

    const activeCategories = (() => {
      if (!categories || categories.length === 0) return [];
      return categories.filter(c => c.active).map(c => c.id);
    })();

    try {
      if (!postData) {
        await WriteActions.writePost({
          title,
          body,
          tags,
          isMarkdown: true,
          isTemp: true,
          thumbnail,
          categories: activeCategories,
        });
      }
      if (postData && postData.is_temp) {
        await WriteActions.updatePost({
          id: postData.id,
          title,
          body,
          tags,
          is_temp: postData.is_temp,
          thumbnail,
          categories: activeCategories,
        });
      }
      if (this.props.postData) {
        await WriteActions.tempSave({ title, body, postId: this.props.postData.id });
      }
    } catch (e) {
      console.log(e);
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
    const { onChangeTitle,
      onOpenSubmitBox, onTempSave,
      onShowWriteExtra, onHideWriteExtra, changed } = this;
    const { title, postData, writeExtraOpen } = this.props;
    return (
      <Fragment>
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
        <Prompt
          when={!!title && changed}
          message={() => '작성중이던 포스트가 있습니다. 정말로 나가시겠습니까?'}
        />
        {changed && <Blocker />}
      </Fragment>
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
      thumbnail: write.thumbnail,
      changed: write.changed,
    }),
    () => ({}),
  ),
)(WriteHeaderContainer);
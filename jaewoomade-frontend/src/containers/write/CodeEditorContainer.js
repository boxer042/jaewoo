import React, { Component, Fragment } from 'react';
import CodeEditor from 'components/write/CodeEditor';
import { connect } from 'react-redux';
import { WriteActions } from 'store/actionCreators';
import FloatingImageButton from 'components/write/FloatingImageButton';
import DropImage from 'components/write/DropImage';
import WriteUploadMask from 'components/write/WriteUploadMask';
import axios from 'lib/defaultClient';
import type { PostData, Category } from 'store/modules/write';
import { escapeForUrl } from 'lib/common';

type Props = {
  body: string,
  mask: boolean,
  postData: ?PostData,
  tags: string[],
  categories: ?(Category[]),
  insertText: ?string,
}

class CodeEditorContainer extends Component<Props> {
  onEditBody = (value) => {
    WriteActions.editField({
      field: 'body',
      value,
    });
  }

  onUploadClick = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = () => {
      if (!upload.files) return;
      const file = upload.files[0];
      console.log(file);
    };
    upload.click();
  }

  onDragEnter = (e) => {
    e.preventDefault();
    setImmediate(() => {
      WriteActions.setUploadMask(true);
    });
  };

  onDragLeave = (e) => {
    e.preventDefault();
    if (!e.relatedTarget) WriteActions.setUploadMask(false);
  };

  uploadImage = async (file: any) => {
    WriteActions.setUploadMask(false);
    // console.log(file);
    // temp save post if there isn't one.
    // uploading needs postId
    if (!this.props.postData) {
      await WriteActions.setTempData();
      const { title, body, tags, categories } = this.props;
      const activeCategories = (() => {
        if (!categories || categories.length === 0) return [];
        return categories.filter(c => c.active).map(c => c.id);
      })();
      try {
        await WriteActions.writePost({
          title,
          body,
          tags,
          isMarkdown: true,
          isTemp: true,
          categories: activeCategories,
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (!this.props.postData) return;
    const { id } = this.props.postData;
    const data = new FormData();
    data.append('post_id', id);
    data.append('image', file);
    try {
      const response = await axios.post('/files/upload', data, {
        onUploadProgress: (e) => {
          console.log(`${e.loaded}/${e.total}`);
        },
      });
      const sp = response.data.path.split('/');
      const imageUrl = `![${sp[sp.length - 1]}](https://images.jaewoomade.com/${
        response.data.path
      })${'\n'}`;
      WriteActions.setInsertText(imageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  onClearInsertText = () => {
    WriteActions.setInsertText(null);
  };

  onDrop = (e: any) => {
    e.preventDefault();
    const { /* items, */ files } = e.dataTransfer;
    // TODO: Some other browser user 'items'
    if (!files) return;
    this.uploadImage(files[0]);
    // if (files) {
    //   const filesArray = [...files];
    //   const data = new FormData();
    //   data.append('image', files[0]);
    //   data.append('post_id', '6980e4f0-d823-11e8-b291-d746a4b0f7c6');
    //   axios.post('files/upload', data, {
    //     onUploadProgress: (uploadEvent) => {
    //       console.log(`${uploadEvent.loaded * 100}/${uploadEvent.total}`);
    //     },
    //   });
    // }
  };

  componentWillUnmount() {
    WriteActions.reset(); // reset Write Module on page leave
  }

  render() {
    const { onEditBody, onDragEnter, onDragLeave, onDrop, onClearInsertText } = this;
    const { body, mask, insertText } = this.props;
    return (
      <Fragment>
        <CodeEditor
          onEditBody={onEditBody}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onClearInsertText={onClearInsertText}
          body={body}
          insertText={insertText}
          imageButton={
            <FloatingImageButton onClick={this.onUploadClick} />}
        />
        <DropImage
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        />
        <WriteUploadMask visible={mask} />
      </Fragment>
    );
  }
}

export default connect(
  ({ write }: State) => ({
    title: write.title,
    body: write.body,
    postData: write.postData,
    categories: write.submitBox.categories,
    tags: write.submitBox.tags,
    mask: write.upload.mask,
    insertText: write.insertText,
  }),
  () => ({}),
)(CodeEditorContainer);
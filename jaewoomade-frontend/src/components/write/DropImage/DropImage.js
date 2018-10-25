// @flow
import React, { Component } from 'react';
import axios from 'lib/defaultClient';
import './DropImage.scss';

type Props = { }


class DropImage extends Component<Props> {
  componentDidMount() {
    this.applyListeners();
  }

  applyListeners = () => {
    if (!document || !document.body) return;
    document.body.addEventListener('drop', this.onDrop);
  }

  componentWillUnmount() {
  }

  onDrop = (e: any) => {
    e.preventDefault();
    const { items, files } = e.dataTransfer;
    if (files) {
      const filesArray = [...files];
      console.log(filesArray);
      const data = new FormData();
      data.append('image', files[0]);
      data.append('post_id', '6980e4f0-d823-11e8-b291-d746a4b0f7c6');
      axios.post('files/upload', data, {
        onUploadProgress: (uploadEvent) => {
          console.log(`${uploadEvent.loaded * 100}/${uploadEvent.total}`);
        },
      });
    }
  };

  render() {
    return (
      <div />
    );
  }
}


export default DropImage;
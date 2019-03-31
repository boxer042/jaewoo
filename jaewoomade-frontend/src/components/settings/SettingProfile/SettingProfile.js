import React, { Component } from 'react';
import Button from 'components/common/Button';
import TextareaAutosize from 'react-autosize-textarea';
import defaultThumbnail from 'static/images/default_thumbnail.png';

import './SettingProfile.scss';

class SettingProfile extends Component {
  render() {
    return (
      <div className="SettingProfile">
        <div className="thumbnail-area">
          <img src={defaultThumbnail} alt="thumbnail" />
          <Button large fullWidth>
            썸네일 변경
          </Button>
        </div>
        <form>
          <input
            name="displayName"
            placeholder="이름"
          />
          <TextareaAutosize
            name="shortBio"
            placeholder="짧은 소개"
          />
          <div className="right">
            <Button cancel>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SettingProfile;
import React, { Component } from 'react';
import Button from 'components/common/Button';
import TextareaAutosize from 'react-autosize-textarea';
import defaultThumbnail from 'static/images/default_thumbnail.png';

import './SettingProfile.scss';

class SettingProfile extends Component {
  state = {
    editing: false,
    displayName: '',
    shortBio: '',
  }

  constructor(props: Props) {
    super(props);
    const { profile } = this.props;
    this.state.displayName = profile.display_name;
    this.state.shortBio = profile.short_bio;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.profile !== this.props.profile || (!prevState.editing && this.state.editing)) {
      const { display_name, short_bio } = this.props.profile;
      this.setState({
        displayName: display_name,
        shortBio: short_bio,
      });
    }
  }

  onToggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing,
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { displayName, shortBio } = this.state;
    try {
      await this.props.onUpdateProfile({
        displayName,
        shortBio,
      });
      this.setState({
        editing: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { profile, onUploadThumbnail } = this.props;
    const { editing, displayName, shortBio } = this.state;
    return (
      <div className="SettingProfile">
        <div className="thumbnail-area">
          <img src={profile.thumbnail || defaultThumbnail} alt="thumbnail" />
          <Button large fullWidth onClick={onUploadThumbnail}>
            썸네일 변경
          </Button>
        </div>
        {editing ? (
          <form onSubmit={this.onSubmit}>
            <input
              onChange={this.onChange}
              name="displayName"
              placeholder="이름"
              value={displayName}
            />
            <TextareaAutosize
              onChange={this.onChange}
              name="shortBio"
              placeholder="짧은 소개"
              value={shortBio}
            />
            <div className="right">
              <Button cancel onClick={this.onToggleEdit}>
                취소
              </Button>
              <Button type="submit">저장</Button>
            </div>
          </form>
        ) : (
          <div className="user-info">
            <h3 className="display-name">{profile.display_name}</h3>
            <p className="short-desc">{profile.short_bio}</p>
            <div className="right">
              <Button onClick={this.onToggleEdit} theme="transparent">
                수정
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SettingProfile;
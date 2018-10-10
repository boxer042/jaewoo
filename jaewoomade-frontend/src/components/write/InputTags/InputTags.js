// @flow
import React, { Component } from 'react';
import uniqBy from 'lodash/uniqBy';
import RemoveIcon from 'react-icons/lib/md/remove-circle';

import './InputTags.scss';

type Props = {
  tags: string,
};

type State = {
  input: ''
};

const Tag = ({ name, onRemove }) => (
  <div className="tag">
    <div className="text">{name}</div>
    <div className="remove" onClick={onRemove}>
    <RemoveIcon />
    </div>
  </div>
);

class InputTags extends Component<Props, State> {
  static defaultProps = {
    tags: ['태그1', '태그2', '태그3'],
  };

  state = {
    input: '',
  };

  onChange = (e: any) => {
    this.setState({
      input: e.target.value,
    });
  };

  onKeyUp = (e: any) => {
    if (['Enter', ','].indexOf(e.key) !== -1) {
      this.onButtonClick();
      e.preventDefault();
    }
  }

  onButtonClick = () => {
    const { input } = this.state;
    const tags = input.split(',');
    this.setState({
      input: '',
    });
  };

  renderTags() {
    const { tags, onRemove } = this.props;
    return tags.map(tag => (<Tag key={tag} name={tag} onRemove={onRemove} />));
  }

  render() {
    const { onChange, onButtonClick, onKeyUp } = this;
    const { input } = this.state;

    return (
      <div className="InputTags">
        <div className="input-button">
        <input placeholder="태그를 입력하세요" value={input} onChange={onChange} onKeyUp={onKeyUp} />
          <div className="button util flex-center" onClick={onButtonClick}>등록</div>
        </div>
        <div id="tags" className="tags" ref={(ref) => { this.tags = ref; }}>
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

export default InputTags;
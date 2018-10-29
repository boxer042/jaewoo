// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import WriteSelectLayouts from '../WriteSelectLayouts';
import './WriteExtra.scss';

type Props = {
  visible: boolean,
  mode: string,
  onSelectLayoutMode(mode: string): void,
}

type State = {
  animatin: boolean,
};


class WriteExtra extends Component<Props, State> {
  animateTimeout: any;
  state = {
    animating: false,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible !== prevProps.visible) {
      this.animate();
    }
  }

  animate = () => {
    clearTimeout(this.animateTimeout);
    this.setState({
      animating: true,
    });
    this.animateTimeout = setTimeout(() => {
      this.setState({
        animating: false,
      });
    }, 150);
  };

  onSelectLayoutMode = (mode: string) => {
    this.props.onSelectLayoutMode(mode);
  };

  render() {
    const { animating } = this.state;
    const { visible, mode, tempSaveList } = this.props;

    if (!visible && !animating) return null;

    return (
      <div className={cx('WriteExtra', visible ? 'appear' : 'disappear')}>
        <section>
          <h4>레이아웃 설정</h4>
          <WriteSelectLayouts onSelect={this.onSelectLayoutMode} mode={mode} />
        </section>
        <section className="full">
          <h4>임시 저장 기록</h4>
        </section>
      </div>
    );
  }
}


export default WriteExtra;
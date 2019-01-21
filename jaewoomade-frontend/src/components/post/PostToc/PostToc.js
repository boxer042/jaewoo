// @flow
import React, { Component } from 'react';
import type { TocItem } from 'store/modules/posts';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { getScrollTop } from 'lib/common';
import './PostToc.scss';

type Props = {
  toc: ?(TocItem[]),
  activeHeading: ?string,
};

type State = {
  fixed: boolean,
};


class PostToc extends Component<Props> {
  render() {
    const { toc } = this.props;
    if (!toc) return null;

    return (
      <div className="PostToc">
        <ul>
          {
            toc.map(({ anchor, level, text }) => <li><a href={`#${anchor}`}>{text}</a></li>)
          }
        </ul>
      </div>
    );
  }
}


export default PostToc;
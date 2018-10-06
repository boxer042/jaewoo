// @flow
import React from 'react';
import MarkdownRender from '../../common/MarkdownRender';
import './MarkdownPreview.scss';

type Props = {
  title: string,
  body: string,
};

const MarkdownPreview = ({ title, body }: Props) => {
  return (
    <div className="MarkdownPreview" id="preview">
    <h1>{title}</h1>
      <MarkdownRender body={body} />
    </div>
  );
};

export default MarkdownPreview;
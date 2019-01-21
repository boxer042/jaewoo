// @flow
import React from 'react';
import { escapeForUrl } from 'lib/common';
import { Link } from 'react-router-dom';
import './PostTags.scss';

type Props = {
  tags: string[],
};

const PostTags = ({ tags }: Props) => (
  <div className="PostTags">
    {tags.map(t => (
      <Link to="#" key={t}>
        {t}
      </Link>
    ))}
  </div>
);

export default PostTags;

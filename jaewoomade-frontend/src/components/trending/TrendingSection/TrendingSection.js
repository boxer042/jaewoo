// @flow
import React from 'react';

import './TrendingSection.scss';

type Props = {
  title: string,
  children: Node,
};

const TrendingSection = ({ children, title }: Props) => (
  <div className="TrendingSection">
    <h2>{title}</h2>
    <div className="contents">{children}</div>
  </div>
);


export default TrendingSection;
import React from 'react';
import TrendingTemplate from './../components/trending/TrendingTemplate/TrendingTemplate';
import TrendingSection from './../components/trending/TrendingSection/TrendingSection';
import TrendingPostCards from '../containers/list/TrendingPostCards';

type Props = {};

const Trending = (props: Props) => {
  return (
    <TrendingTemplate>
      <TrendingSection title="지금 뜨고 있는 포스트">
        <TrendingPostCards />
      </TrendingSection>
    </TrendingTemplate>
  );
};

export default Trending;
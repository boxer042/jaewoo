import React from 'react';
import { Helmet } from 'react-helmet';
import TrendingTemplate from './../components/trending/TrendingTemplate/TrendingTemplate';
import TrendingSection from './../components/trending/TrendingSection/TrendingSection';
import TrendingPostCards from '../containers/list/TrendingPostCards';

const Trending = () => {
  return (
    <TrendingTemplate>
      <Helmet>
        <title>지금 뜨고 있는 포스트 | jaewoomade</title>
        <meta
          name="description"
          content="지금 뜨고있는 다양한 포스트를 확인하세요. 실시간으로 인기있는 포스트들을 읽을 수 있습니다."
        />
      </Helmet>
      <TrendingSection title="지금 뜨고 있는 포스트">
        <TrendingPostCards />
      </TrendingSection>
    </TrendingTemplate>
  );
};

export default Trending;
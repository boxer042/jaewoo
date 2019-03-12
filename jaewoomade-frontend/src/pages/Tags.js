import React from 'react';
import TagsTemplate from 'components/tags/TagsTemplate/TagsTemplate';
import TagItemListContainer from 'containers/tags/TagItemListContainer';
import TagsTab from 'components/tags/TagsTab/TagsTab';
import queryString from 'query-string';

const Tags = ({ location, match, history }) => {
  const { sort } = queryString.parse(location.search);
  const { tag } = match.params;

  return (
    <TagsTemplate>
      <TagsTab sort={sort} />
      <TagItemListContainer sort={sort} />
    </TagsTemplate>
  );
};

export default Tags;
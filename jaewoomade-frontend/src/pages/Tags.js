import React, { Fragment } from 'react';
import TagsTemplate from 'components/tags/TagsTemplate/TagsTemplate';
import TagItemListContainer from 'containers/tags/TagItemListContainer';
import TagsTab from 'components/tags/TagsTab/TagsTab';
import queryString from 'query-string';
import TagCurrentContainer from 'containers/tags/TagCurrentContainer';
import TagPostCards from 'containers/list/TagPostCards';

const Tags = ({ location, match, history }) => {
  const { sort } = queryString.parse(location.search);
  const { tag } = match.params;

  return (
    <TagsTemplate>
      {tag ? (
        <Fragment>
          <TagCurrentContainer tag={tag} />
          <TagPostCards />
        </Fragment>
      ) : (
        <Fragment>
          <TagsTab sort={sort} />
          <TagItemListContainer sort={sort} />
        </Fragment>
      )}
    </TagsTemplate>
  );
};

export default Tags;
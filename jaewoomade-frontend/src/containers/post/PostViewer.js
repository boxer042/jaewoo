import React, { Component, Fragment } from 'react';
import PostHead from 'components/post/PostHead';
import PostContent from 'components/post/PostContent';
import PostTags from 'components/post/PostTags';
import { PostsActions } from 'store/actionCreators';
import { connect } from 'react-redux';
import type { State } from 'store';
import type { PostData, TocItem } from 'store/modules/posts';
import PostToc from 'components/post/PostToc';
import throttle from 'lodash/throttle';

type Props = {
  username: ?string,
  urlSlug: ?string,
  post: ?PostData,
  activeHeading: ?string,
};

class PostViewer extends Component<Props> {
  initialize = async () => {
    const { username, urlSlug } = this.props;
    if (!username || !urlSlug) return;
    try {
      PostsActions.readPost({
        username,
        urlSlug,
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  onSetToc = (toc: ?(TocItem[])) => {
    PostsActions.setToc(toc);
  };

  onActivateHeading = throttle((headingId: string) => {
    PostsActions.activateHeading(headingId);
  }, 250);

  render() {
    const { post, toc, activeHeading } = this.props;
    const { onSetToc, onActivateHeading } = this;

    if (!post) return null;

    return (
      <Fragment>
        <PostToc toc={toc} activeHeading={activeHeading} />
        <PostHead
          id={post.id}
          date={post.created_at}
          title={post.title}
          tags={post.tags}
          categories={post.categories}
          user={post.user}
        />
        <PostContent
          thumbnail={post.thumbnail}
          body={post.body}
          onSetToc={onSetToc}
          onActivateHeading={onActivateHeading}
        />
        <PostTags tags={post.tags} />
      </Fragment>
    );
  }
}

export default connect(
  ({ posts }: State) => ({
    post: posts.post,
    toc: posts.toc,
    activeHeading: posts.activeHeading,
  }),
  () => ({}),
)(PostViewer);
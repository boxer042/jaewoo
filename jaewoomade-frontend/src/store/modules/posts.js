// @flow
import { createAction, handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';
import * as PostsAPI from 'lib/api/posts';
import * as CommentsAPI from 'lib/api/posts/comments';
import * as LikesAPI from 'lib/api/posts/like';
import { applyPenders, type ResponseAction } from 'lib/common';

export type TocItem = {
  anchor: string,
  level: number,
  text: string,
};

/* ACTION TYPE */
const READ_POST = 'posts/READ_POST';
const SET_TOC = 'posts/SET_TOC';
const ACTIVATE_HEADING = 'posts/ACTIVATE_HEADING';

const WRITE_COMMENT = 'posts/WRITE_COMMENT';
const READ_COMMENTS = 'posts/READ_COMMENTS';
const READ_SUBCOMMENTS = 'posts/READ_SUBCOMMENTS';

const LIKE = 'posts/LIKE';
const UNLIKE = 'posts/UNLIKE';
const GET_LIKES_COUNT = 'posts/GET_LIKES_COUNT';


export const actionCreators = {
  readPost: createAction(READ_POST, PostsAPI.readPost),
  setToc: createAction(SET_TOC, (toc: ?(TocItem[])) => toc),
  activateHeading: createAction(ACTIVATE_HEADING, (headingId: string) => headingId),
  writeComment: createAction(WRITE_COMMENT, CommentsAPI.writeComment),
  readComments: createAction(READ_COMMENTS, CommentsAPI.readComments),
  readSubcomments: createAction(READ_SUBCOMMENTS, CommentsAPI.readSubcomments, meta => meta),
  like: createAction(LIKE, LikesAPI.like),
  unlike: createAction(UNLIKE, LikesAPI.unlike),
  getLikesCount: createAction(GET_LIKES_COUNT, LikesAPI.getLikesCount),
};

type SetTocAction = ActionType<typeof actionCreators.setToc>;
type ActivateHeadingAction = ActionType<typeof actionCreators.activateHeading>;

export type Categories = { id: string, name: string, url_slug: string }[];

export type PostData = {
  id: string,
  title: string,
  body: string,
  thumbnail: ?string,
  is_markdown: boolean,
  created_at: string,
  updated_at: string,
  tags: string[],
  categories: Categories,
  url_slug: string,
  likes: number,
  comments_count: 0,
  user: {
    username: string,
    id: string,
    thumbnail: ?string,
    short_bio: ?string,
  },
}


export type Posts = {
  post: ?PostData,
  toc: ?(TocItem[]),
  activeHeading: ?string,
}

const initialState: Posts = {
  post: null,
  toc: null,
  activeHeading: null,
  comments: null,
  subcommentsMap: {},
};

const reducer = handleActions({
  [SET_TOC]: (state, action: SetTocAction) => {
    return produce(state, (draft) => {
      draft.toc = action.payload;
    });
  },
  [ACTIVATE_HEADING]: (state, action: ActivateHeadingAction) => {
    return produce(state, (draft) => {
      draft.activeHeading = action.payload;
    });
  },
}, initialState);

export default applyPenders(reducer, [
  {
    type: READ_POST,
    onSuccess: (state: Posts, action: ResponseAction) => {
      return produce(state, (draft) => {
        if (!action.payload) return;
        draft.post = action.payload.data;
      });
    },
  },
  {
    type: WRITE_COMMENT,
    onSuccess: (state: Posts, action: ResponseAction) => {
      return produce(state, (draft) => {
        if (draft.comments) {
          // draft.comments.push(action.payload.data);
          return;
        }
        draft.comments = [action.payload.data];
      });
    },
  },
  {
    type: READ_COMMENTS,
    onSuccess: (state, action) => {
      return {
        ...state,
        comments: action.payload.data,
      };
    },
  },
  {
    type: READ_SUBCOMMENTS,
    onSuccess: (state: Posts, action: ResponseAction) => {
      return produce(state, (draft) => {
        const { parentId, commentId } = action.meta;
        // is root comment
        if (!draft.comments) return;
        let comment = null;
        if (!parentId) {
          comment = draft.comments.find(c => c.id === commentId);
        } else {
          if (!draft.subcommentsMap[parentId]) return;
          comment = draft.subcommentsMap[parentId].find(c => c.id === commentId);
        }
        if (!comment) return;
        comment.replies_count = action.payload.data.length;
        draft.subcommentsMap[action.meta.commentId] = action.payload.data;
      });
    },
  },
  {
    type: LIKE,
    onPending: (state: Posts) => {
      return produce(state, (draft) => {
        if (draft.post) {
          draft.post.likes += 1;
          draft.post.liked = true;
        }
      });
    },
    onSuccess: (state: Posts, action: ResponseAction) => {
      return produce(state, (draft) => {
        if (draft.post) {
          draft.post.likes = action.payload.data && action.payload.data.likes;
          draft.post.liked = true;
        }
      });
    },
    onFailure: (state: Posts) => {
      return produce(state, (draft) => {
        if (draft.post) {
          draft.post.likes -= 1;
          draft.post.liked = false;
        }
      });
    },
  },
  {
    type: UNLIKE,
    onPending: (state: Posts) => {
      return produce(state, (draft) => {
        if (draft.post) {
          draft.post.likes -= 1;
          draft.post.liked = false;
        }
      });
    },
    onSuccess: (state: Posts, action: ResponseAction) => {
      return produce(state, (draft) => {
        if (draft.post) {
          draft.post.likes = action.payload.data && action.payload.data.likes;
          draft.post.liked = false;
        }
      });
    },
    onFailure: (state: Posts) => {
      return produce(state, (draft) => {
        if (draft.post) {
          draft.post.likes += 1;
          draft.post.liked = true;
        }
      });
    },
  },
]);
import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'lib/common';
import * as CommonAPI from 'lib/api/common';
import produce from 'immer';
import * as PostsAPI from 'lib/api/posts';

const GET_TAGS = 'common/GET_TAGS';
const SET_TAG_INFO = 'common/SET_TAG_INFO';
const GET_TAG_INFO = 'common/GET_TAG_INFO';

export const actionCreators = {
  getTags: createAction(GET_TAGS, CommonAPI.getTags, meta => meta),
  setTagInfo: createAction(SET_TAG_INFO, info => info),
  getTagInfo: createAction(GET_TAG_INFO, CommonAPI.getTagInfo),
};

const initialState = {
  tags: {
    data: null,
    selected: null,
    lastParam: null,
    sort: 'popular',
  },
};

const reducer = handleActions(
  {
    [SET_TAG_INFO]: (state, { payload }: SetTagInfoAction) => {
      return produce(state, (draft) => {
        draft.tags.selected = payload;
      });
    },
  }, initialState,
);

export default applyPenders(reducer, [
  {
    type: GET_TAGS,
    onSuccess: (state, { payload, meta }) => {
      return produce(state, (draft) => {
        draft.tags.data = payload.data;
        draft.tags.sort = meta;
      });
    },
  },
  {
    type: GET_TAG_INFO,
    onPending: (state, action) => {
      return produce(state, (draft) => {
        draft.tags.lastParam = action.meta;
      });
    },
    onSuccess: (state, { payload }) => {
      return produce(state, (draft) => {
        draft.tags.selected = payload.data;
      });
    },
  },
]);
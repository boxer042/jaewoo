import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'lib/common';
import * as CommonAPI from 'lib/api/common';
import produce from 'immer';
import * as PostsAPI from 'lib/api/posts';

const GET_TAGS = 'common/GET_TAGS';

export const actionCreators = {
  getTags: createAction(GET_TAGS, CommonAPI.getTags, meta => meta),
};

const initialState = {
  tags: {
    data: null,
    selected: null,
    lastParm: null,
    sort: 'popular',
  },
};

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: GET_TAGS,
    onSuccess: (state, { payload }) => {
      return produce(state, (draft) => {
        draft.tags.data = payload.data;
      });
    },
  },
]);
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';
import * as UsersAPI from 'lib/api/users';

const GET_USER_TAGS = 'profile/GET_USER_TAGS';
const GET_PROFILE = 'profile/GET_PROFILE';

export const actionCreators = {
  getUserTags: createAction(GET_USER_TAGS, UsersAPI.listUserTags),
  getProfile: createAction(GET_PROFILE, UsersAPI.getProfile),
};

const initialState = {
  tagCounts: null,
  profile: null,
  rawTagName: null,
  userHistory: null,
  prefetchedHistory: null,
  side: true,
  historyEnd: false,
};

const reducer = handleActions(
  {

  },
  initialState,
);

export default applyPenders(reducer, [
  {
    type: GET_USER_TAGS,
    onSuccess: (state, action) => {
      return {
        ...state,
        tagCounts: action.payload.data,
      };
    },
  },
  {
    type: GET_PROFILE,
    onPending: (state: ProfileState) => {
      return {
        ...state,
        rawTagName: null,
      };
    },
    onSuccess: (state: ProfileState, action: ProfileResponseAction) => {
      return {
        ...state,
        profile: action.payload.data,
      };
    },
  },
]);
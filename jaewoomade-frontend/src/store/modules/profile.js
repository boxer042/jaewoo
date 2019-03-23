import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';
import * as UsersAPI from 'lib/api/users';
import * as CommonAPI from 'lib/api/common';

const GET_USER_TAGS = 'profile/GET_USER_TAGS';
const GET_PROFILE = 'profile/GET_PROFILE';
const SET_RAW_TAG_NAME = 'profile/SET_RAW_TAG_NAME';
const INITIALIZE = 'profile/INITIALIZE';
const GET_TAG_INFO = 'profile/GET_TAG_INFO';

export const actionCreators = {
  initialize: createAction(INITIALIZE),
  getUserTags: createAction(GET_USER_TAGS, UsersAPI.listUserTags),
  getProfile: createAction(GET_PROFILE, UsersAPI.getProfile),
  setRawTagName: createAction(SET_RAW_TAG_NAME, tagName => tagName),
  getTagInfo: createAction(GET_TAG_INFO, CommonAPI.getTagInfo),
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
    [INITIALIZE]: state => ({ ...initialState, side: state.side }),
    [SET_RAW_TAG_NAME]: (state, { payload }: SetRawTagNameAction) => {
      return {
        ...state,
        rawTagName: payload,
      };
    },
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
  {
    type: GET_TAG_INFO,
    onSuccess: (state: ProfileState, { payload }: GetTagInfoResponseAction) => {
      return {
        ...state,
        rawTagName: payload.data.name,
      };
    },
  },
]);
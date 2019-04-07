import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'lib/common';
import { getProfile } from 'lib/api/users';
import {
  updateProfile,
  createThumbnailSignedUrl,
  generateUnregisterToken,
  unregister,
} from 'lib/api/me';
import produce from 'immer';

const GET_PROFILE = 'settings/GET_PROFILE';
const UPDATE_PROFILE = 'settings/UPDATE_PROFILE';
const CREATE_THUMBNAIL_SIGNED_URL = 'settings/CREATE_THUMBNAIL_SIGNED_URL';
const ASK_UNREGISTER = 'settings/ASK_UNREGISTER';
const GENERATE_UNREGISTER_TOKEN = 'settings/GENERATE_UNREGISTER_TOKEN';
const UNREGISTER = 'settings/UNREGISTER';

export const actionCreators = {
  getProfile: createAction(GET_PROFILE, getProfile),
  updateProfile: createAction(UPDATE_PROFILE, updateProfile),
  createThumbnailSignedUrl: createAction(CREATE_THUMBNAIL_SIGNED_URL, createThumbnailSignedUrl),
  askUnregister: createAction(ASK_UNREGISTER, open => open),
  generateUnregisterToken: createAction(GENERATE_UNREGISTER_TOKEN, generateUnregisterToken),
  unregister: createAction(UNREGISTER, unregister),
};

const initialState = {
  profile: null,
  uploadInfo: null,
  askUnregister: false,
  unregisterToken: null,
};

const reducer = handleActions(
  {
    [ASK_UNREGISTER]: (state, { payload }) => {
      return {
        ...state,
        askUnregister: payload,
      };
    },
  },
  initialState,
);

export default applyPenders(reducer, [
  {
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      return {
        ...state,
        profile: action.payload.data,
      };
    },
  },
  {
    type: UPDATE_PROFILE,
    onSuccess: (state, action) => {
      return {
        ...state,
        profile: action.payload.data,
      };
    },
  },
  {
    type: CREATE_THUMBNAIL_SIGNED_URL,
    onSuccess: (state: SettingsState, action: SignedUrlResponseAction) => {
      return {
        ...state,
        uploadInfo: action.payload.data,
      };
    },
  },
  {
    type: GENERATE_UNREGISTER_TOKEN,
    onSuccess: (state: SettingsState, action: GenerateUnregisterTokenResponseAction) => {
      return {
        ...state,
        unregisterToken: action.payload.data.unregister_token,
      };
    },
  },
]);
// @flow
import { bindActionCreators } from 'redux';
import store from './index';

import { actionCreators as authActions, type AuthActionCreators } from './modules/auth';
import { actionCreators as userActions, type UserActionCreators } from './modules/user';
import { actionCreators as baseActions, type BaseActionCreators } from './modules/base';
import { actionCreators as writeActions, type WriteActionCreators } from './modules/write';
import { actionCreators as postsActions, type PostsActionCreators } from './modules/posts';
import { actionCreators as listingActions, type ListingActionCreators } from './modules/listing';
import { actionCreators as profileActions } from './modules/profile';
import { actionCreators as followActions } from './modules/follow';
import { actionCreators as commonActions } from './modules/common';
import { actionCreators as settingsActions } from './modules/settings';

const { dispatch } = store;

export const AuthActions: AuthActionCreators = bindActionCreators(authActions, dispatch);
export const UserActions: UserActionCreators = bindActionCreators(userActions, dispatch);
export const BaseActions: BaseActionCreators = bindActionCreators(baseActions, dispatch);
export const WriteActions: WriteActionCreators = bindActionCreators(writeActions, dispatch);
export const PostsActions: PostsActionCreators = bindActionCreators(postsActions, dispatch);
export const ListingActions: ListingActionCreators = bindActionCreators(listingActions, dispatch);
export const ProfileActions: ProfileActionCreators = bindActionCreators(profileActions, dispatch);
export const FollowActions = bindActionCreators(followActions, dispatch);
export const CommonActions: typeof commonActions = bindActionCreators(commonActions, dispatch);
export const SettingsActions = bindActionCreators(settingsActions, dispatch);
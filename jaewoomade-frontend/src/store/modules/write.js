// @flow
import { createAction, handleActions } from 'redux-actions';
import { Record, List, type Map } from 'immutable';
import { pender } from 'redux-pender';
import * as MeAPI from 'lib/api/me';

const EDIT_FIELD = 'write/EDIT_FIELD';
const OPEN_SUBMIT_BOX = 'write/OPEN_SUBMIT_BOX';
const CLOSE_SUBMIT_BOX = 'write/CLOSE_SUBMIT_BOX';
const LIST_CATEGORIES = 'user/LIST_CATEGORIES';


export type WriteActionCreators = {
  editField({field: string, value: string}): any,
  openSubmitBox(): any,
  closeSubmitBox(): any,
  listCategories(): any,
}

export const actionCreators = {
  editField: createAction(EDIT_FIELD),
  openSubmitBox: createAction(OPEN_SUBMIT_BOX),
  closeSubmitBox: createAction(CLOSE_SUBMIT_BOX),
  listCategories: createAction(LIST_CATEGORIES, MeAPI.listCategories),
};

export type Category = {
  id: string,
  order: number,
  parent: string,
  private: boolean,
  name: string,
  urlSlug: string,
  active: boolean,
};

export type Categories = List<Category>;

export type SubmitBox = {
  open: boolean,
};

export type Write = {
  body: string,
  title: string,
  submitBox: SubmitBox,
  categories: ?Categories,
};

const CategorySubrecord = Record({
  id: '',
  order: 0,
  parent: null,
  private: false,
  name: '',
  urlSlug: '',
  active: false,
});

const SubmitBoxSubrecord = Record({
  open: false,
});

const WriteRecord = Record({
  body: '',
  title: '',
  submitBox: SubmitBoxSubrecord(),
  categories: null,
});

const initialState: Map<string, *> = WriteRecord();

export default handleActions({
  [EDIT_FIELD]: (state, { payload: { field, value } }) => state.set(field, value),
  [OPEN_SUBMIT_BOX]: state => state.setIn(['submitBox', 'open'], true),
  [CLOSE_SUBMIT_BOX]: state => state.setIn(['submitBox', 'open'], false),
  ...pender({
    type: LIST_CATEGORIES,
    onSuccess: (state, { payload: { data } }) => {
      const categories = data.map(category => CategorySubrecord({
        id: category.id,
        order: category.order,
        parent: category.parent,
        private: category.private,
        name: category.name,
        urlSlug: category.url_slug,
      }));
      return state.set('categories', categories);
    },
  }),
}, initialState);
// @flow
import axios from 'lib/defaultClient';
import queryString from 'query-string';

export type WritePostPayload = {
  title: string,
  body: string,
  isMarkdown: boolean,
  isTemp: boolean,
  tags: Array<string>,
  categories: Array<string>,
  thumbnail: ?string,
}

export const writePost = (payload: WritePostPayload) => axios.post('/posts', payload);

export type UpdatePostPayload = {
  id: string,
  title: string,
  body: string,
  tags: Array<string>,
  categories: Array<string>,
  url_slug?: string,
  thumbnail: ?string,
  is_temp: boolean,
};

export const updatePost = ({ id, ...payload }: UpdatePostPayload) => axios.patch(
  `/posts/${id}`, payload,
);

export type ReadPostPayload = {
  username: string,
  urlSlug: string,
};

export const readPost = ({ username, urlSlug }: ReadPostPayload) => axios.get(`/posts/@${username}/${urlSlug}`);

export type UploadImagePayload = {
  file: any,
  post_id: string,
  onUploadProgress(): void,
};

export const uploadImage = ({ file, postId, onUploadProgress }: UploadImagePayload) => {
  const data = new FormData();
  data.append('post_id', postId);
  data.append('image', file);
  return axios.post('/files/upload', data, {
    onUploadProgress,
  });
};

export type TempSavePayload = {
  title: string,
  body: string,
  postId: string,
};

export const tempSave = ({ postId, title, body }: TempSavePayload) => {
  axios.post(`/posts/${postId}/saves`, { title, body });
};

export type CreateUploadUrlPayload = { postId: string, filename: string };
export const createUploadUrl = ({ postId, filename }: CreateUploadUrlPayload) => {
  return axios.post('/files/create-url/post-image', { post_id: postId, filename });
};

/* LISTING RELATED... */
export const getPublicPosts = (cursor: ?string) => {
  const query = cursor ? `?cursor=${cursor}` : '';
  return axios.get(`/posts/public${query}`);
};

export const getTrendingPosts = (offset) => {
  const query = offset ? `?offset=${offset}` : '';
  return axios.get(`posts/trending${query}`);
};

export const getUserPosts = ({ username, cursor, tag }: GetUserPostsPayload) => {
  const query = queryString.stringify({
    cursor,
    tag,
  });
  return axios.get(`/posts/@${username}?${query}`);
};
import axios from 'lib/defaultClient';

export const writeComment = ({ postId, text, replyTo }) =>
  axios.post(`/posts/${postId}/comments`, {
    text,
    reply_to: replyTo,
  });

export const readComments = ({ postId }) =>
  axios.get(`/posts/${postId}/comments`);

export const readSubcomments = ({ postId, commentId }) =>
  axios.get(`/posts/${postId}/comments/${commentId}/replies`);

export const removeComment = ({ postId, commentId }) => {
  return axios.delete(`/posts/${postId}/comments/${commentId}`);
};

export const editComment = ({ postId, commentId, text }) =>
  axios.patch(`/posts/${postId}/comments/${commentId}`, { text });
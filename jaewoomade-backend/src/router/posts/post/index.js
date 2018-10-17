// @flow
import Router from 'koa-router';
import needsAuth from 'lib/middlewares/needsAuth';

import * as postCtrl from './post.ctrl';
import comments from './comments';
const post: Router = new Router();

post.get('/', postCtrl.readPost);
post.patch('/', needsAuth, postCtrl.checkPostOwnership, postCtrl.updatePost);
post.delete('/', needsAuth, postCtrl.checkPostOwnership, postCtrl.deletePost);

post.get('/like', postCtrl.getLike);
post.post('/like', needsAuth, postCtrl.likePost);
post.delete('/like', needsAuth, postCtrl.unlikePost);

post.use('/comments', comments.routes());
export default post;
// @flow
import Router from 'koa-router';
import needsAuth from 'lib/middlewares/needsAuth';

import * as postCtrl from './post.ctrl';
import comments from './comments';
import like from './like';

const post: Router = new Router();

post.get('/', postCtrl.readPost);
post.patch('/', needsAuth, postCtrl.checkPostOwnership, postCtrl.updatePost);
post.delete('/', needsAuth, postCtrl.checkPostOwnership, postCtrl.deletePost);

post.use('/like', like.routes());
post.use('/comments', comments.routes());

export default post;
// @flow
import Router from 'koa-router';
import type { Context } from 'koa';
import crypto from 'crypto';
import { PostReadcounts } from 'database/views';
import { getTrendingPosts } from 'database/rawQuery/trending';
import needsAuth from 'lib/middlewares/needsAuth';
import auth from './auth';
import posts from './posts';
import files from './files';
import me from './me';
import feeds from './feeds';
import users from './users';
import common from './common';

const router: Router = new Router();

router.use('/auth', auth.routes());
router.use('/posts', posts.routes());
router.use('/me', needsAuth, me.routes());
router.use('/files', files.routes());
router.use('/feeds', feeds.routes());
router.use('/users', users.routes());
router.use('/common', common.routes());

router.get('/check', (ctx: Context) => {
  ctx.body = {
    version: '1.0.1-alpha.0',
    origin: ctx.origin,
  };
});

router.get('/test', async (ctx: Context) => {
  const data = await getTrendingPosts();
  ctx.body = data;
});

export default router;
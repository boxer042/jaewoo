// @flow
import type { Middleware, Context } from 'koa';
import User from 'database/models/User';
import FollowUser from 'database/models/FollowUser';

export const getFollows: Middleware = async (ctx: Context) => {
  ctx.body = 'followhi';
};
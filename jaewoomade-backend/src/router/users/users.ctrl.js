import db from 'database/db';
import Sequelize from 'sequelize';
import {
  User,
  PostsTags,
} from 'database/models';
import { pick } from 'lodash';

export const getUser = async (ctx, next) => {
  const { username } = ctx.params;
  try {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        name: 'USER_NOT_FOUND',
      };
      return;
    }
    ctx.selectedUser = user;
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

export const getProfile = async (ctx) => {
  try {
    const profile = await ctx.selectedUser.getProfile();
    ctx.body = {
      id: ctx.selectedUser.id,
      ...pick(profile, ['display_name', 'short_bio', 'thumbnail']),
      username: ctx.params.username,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getTags = async (ctx) => {
  const { id } = ctx.selectedUser;
  try {
    const tags = await PostsTags.getPostsCount({ userId: id });
    ctx.body = tags;
  } catch (e) {
    ctx.throw(500, e);
  }
};
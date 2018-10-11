// @flow
import type { Context } from 'koa';
import { Post, PostLike } from 'database/models';
import Joi from 'joi';

export const checkPostExistancy = async (ctx: Context, next: () => Promise<*>): Promise<*> => {
  const { id } = ctx.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return
    }
    ctx.post = post;
  } catch (e) {
    ctx.throw (e, 500);
  }
  return next();
};

export const readPost = async (ctx: Context): Promise<*> => {
  const { id } = ctx.params;
  ctx.body = id;
};

export const likePost = async (ctx: Context): Promise<*> => {
  const { id } = ctx.params;
  const { id: userId } = ctx.user;
  
  try {
    const exists = await PostLike.checkExists({
      userId,
      postId: id,
    });

    if (exists) {
      ctx.status = 409;
      ctx.body = { name: 'ALREADY_LIKED' };
      return;
    }

    const like = await PostLike.build({
      fk_user_id: userId,
      fk_post_id: id,
    }).save();
    ctx.body = like;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
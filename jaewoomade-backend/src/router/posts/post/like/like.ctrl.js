// @flow
import type { Context } from 'koa';
import { PostLike } from 'database/models';

export const getLike = async (ctx: Context): Promise<*> => {
  let liked = false;
  if (ctx.user) {
    const exists = await PostLike.checkExists({
      userId: ctx.user.id,
      postId: ctx.params.id,
    });
    liked = !!exists;
  }

  ctx.body = {
    likes: ctx.post.likes,
    liked,
  };
};

export const likePost = async (ctx: Context): Promise<*> => {
  const { id } = ctx.params;
  const { id: userId } = ctx.user;
  const { post } = ctx;
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
    try {
      await PostLike.create({
        fk_user_id: userId,
        fk_post_id: id,
      });
    } catch (e) {
      ctx.state = 409;
      ctx.body = { name: 'ALREADY_LIKED' };
      return;
    }
    const count = await PostLike.count({
      where: {
        fk_post_id: id,
      },
    });
    ctx.body = {
      liked: true,
      likes: count,
    };
    post.likes = count;
    post.save();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const unlikePost = async (ctx: Context): Promise<*> => {
  const { id } = ctx.params;
  const { id: userId } = ctx.user;
  const { post } = ctx;

  try {
    const exists = await PostLike.checkExists({
      userId,
      postId: id,
    });

    if (!exists) {
      ctx.status = 409;
      ctx.body = { name: 'NOT_LIKED' };
      return;
    }

    await exists.destroy();
    const count = await PostLike.count({
      where: {
        fk_post_id: id,
      },
    });
    ctx.body = {
      liked: false,
      likes: count,
    };
    post.likes = count;
    post.save();
  } catch (e) {
    ctx.throw(500, e);
  }
};

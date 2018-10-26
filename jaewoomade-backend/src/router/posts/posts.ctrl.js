// @flow
import type { Context } from 'koa';
import Joi from 'joi';
import { validateSchema, filterUnique, generateSlugId, escapeForUrl } from 'lib/common';
import { 
  Category,
  Post,
  PostsCategories,
  PostsTags,
  Tag,
  User,
  UserProfile,
  Comment,
  FollowUser,
  FollowTag,
} from 'database/models';
import shortid from 'shortid';
import { serializePost, type PostModel } from 'database/models/Post';
import Sequelize from 'sequelize';

async function createFeeds(postId: string, userId: string, tagIds: string[]): Promise<*> {
  // TODO:
  // 1. USER FOLLOW
  try {
    const followers = await FollowUser.findAll({
      attributes: ['fk_user_id'],
      where: { fk_follow_user_id: userId },
      raw: true,
    });
    console.log(users);
  } catch (e) {
    console.log(e);
  }

  // 2. TAG FOLLOW (FOR EACH)
  // 3. REMOVE DUPLICATE
  // 4. CREATE FEEDS
  // 5. REALTIME.. AWS IOT (Minutely Short Polling)
}

export const writePost = async (ctx: Context): Promise<*> => {
  type BodySchema = {
    title: string,
    body: string,
    shortDescription: string,
    thumbnail: string,
    isMarkdown: boolean,
    isTemp: boolean,
    meta: any,
    categories: Array<string>,
    tags: Array<string>,
    urlSlug: string,
  };

  const schema = Joi.object().keys({
    title: Joi.string().required().min(1).max(120),
    body: Joi.string().required().min(1),
    shortDescription: Joi.string(),
    thumbnail: Joi.string(),
    isMarkdown: Joi.boolean().required(),
    isTemp: Joi.boolean().required(),
    meta: Joi.object(),
    categories: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).required(),
    urlSlug: Joi.string().max(130),
  });

  if (!validateSchema(ctx, schema)) {
    return;
  }

  const {
    title, body, shortDescription, thumbnail,
    isMarkdown, isTemp, meta, categories, tags, urlSlug,
  }: BodySchema = (ctx.request.body: any);

  const generatedUrlSlug = `${title} ${generateSlugId()}`;
  const escapedUrlSlug = escapeForUrl(urlSlug || generatedUrlSlug);
  const replaceDashToSpace = text => text.replace(/-/g, ' ');

  // 중복 값 하나만
  const uniqueTags: Array<string> = filterUnique(tags).map(replaceDashToSpace);
  const uniqueCategories: Array<string> = filterUnique(categories);

  try {
     // check: all categories are valid
    const ownCategories = await Category.listAllCategories(ctx.user.id);
    for (let i = 0; i < uniqueCategories.length; i++) {
      const categoryId = uniqueCategories[i];
      if (ownCategories.findIndex(c => c.id === categoryId) === -1) {
        ctx.status = 400;
        ctx.body = {
          name: 'INVALID_CATEGORY',
          payload: categoryId,
        };
        return;
      }
    }

    const tagIds = await Promise.all(uniqueTags.map(tag => Tag.getId(tag)));
    // create Post data
    const post = await Post.build({
      title,
      body,
      short_description: shortDescription,
      thumbnail,
      is_markdown: isMarkdown,
      is_temp: isTemp,
      fk_user_id: ctx.user.id,
      meta_json: JSON.stringify(meta),
      url_slug: escapedUrlSlug,
    }).save();

    const postId = post.id;
    await PostsTags.link(postId, tagIds);
    await PostsCategories.link(postId, uniqueCategories);

    const postData = await Post.readPostById(postId);
    const serialized = serializePost(postData);

    ctx.body = serialized;

    if (!isTemp) {
      createFeeds(postId, ctx.user.id, tagIds);
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const readPost = async (ctx: Context): Promise<*> => {
  const { username, urlSlug } = ctx.params;
  try {
    const post = await Post.readPost(username, urlSlug);
    if (!post) {
      ctx.status = 404;
      return;
    }
    const commentsCount = await Comment.getCommentsCount(post.id);
    ctx.body = serializePost({ ...post.toJSON(), comments_count: commentsCount });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const listPosts = async (ctx: Context): Promise<*> => {
  const { username } = ctx.params;
  const { category, tag, page } = ctx.query;

  const query = {
    username, categoryUrlSlug: category, tag, page: parseInt(page, 10),
  };

  try {
    const result = await Post.listPosts(query);
    if (!result.data) {
      ctx.set('Page-Limit', '1');
      ctx.body = [];
      return;
    }
    ctx.body = result.data.map(serializePost);
    ctx.set('Count', (result.count).toString());
    ctx.set('Page-Limit', Math.ceil(result.count / 10).toString());
  } catch (e) {
    ctx.throw(500, e);
  }
};
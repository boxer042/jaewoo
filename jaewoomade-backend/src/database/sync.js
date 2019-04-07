import db from 'database/db';
import {
  EmailAuth,
  User,
  UserProfile,
  SocialAccount,
  Post,
  Category,
  PostsCategories,
  Tag,
  PostsTags,
  PostLike,
  Comment,
  FollowUser,
  FollowTag,
  PostHistory,
  PostImage,
  Feed,
  PostScore,
  PostRead,
  UserThumbnail,
} from './models';
import * as views from './views';

export function associate() {
  // configure relations
  User.associate();
  UserProfile.associate();
  SocialAccount.associate();
  Post.associate();
  Category.associate();
  PostsCategories.associate();
  PostsTags.associate();
  PostLike.associate();
  Comment.associate();
  FollowUser.associate();
  FollowTag.associate();
  PostHistory.associate();
  PostImage.associate();
  Feed.associate();
  PostScore.associate();
  PostRead.associate();
  UserThumbnail.associate();
}

export default function sync() {
  associate();
  db.sync();
  // UserProfile.sync();
  // SocialAccount.sync();
  // EmailAuth.sync();
  // Post.sync();
  // Category.sync();
  // PostsCategories.sync();
  // Tag.sync();
  // PostsTags.sync();
  // PostLike.sync();
  // Comment.sync();
  // FollowUser.sync();
  // FollowTag.sync();
  // PostHistory.sync();
  // PostImage.sync();
  // Feed.sync();
  // PostScore.sync();
  // PostRead.sync();
  // UserThumbnail.sync();
}
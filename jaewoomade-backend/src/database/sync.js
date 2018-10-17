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
} from './models';

export function associate() {
  // configure relations
  UserProfile.associate();
  SocialAccount.associate();
  Post.associate();
  Category.associate();
  PostsCategories.associate();
  PostsTags.associate();
  PostLike.associate();
  Comment.associate();
}

export default function sync() {
  associate();
  User.sync();
  UserProfile.sync();
  SocialAccount.sync();
  EmailAuth.sync();
  Post.sync();
  Category.sync();
  PostsCategories.sync();
  Tag.sync();
  PostsTags.sync();
  PostLike.sync();
  Comment.sync();
}
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
} from './models';

export function asscociate() {
  // configure relations
  UserProfile.associate();
  SocialAccount.associate();
  Post.associate();
  Category.associate();
  PostsCategories.associate();
  PostsTags.associate();
}

export default function sync() {
  asscociate();
  User.sync();
  UserProfile.sync();
  SocialAccount.sync();
  EmailAuth.sync();
  Post.sync();
  Category.sync();
  PostsCategories.sync();
  Tag.sync();
  PostsTags.sync();
}
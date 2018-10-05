// @flow
import Sequelize from 'sequelize';
import db from 'database/db';
import { Post, Tag } from 'database/models';
import { primaryUUID } from 'lib/common';
import { builtinModules } from 'module';

/* N:M Relationship between Posts and Tags */
const PostsTags = db.define('posts_tags', {
  id: primaryUUID,
  fk_post_id: Sequelize.UUID,
  fk_tag_id: Sequelize.UUID,
});

PostsTags.associate = function associate() {
  Post.belongsToMany(Tag, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
    through: {
      model: PostsTags,
    },
    foreignKey: 'fk_post_id',
  });
  Tag.belongsToMany(Post, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
    through: {
      model: PostsTags,
    },
    foreignKey: 'fk_tag_id',
  });
};

// links postId to tagIds
PostsTags.link = function link(postId: string, tagIds: Array<string>): Promise<*> {
<<<<<<< HEAD
  const promises = tagIds.map(tagId => PostsTags.build({
=======
  const promises = tagIds.map(tagId => PostsTags.build({ 
>>>>>>> 322dd746f5b2136201f5ddf8cd05f72172dd1d86
    fk_post_id: postId,
    fk_tag_id: tagId,
  }).save());
  return Promise.all(promises);
};

export default PostsTags;
// @flow
import Sequelize from 'sequelize';
import db from 'database/db';
import { primaryUUID } from 'lib/common';
import { User, Post, Tag, Category } from 'database/models';

const Feed = db.define(
  'feed',
  {
    id: primaryUUID,
    fk_post_id: Sequelize.UUID,
    fk_user_id: Sequelize.UUID,
    reason: Sequelize.JSONB,
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    indexs: [
      {
        fields: ['created_at',]
      }
    ],
  },
);

Feed.associate = function associate() {
  Feed.belongsTo(User, { foreignKey: 'fk_user_id', onDelete: 'CASCADE', onUpdate: 'restrict' });
  Feed.belongsTo(Post, { foreignKey: 'fk_post_id', onDelete: 'CASCADE', onUpdate: 'restrict' });
};

export default Feed;
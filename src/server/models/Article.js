import {
  QueryBuilder,
  Model,
} from 'objection';

import handleTimestamps from './decorators/handleTimestamps';

const Builders = {
  selectReactions: builder => (
    builder
      .select('Reaction.id', 'name')
      .groupBy('ArticleReaction.articleId', 'Reaction.id')
      .count('*')
  ),

  selectNickAndId: builder => builder.select('nick', 'uuid'),

  selectTags: builder => (
    builder
      .select('name', 'id')
      .limit(5)
  ),
};

export default
@handleTimestamps
class Article extends Model {
  static tableName = 'Article';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['title', 'userId'],

    properties: {
      id: {type: 'number'},
      userId: {type: 'number'},
      content: {type: 'string'},
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  };

  static QueryBuilder = class extends QueryBuilder {
    $pickDescriptionFields() {
      return super.eager('[user(selectNickAndId), tags(selectTags), reactions(selectReactions)]', Builders);
    }
  };

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User').default,
        join: {
          from: 'Article.userId',
          to: 'User.uuid',
        },
      },

      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./Tag').default,
        join: {
          from: 'Article.id',
          through: {
            from: 'ArticleTag.articleId',
            to: 'ArticleTag.tagId',
          },
          to: 'Tag.id',
        },
      },

      reactions: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./Reaction').default,
        join: {
          from: 'Article.id',
          through: {
            from: 'ArticleReaction.articleId',
            to: 'ArticleReaction.reactionId',
          },
          to: 'Reaction.id',
        },
      },
    };
  }
}

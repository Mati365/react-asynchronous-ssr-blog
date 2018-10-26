import {
  QueryBuilder,
  Model,
} from 'objection';

import handleTimestamps from './decorators/handleTimestamps';

const Builders = {
  selectReactions: builder => (
    builder
      .select('Reaction.name', 'Reaction.id', 'Reaction.icon')
      .groupBy('ArticleReaction.articleId', 'Reaction.id')
      .count('*')
  ),

  selectNickAndId: builder => builder.select('User.nick', 'User.uuid'),

  selectTags: builder => (
    builder
      .select('Tag.name', 'Tag.id')
      .limit(6)
  ),
};

export default
@handleTimestamps
class Article extends Model {
  static tableName = 'Article';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['cover', 'title', 'userId'],

    properties: {
      id: {type: 'number'},
      cover: {type: 'string'},
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
      // user(selectNickAndId), tags(selectTags), reactions(selectReactions)
      return super.eager('[user(selectNickAndId), tags(selectTags), reactions(selectReactions)]', Builders);
    }

    $pickListFields() {
      return super.select(
        'Article.id', 'Article.cover', 'Article.title',
        'Article.createdAt', 'Article.updatedAt',
      );
    }

    $filterByTags(tags) {
      return this
        .whereExists(
          Article
            .relatedQuery('tags')
            .where('id', 'in', tags), // [req.params.tagId]),
        )
        .$pickListFields()
        .$pickDescriptionFields()
        .orderBy('Article.createdAt', 'desc');
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

import {Model} from 'objection';
import handleTimestamps from './decorators/handleTimestamps';

export default
@handleTimestamps
class ArticleReaction extends Model {
  static tableName = 'ArticleReaction';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['articleId', 'reactionId'],

    properties: {
      articleId: {type: 'number'},
      reactionId: {type: 'number'},
    },
  };

  static get relationMappings() {
    return {
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Article').default,
        join: {
          from: 'ArticleTag.articleId',
          to: 'Article.id',
        },
      },

      reaction: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Reaction').default,
        join: {
          from: 'ArticleReaction.reactionId',
          to: 'Reaction.id',
        },
      },
    };
  }
}

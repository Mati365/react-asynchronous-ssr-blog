import {Model} from 'objection';
import handleTimestamps from './decorators/handleTimestamps';

export default
@handleTimestamps
class ArticleTag extends Model {
  static tableName = 'ArticleTag';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['articleId', 'tagId'],

    properties: {
      articleId: {type: 'number'},
      tagId: {type: 'number'},
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

      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Tag').default,
        join: {
          from: 'ArticleTag.tagId',
          to: 'Tag.id',
        },
      },
    };
  }
}

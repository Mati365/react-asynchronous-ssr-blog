import {Model} from 'objection';

import handleTimestamps from './decorators/handleTimestamps';

export default
@handleTimestamps
class User extends Model {
  static tableName = 'User';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['uuid'],

    properties: {
      id: {type: 'string'},
      lastUA: {type: 'string', minLength: 1, maxLength: 512},
    },
  };

  static get relationMappings() {
    return {
      articles: {
        relation: Model.HasManyRelation,
        modelClass: require('./Article').default,
        join: {
          from: 'User.uuid',
          to: 'Article.userId',
        },
      },
    };
  }
}

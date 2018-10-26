import {Model} from 'objection';
import handleTimestamps from './decorators/handleTimestamps';

export default
@handleTimestamps
class PromotedTag extends Model {
  static tableName = 'PromotedTag';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['tagId'],

    properties: {
      tagId: {type: 'number'},
    },
  };

  static get relationMappings() {
    return {
      tags: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Tag').default,
        join: {
          from: 'PromotedTag.tagId',
          to: 'Tag.id',
        },
      },
    };
  }
}

import {Model} from 'objection';
import handleTimestamps from './decorators/handleTimestamps';

export default
@handleTimestamps
class Tag extends Model {
  static tableName = 'Tag';

  // only for validation
  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: {type: 'number'},
      name: {type: 'string'},
    },
  };
}

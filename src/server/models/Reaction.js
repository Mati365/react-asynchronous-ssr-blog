import {Model} from 'objection';
import handleTimestamps from './decorators/handleTimestamps';

export default
@handleTimestamps
class Reaction extends Model {
  static tableName = 'Reaction';

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

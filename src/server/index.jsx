import express from 'express';
import path from 'path';

import * as Services from './services';

const app = express();

(async () => {
  app
    .use(
      '/public',
      express.static(path.join(__dirname, 'public')),
    )
    .use('/api', await Services.api())
    .use('/', Services.react);

  console.log('Listen at port 3000!');
  app.listen(3000);
})();

import React from 'react';

import AsyncComponent from '../Shared/AsyncComponent';

const timeout = (time, value) => new Promise(resolve => setTimeout(() => resolve(value), time));

const Articles = () => (
  <AsyncComponent
    promiseFn={() => timeout(100, 'xD')}
  >
    {data => (
      <div>{data}</div>
    )}
  </AsyncComponent>
);

Articles.displayName = 'Articles';

export default Articles;

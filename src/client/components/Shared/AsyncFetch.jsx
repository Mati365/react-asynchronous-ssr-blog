import React from 'react';
import 'isomorphic-fetch';

import AsyncComponent from './AsyncComponent';

const AsyncFetch = ({fetchUrl, children}) => (
  <AsyncComponent
    keyValue={fetchUrl}
    promiseFn={
      () => fetch(fetchUrl).then(res => res.json())
    }
  >
    {children}
  </AsyncComponent>
);

export default AsyncFetch;

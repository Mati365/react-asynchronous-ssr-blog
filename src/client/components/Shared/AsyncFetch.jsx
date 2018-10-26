import React from 'react';
import 'isomorphic-fetch';

import AsyncComponent from './AsyncComponent';

const AsyncFetch = ({fetchUrl, children, ...props}) => (
  <AsyncComponent
    keyValue={fetchUrl}
    promiseFn={
      () => fetch(fetchUrl).then(res => res.json())
    }
    {...props}
  >
    {children}
  </AsyncComponent>
);

export default AsyncFetch;

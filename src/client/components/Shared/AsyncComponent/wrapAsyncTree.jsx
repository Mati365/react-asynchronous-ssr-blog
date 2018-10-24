import React from 'react';

import {MAGIC_ASYNC_DATA_CONTEXT} from '@client/constants';
import AsyncContextProvider from './AsyncContextProvider';

const wrapAsyncTree = (Component) => {
  const initialCacheStore = {
    cache: window?.__hydrate[MAGIC_ASYNC_DATA_CONTEXT],
  };

  const Wrapped = props => (
    <AsyncContextProvider asyncContext={initialCacheStore}>
      <Component {...props} />
    </AsyncContextProvider>
  );

  Wrapped.displayName = 'wrapWithAsyncHydrationData()';

  return Wrapped;
};

export default wrapAsyncTree;

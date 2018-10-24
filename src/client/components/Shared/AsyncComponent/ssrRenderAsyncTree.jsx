import React from 'react';
import AsyncContextProvider from './AsyncContextProvider';

const ssrRenderAsyncTree = ({cache = {}, promises = {}}, component) => {
  const asyncContext = {
    cache,
    promises,
    attachPromise: function addPromise(uuid, promise) {
      promises[uuid] = promise;
      return promise;
    },
  };

  return (
    <AsyncContextProvider value={asyncContext}>
      {component}
    </AsyncContextProvider>
  );
};

export default ssrRenderAsyncTree;

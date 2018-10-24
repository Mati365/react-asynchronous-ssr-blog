import React from 'react';

import HTMLSkeleton from './Shared/HTMLSkeleton';
import Articles from './Routes/Articles';

const AppRoot = props => (
  <HTMLSkeleton {...props}>
    {() => (
      <Articles />
    )}
  </HTMLSkeleton>
);

export default AppRoot;

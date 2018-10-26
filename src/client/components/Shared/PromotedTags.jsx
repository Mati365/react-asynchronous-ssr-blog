import React from 'react';
import AsyncFetch from './AsyncFetch';

const PromotedTags = ({children, ...props}) => (
  <AsyncFetch
    fetchUrl={`${process.env.API_URL}/promoted-tags`}
    {...props}
  >
    {children}
  </AsyncFetch>
);

export default PromotedTags;

import React from 'react';

import {
  AsyncArticlesSection,
  AsyncFetch,
} from '../Shared';

export const TagAsyncArticles = ({tagId, disableSSR, titleStyles}) => (
  <section>
    <h3
      style={{
        margin: '10px 0 20px',
        ...titleStyles,
      }}
    >
      <AsyncFetch
        fetchUrl={`${process.env.API_URL}/tag/${tagId}`}
        disableSSR={disableSSR}
      >
        {({tag}) => (
          tag
            ? (
              `#${tag.name}:`
            )
            : '404 :>'
        )}
      </AsyncFetch>
    </h3>

    <AsyncArticlesSection
      fetchUrl={`${process.env.API_URL}/articles/by-tag/${tagId}`}
    />
  </section>
);

const ArticleTags = ({match}) => {
  const {tagId} = match.params;

  return (
    <TagAsyncArticles tagId={tagId} />
  );
};

ArticleTags.displayName = 'ArticleTags';

export default ArticleTags;

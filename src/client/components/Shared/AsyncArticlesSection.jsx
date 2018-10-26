import React from 'react';
import * as R from 'ramda';

import AsyncFetch from './AsyncFetch';
import ArticleCard from './ArticleCard';

const AsyncArticlesSection = ({fetchUrl}) => (
  <AsyncFetch fetchUrl={fetchUrl}>
    {R.compose(
      R.addIndex(R.map)(
        (article, index) => (
          <ArticleCard
            key={article.id}
            {...{
              index,
              article,
            }}
          />
        ),
      ),
      R.prop('list'),
    )}
  </AsyncFetch>
);

AsyncArticlesSection.displayName = 'AsyncArticlesSection';

export default AsyncArticlesSection;

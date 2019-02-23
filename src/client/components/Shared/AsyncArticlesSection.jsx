import React from 'react';
import * as R from 'ramda';

import AsyncFetch from './AsyncFetch';
import ArticleCard from './ArticleCard';
import BlobExporter from './BlobExporter';

const AsyncArticlesSection = ({fetchUrl}) => (
  <div style={{position: 'relative'}}>
    <div style={{position: 'absolute', right: 0, top: -42}}>
      <BlobExporter fetchUrl={`${fetchUrl}/xml`} />
    </div>

    <ul>
      <AsyncFetch fetchUrl={fetchUrl}>
        {({list}) => (
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
            list,
          )
        )}
      </AsyncFetch>
    </ul>
  </div>
);

AsyncArticlesSection.displayName = 'AsyncArticlesSection';

export default AsyncArticlesSection;

import React from 'react';
import * as R from 'ramda';

import {
  AsyncArticlesSection,
  PromotedTags,
} from '../Shared';

import {TagAsyncArticles} from './ArticleTags';

const Articles = () => (
  <>
    <h3
      style={{
        margin: '10px 0 20px',
      }}
    >
      Articles:
    </h3>

    <AsyncArticlesSection fetchUrl={`${process.env.API_URL}/articles`} />

    <h4
      style={{
        marginTop: 40,
      }}
    >
      Promoted #hashtags:
    </h4>
    <PromotedTags>
      {({list}) => list && R.map(
        ({tags: {id: tagId}}) => (
          <TagAsyncArticles
            key={tagId}
            tagId={tagId}
            titleStyles={{
              color: 'rgb(128, 128, 128)',
              fontSize: 14,
              fontWeight: 'normal',
            }}
            disableSSR
          />
        ),
        list,
      )}
    </PromotedTags>
  </>
);

Articles.displayName = 'Articles';

export default Articles;

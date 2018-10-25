import React from 'react';
import * as R from 'ramda';

import AsyncFetch from '../Shared/AsyncFetch';
import LayoutContainer from '../Shared/LayoutContainer';

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const sumReactions = R.compose(
  R.reduce(
    (acc, {count}) => acc + (+count),
    0,
  ),
  R.values,
);

const ArticleCard = ({index, article}) => console.log(article) || (
  <li
    style={{
      display: 'flex',
      padding: 0,
      marginBottom: 10,
      paddingBottom: 10,
      listStyleType: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
    }}
  >
    <div
      style={{
        position: 'relative',
        top: 3,
        fontSize: 12,
        color: '#808080',
      }}
    >
      {`${index + 1}.`}
    </div>

    <div
      style={{
        marginLeft: 10,
        width: '100%',
      }}
    >
      {article.title}

      <div
        style={{
          marginTop: 5,
          width: 'inherit',
          fontSize: 11,
          color: '#808080',
        }}
      >
        <strong>
          {sumReactions(article.reactions)}
        </strong>
        {` voters by ${article.user.nick}`}
        {' | '}
        {`Date: ${formatDate(article.createdAt)}`}
        {' | '}
        {`Last updated: ${formatDate(article.updatedAt)}`}

        <span
          style={{
            float: 'right',
            marginLeft: 'auto',
          }}
        >
          {!R.isEmpty(article.tags) && (
            <>
              {'Tags: '}
              {R.map(
                ({name}) => `#${name} `,
                article.tags,
              )}
            </>
          )}
        </span>
      </div>
    </div>
  </li>
);

const Articles = () => (
  <LayoutContainer>
    <AsyncFetch fetchUrl={`${process.env.API_URL}/api/articles`}>
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
  </LayoutContainer>
);

Articles.displayName = 'Articles';

export default Articles;

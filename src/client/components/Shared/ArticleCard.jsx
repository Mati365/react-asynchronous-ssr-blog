import React from 'react';
import Link from 'react-router-dom/Link';
import * as R from 'ramda';

import {sumReactions} from './ReactionsBar';

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

export const EditDatesToolbox = ({article, ...props}) => (
  <span {...props}>
    {`Date: ${formatDate(article.createdAt)}`}
    {' | '}
    {`Last updated: ${formatDate(article.updatedAt)}`}
  </span>
);

const ArticleCard = ({index, article}) => (
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
      <Link
        to={`/article/${article.id}`}
        style={{
          textDecoration: 'none',
        }}
      >
        {article.title}
      </Link>

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
        {` voters by ${article.user?.nick || 'uknown'}`}
        {' | '}

        <EditDatesToolbox article={article} />

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

export default ArticleCard;

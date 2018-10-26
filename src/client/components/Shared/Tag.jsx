import React from 'react';
import Link from 'react-router-dom/Link';
import * as R from 'ramda';

const Tag = ({id, name, first}) => (
  <Link
    to={`/article/by-tag/${id}`}
    style={{
      display: 'inline-block',
      textDecoration: 'none',
      margin: '0 5px',
      padding: 5,
      borderRadius: 2,
      textAlign: 'center',
      border: '1px solid #cacaca',
      fontSize: 11,
      color: 'inherit',
      ...first && {
        marginLeft: 0,
      },
    }}
  >
    {`#${name}`}
  </Link>
);

export const TagsContainer = ({tags}) => (
  <span>
    {R.addIndex(R.map)(
      (tag, index) => (
        <Tag
          key={tag.id}
          first={!index}
          {...tag}
        />
      ),
      tags,
    )}
  </span>
);

export default Tag;

import React from 'react';
import Link from 'react-router-dom/Link';
import * as R from 'ramda';

import PromotedTags from './PromotedTags';

const HeaderBar = React.memo(
  () => (
    <header
      style={{
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          paddingBottom: 16,
        }}
      >
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <h2
            style={{
              display: 'inline-block',
              margin: 0,
              padding: 0,
            }}
          >
            Weird News
          </h2>
        </Link>

        <Link
          to='/'
          style={{
            marginLeft: 'auto',
            textDecoration: 'none',
          }}
        >
          Home page
        </Link>

        <PromotedTags>
          {({list}) => console.log(list) || R.map(
            ({tags: tag}) => (
              <React.Fragment key={tag.id}>
                <span
                  style={{
                    margin: '0 4px',
                    color: 'rgba(0, 0, 0, 0.35)',
                  }}
                >
                  |
                </span>
                <Link
                  to={`/article/by-tag/${tag.id}`}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {`#${tag.name}`}
                </Link>
              </React.Fragment>
            ),
            R.take(4, list),
          )}
        </PromotedTags>
      </div>
    </header>
  ),
);

const LayoutContainer = ({children}) => (
  <div
    style={{
      width: 800,
      margin: '0 auto',
      maxWidth: '90vw',
    }}
  >
    <HeaderBar />

    {children}

    <footer
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 12,
        color: '#808080',
        paddingTop: 10,
      }}
    >
      <span>
        {`React version: ${React.version}`}
      </span>

      <span
        style={{
          marginLeft: 'auto',
        }}
      >
        Author: Mateusz Bagiński
      </span>
    </footer>
  </div>
);

LayoutContainer.displayName = 'Articles';

export default LayoutContainer;

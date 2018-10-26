import React from 'react';
import * as R from 'ramda';
import AsyncFetch from './AsyncFetch';

export const sumReactions = R.compose(
  R.reduce(
    (acc, {count}) => acc + (+count),
    0,
  ),
  R.values,
);

const Reaction = ({reaction, totalCount}) => (
  <div
    style={{
      margin: '0 8px',
    }}
    title={reaction.name}
  >
    <div
      style={{
        position: 'relative',
        left: 3,
        width: 20,
        height: 48,
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,

          background: '#ccc',
          width: '100%',
          height: `${(+reaction.count) / totalCount * 100}%`,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            position: 'relative',
            transform: 'translateY(-100%)',
            fontSize: 14,
          }}
        >
          {+reaction.count}
        </span>
      </div>
    </div>

    <img
      src={reaction.icon}
      alt='Reaction Icon'
      style={{
        display: 'inline-block',
        marginTop: 5,
        width: 28,
        height: 28,
        filter: 'grayscale(100%) brightness(170%)',
      }}
    />
  </div>
);

const findById = id => R.find(
  R.propEq('id', id),
);

const ReactionsBar = ({reactions}) => {
  const totalCount = sumReactions(reactions);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        fontSize: 12,
      }}
    >
      <span
        style={{
          position: 'relative',
          top: -10,
          display: 'block',
          width: '100%',
          marginRight: 20,
        }}
      >
        Reactions:
      </span>
      <AsyncFetch
        fetchUrl={`${process.env.API_URL}/reactions`}
        disableSSR
      >
        {({list: allReactions}) => (
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 80,
            }}
          >
            {R.map(
              reaction => (
                <Reaction
                  key={reaction.id}
                  totalCount={totalCount}
                  reaction={{
                    ...reaction,
                    count: findById(reaction.id)(reactions)?.count || 0,
                  }}
                />
              ),
              allReactions,
            )}
          </span>
        )}
      </AsyncFetch>
    </div>
  );
};

export default ReactionsBar;

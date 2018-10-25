import React from 'react';
import express from 'express';
import * as R from 'ramda';

import {MAGIC_ASYNC_DATA_CONTEXT} from '@client/constants';

import mapObjValuesToPromise from '@client/helpers/resolveObjectPromises';
import ssrRenderAsyncTree from '@client/components/Shared/AsyncComponent/ssrRenderAsyncTree';

import AppRoot from '@client/components/AppRoot';
import renderReactComponent from '@server/helpers/renderReactComponent';

const asyncFullRenderer = R.compose(
  renderReactComponent,
  ssrRenderAsyncTree,
);

const rootRoute = async (req, res) => {
  const manifest = __non_webpack_require__('./manifest.json'); // eslint-disable-line
  const asyncContext = {
    promises: {},
    cache: {},
  };

  // first render
  let renderedComponent = asyncFullRenderer(
    asyncContext,
    <AppRoot />,
  );

  // if renderd tree contains promises, render again
  if (!R.isEmpty(asyncContext.promises)) {
    const data = await mapObjValuesToPromise(
      R.identity,
      asyncContext.promises,
    );

    renderedComponent = asyncFullRenderer(
      {
        promises: {},
        cache: data,
      },
      <AppRoot
        scripts={[
          manifest['main.js'],
        ]}
        hydrateData={{
          [MAGIC_ASYNC_DATA_CONTEXT]: data,
        }}
      />,
    );
  }

  res.send(renderedComponent);
};

export default (
  express
    .Router()
    .get('/', rootRoute)
);

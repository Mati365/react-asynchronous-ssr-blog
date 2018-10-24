import React from 'react';
import ReactDOM from 'react-dom';

import {MAGIC_ASYNC_DATA_CONTEXT} from './constants';

import wrapAsyncTree from './components/Shared/AsyncComponent/wrapAsyncTree';
import AppRoot from './components/AppRoot';

const AsyncAppRoot = wrapAsyncTree(AppRoot);

ReactDOM.hydrate(
  <AsyncAppRoot />,
  document.getElementById(MAGIC_ASYNC_DATA_CONTEXT),
);

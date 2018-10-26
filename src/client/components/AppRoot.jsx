import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import {
  BrowserRouter,
  StaticRouter,
  Route,
} from 'react-router-dom';

import ssr from '../helpers/ssr';

import HTMLSkeleton from './Shared/HTMLSkeleton';
import LayoutContainer from './Shared/LayoutContainer';
import * as Routes from './Routes';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: Routes.Articles,
  },

  {
    path: '/article/by-tag/:tagId',
    exact: true,
    component: Routes.ArticleTags,
  },

  {
    path: '/article/:id',
    exact: true,
    component: Routes.Article,
  },
];

const mapRoutes = R.map(
  props => (
    <Route
      key={props.path}
      {...props}
    />
  ),
);

const AppRoot = ({routerProps, ...props}) => {
  const IsomorphicRouter = (
    ssr
      ? StaticRouter
      : BrowserRouter
  );

  return (
    <HTMLSkeleton {...props}>
      {() => (
        <IsomorphicRouter {...routerProps}>
          <LayoutContainer>
            <>
              {mapRoutes(ROUTES)}
            </>
          </LayoutContainer>
        </IsomorphicRouter>
      )}
    </HTMLSkeleton>
  );
};

AppRoot.propTypes = {
  routerProps: PropTypes.shape({
    context: PropTypes.objectOf(PropTypes.any),
    location: PropTypes.string,
  }),
};

AppRoot.defaultProps = {
  routerProps: {},
};

export default AppRoot;

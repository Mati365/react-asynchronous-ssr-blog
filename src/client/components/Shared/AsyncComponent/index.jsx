import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ssr from '@client/helpers/ssr';
import provideContext from '@client/decorators/provideContext';

import {AsyncPromisesContext} from './AsyncContextProvider';

export default
@provideContext('asyncContext', AsyncPromisesContext)
class AsyncComponent extends React.Component {
  static propTypes = {
    promiseFn: PropTypes.func.isRequired,
    loadingComponent: PropTypes.any,
  };

  static defaultProps = {
    loadingComponent: R.always(null),
  };

  constructor(props) {
    super(props);

    const {
      promiseFn,
      asyncContext,
    } = props;

    const uuid = asyncContext.generateUUID();
    const cacheData = asyncContext.cache && asyncContext.cache[uuid];

    if (cacheData) {
      this.state = {
        loading: false,
        data: cacheData,
      };
    } else {
      this.state = {
        loading: true,
      };
    }

    if (ssr && asyncContext.attachPromise)
      asyncContext.attachPromise(uuid, promiseFn());
  }

  async componentDidMount() {
    const {promiseFn} = this.props;
    const {loading} = this.state;

    if (!ssr && loading) {
      const data = await promiseFn();

      this.setState({
        loading: false,
        data,
      });
    }
  }

  render() {
    const {
      loading,
      data,
    } = this.state;

    const {
      loadingComponent: LoadingComponent,
      children,
    } = this.props;

    if (loading)
      return <LoadingComponent />;

    return children(data);
  }
}

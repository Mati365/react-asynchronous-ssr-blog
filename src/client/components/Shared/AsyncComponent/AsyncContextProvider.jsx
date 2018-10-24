import React from 'react';
import * as R from 'ramda';

export const AsyncPromisesContext = React.createContext({
  promises: {},
  cache: {},
  attachPromise: R.T,
  counter: 0,
});

const createBlankCounter = () => ({
  counter: 0,
  generateUUID: function generateUUID() {
    return this.counter++;
  },
});

const AsyncContextProvider = ({value, children}) => (
  <AsyncPromisesContext.Provider
    value={{
      ...value,
      ...createBlankCounter(),
    }}
  >
    {children}
  </AsyncPromisesContext.Provider>
);

export default AsyncContextProvider;

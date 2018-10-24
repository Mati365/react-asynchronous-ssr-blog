import React from 'react';

const provideContext = (propName, Context) => (Component) => {
  const Wrapped = props => (
    <Context.Consumer>
      {value => (
        <Component
          {...props}
          {...{
            [propName]: value || {},
          }}
        />
      )}
    </Context.Consumer>
  );

  Wrapped.displayName = 'provideContext()';

  return Wrapped;
};

export default provideContext;

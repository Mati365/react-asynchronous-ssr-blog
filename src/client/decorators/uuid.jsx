import React from 'react';

const uuid = (prefix) => {
  let counter = 0;

  return Component => class extends React.Component {
    static displayName = `UUID('${prefix}')`;

    uuid = `${prefix}-${++counter}`;

    render() {
      return (
        <Component
          {...this.props}
          uuid={this.uuid}
        />
      );
    }
  };
};

export default uuid;

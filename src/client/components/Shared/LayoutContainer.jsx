import React from 'react';

const LayoutContainer = ({children}) => (
  <div
    style={{
      width: 800,
      margin: '0 auto',
    }}
  >
    <header
      style={{
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <h2
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          paddingBottom: 16,
        }}
      >
        Weird News
      </h2>
    </header>

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

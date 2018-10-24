// import React from 'react';
import ReactDOMServer from 'react-dom/server';

const renderReactComponent = element => ReactDOMServer.renderToString(element);

export default renderReactComponent;

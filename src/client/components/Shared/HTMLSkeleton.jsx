import React from 'react';
import PropTypes from 'prop-types';

import ssr from '@client/helpers/ssr';

const getExposedJSON = () => (
  ssr
    ? {}
    : window.__hydrate
);

const windowExposedJSON = json => (
  `window.__hydrate = ${JSON.stringify(json)};`
);

const JsonProvider = ({json}) => (
  <script
    dangerouslySetInnerHTML={{
      __html: windowExposedJSON(json),
    }}
  />
);

JsonProvider.propTypes = {
  json: PropTypes.any.isRequired,
};

const HTMLSkeleton = ({
  hydrateData,
  children,
  scripts,
  title,
  hydrateOnlyChilds,
}) => {
  const childs = children(hydrateData);
  if (!ssr && hydrateOnlyChilds)
    return childs;

  return (
    <html lang='pl'>
      <head>
        <meta charSet='UTF-8' />
        {title && (
          <title>{title}</title>
        )}
      </head>

      <body>
        {childs}

        {hydrateData && (
          <JsonProvider json={hydrateData} />
        )}

        {scripts?.map(
          script => (
            <script
              key={script}
              src={script}
            />
          ),
        )}
      </body>
    </html>
  );
};

HTMLSkeleton.propTypes = {
  hydrateData: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};

HTMLSkeleton.defaultProps = {
  hydrateData: getExposedJSON(),
  hydrateOnlyChilds: true,
  title: null,
};

export default HTMLSkeleton;

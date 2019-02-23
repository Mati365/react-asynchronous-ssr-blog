import React from 'react';

const fetchAndSave = async (fetchUrl, filename = 'export.xml') => {
  const data = await fetch(fetchUrl).then(r => r.text());

  const a = document.createElement('a');
  const url = URL.createObjectURL(
    new Blob([data], {type: 'text/plain'}),
  );

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(
    () => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    0,
  );
};

const BlobExporter = ({fetchUrl}) => (
  <button
    type='button'
    style={{
      border: 0,
      background: 0,
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      outline: 0,
      fontSize: 13,
    }}
    onClick={() => fetchAndSave(fetchUrl)}
  >
    Eksportuj dane
  </button>
);

export default BlobExporter;

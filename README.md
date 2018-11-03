# react-asynchronous-ssr-blog
SPA blog using Asynchronous React SSR components to fetch data from API and display it for SEO. Supports tags, reactions.

### Screens
![Main](/doc/img/1.png)
![Article](/doc/img/2.png)
![Tag](/doc/img/3.png)

### Run
```
yarn install
yarn run start
```

### ENV
example:
```
DB_NAME=database
DB_USER=user
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432

API_URL=http://lvh.me:3000
```

### Async API response rendering
Server renders something like it:
```
<AsyncComponent
  promiseFn={() => timeout(100, 'xD')}
>
  {data => (
    <div>{data}</div>
  )}
</AsyncComponent>
```

collects promises:
```
const data = await mapObjValuesToPromise(
  R.identity,
  asyncContext.promises,
);
```
and renders whole tree again:
```
  const asyncContext = {
    cache,
    promises,
    attachPromise: function addPromise(uuid, promise) {
      promises[uuid] = promise;
      return promise;
    },
  };

  return (
    <AsyncContextProvider value={asyncContext}>
      {component}
    </AsyncContextProvider>
  );
```
with already downloaded data stored in context. It is slow but works

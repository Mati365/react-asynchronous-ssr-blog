# react-asynchronous-ssr-blog
School homework project. 

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

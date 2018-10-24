import * as R from 'ramda';

const valuesToPromisesList = mapperFn => R.compose(
  R.map(
    ([key, val]) => {
      const promise = mapperFn(val);
      if (R.is(Promise, promise))
        return promise.then(result => ([key, result]));

      return [key, null];
    },
  ),
  R.toPairs,
);

const nonNullPairsToObj = R.compose(
  R.fromPairs,
  R.reject(
    R.propSatisfies(R.isNil, 1),
  ), // remove nil values
);

const mapObjValuesToPromise = R.curry(
  (mapperFn, obj) => {
    const promises = valuesToPromisesList(mapperFn)(obj);

    return Promise
      .all(promises)
      .then(nonNullPairsToObj);
  },
);

export default mapObjValuesToPromise;

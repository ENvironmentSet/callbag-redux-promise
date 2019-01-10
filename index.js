export default function promiseEnhancer(start, producer) {
  if (start !== 0) return;

  producer(0, (t, d) => {
    if (t === 1) {
      if (d instanceof Promise) {
        d.then(action => producer(1, action), () => {});
      } else if (d.payload instanceof Promise) {
        d.payload.then(
          payload => producer(1, {...d, payload}),
          error => producer(1, {...d, payload: error, error: true}),
        );
      } else {
        producer(1, d);
      }
    }
  });
};

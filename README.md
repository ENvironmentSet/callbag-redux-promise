# callbag-redux-promise

callbag-redux enhancer, inspired by redux-promise

## API

### promiseEnhancer

All you have to do is to put this enhancer into `enhance`.

```js
import { enhance } from 'callbag-redux';
import promiseEnhaner from 'callbag-redux-promise';
import reducer from './ducks';

const myStore = enhance(promiseEnhaner)(reducer);
```

promiseEnhancer deals with two kinds of actions,

1. action that will be produced by `Promise`(or some thenable)
2. action that it's payload is `Promise`(or some thenable)

let's take a look what promiseEnhancer do.

case 1:
```js
import { enhance } from 'callbag-redux';
import promiseEnhaner from 'callbag-redux-promise';

function reducer(state = 0, action) {
  if (action.type === 'INCREASE') {
    return state + 1;
  } else {
    return state;
  }
}

const once = data => (start, sink) => {
  if (start !== 0) return;

  sink(1, data);
};

const myStore = enhance(promiseEnhancer)(reducer);

subscribe(myStore)(count => console.log(`count: ${count}`));

dispatch(myStore)(once(Promise.resolve({ type: 'INCREASE' })));
// if dispatched promise is resolved,
// dispatch that resolved value as action and ignore dispatched promise
dispatch(myStore)(once(Promise.reject({ type: 'INCREASE' })));
// rejected promise will be ignored
```

case 2:
```js
import { enhance } from 'callbag-redux';
import promiseEnhaner from 'callbag-redux-promise';

function reducer(state = 0, action) {
  if (action.type === 'INCREASE' && !action.error) {
    return state + action.payload;
  } else {
    return state;
  }
}

const once = data => (start, sink) => {
  if (start !== 0) return;

  sink(1, data);
};

const myStore = enhance(promiseEnhancer)(reducer);

subscribe(myStore)(count => console.log(`count: ${count}`));

dispatch(myStore)(once({ type: 'INCREASE', payload: Promise.resolve(1) }));
// when action that have promise as payload, promiseEnhancer stops it
// and resume dispatching that action when promise of action's payload has been resolved.
dispatch(myStore)(once({ type: 'INCREASE', payload: Promise.reject(1) }));
// when promise as payload has been rejected,
// action's error property will be settled to true
// and action's payload will be replaced by reject reason of rejected one.
```
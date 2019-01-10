const input = 'index.js';
const outputs = [
  { file: 'build/lib/callbag-redux-promise.js', format: 'cjs' },
  { file: 'build/es/callbag-redux-promise.js', format: 'es' },
  { file: 'build/es/callbag-redux-promise.mjs', format: 'es' },
  { file: 'build/dist/callbag-redux-promise.js', format: 'umd', name: 'callbagReduxPromise' },
];

const toConfig = output => ({
  input,
  output: { indent: false, ...output },
});

export default outputs.map(toConfig);
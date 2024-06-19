module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  // extends: 'airbnb-base',
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-restricted-syntax': [2, 'FunctionExpression', 'WithStatement'],
  },
};

module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    "indent": ["error", 2],
    // React
    'react/prop-types': 0,
    'react/self-closing-comp': 0,
    'react/display-name': 0,

    // JavaScript
    semi: 0,
    'no-proto': 0,
    'no-unused-vars': 0,

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/semi': ['error'],

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  "env": {
    "browser": true,
    "amd": true,
    "node": true
  },
};
module.exports = {
  extends: [
    'eslint:recommended',
    'next',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/jsx-sort-props': 'error',
    'react/display-name': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': [
      2,
      { argsIgnorePattern: '^__', varsIgnorePattern: '^__' },
    ],
  },
};

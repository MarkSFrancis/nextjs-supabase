module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', '@next/next', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/function-component-definition': 0,
    'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-bind': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-useless-fragment': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};

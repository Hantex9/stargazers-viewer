module.exports = {
  root: true,
  extends: ['handlebarlabs', 'plugin:prettier/recommended'],
  rules: {
    'no-use-before-define': 0,
    'no-unused-vars': 'warn',
    'react/style-prop-object': 0,
    'react/require-default-props': 0,
    'import/extensions': 0,
    'react-hooks/exhaustive-deps': 0,
  },
  globals: {
    __DEV__: 'readonly',
  },
  plugins: [],
};

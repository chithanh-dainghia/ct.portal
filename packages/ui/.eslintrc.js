module.exports = {
  ...require('eslint-config-custom/eslint-next'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
}

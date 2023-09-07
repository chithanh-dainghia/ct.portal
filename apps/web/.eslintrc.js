module.exports = {
  ...require('eslint-config-custom/eslint-next'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  rules: {
    'eslint-disable import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jest/no-identical-title': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'react/jsx-no-bind': 'off',
  },
}

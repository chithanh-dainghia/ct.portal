module.exports = {
  ...require('jest-config/jest-next'),
  rootDir: '.',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
  },
}

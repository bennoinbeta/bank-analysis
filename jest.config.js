module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  /* https://stackoverflow.com/questions/63904196/esmoduleinterop-flag-set-still-getting-default-import-error */
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
    __DEV__: true,
  },
};

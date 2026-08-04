module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/storybook-static/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/lib/components/**/*.component.ts',
    'src/lib/components/**/*.service.ts',
    'src/lib/theme/**/*.ts',
    '!src/lib/**/*.stories.ts',
    '!src/lib/**/index.ts',
    '!src/lib/components/_shared/**',
  ],
  coverageThreshold: {
    global: {
      lines: 60,
      functions: 55,
      statements: 60,
      branches: 25,
    },
  },
  coverageDirectory: 'coverage',
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  watchman: false,
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

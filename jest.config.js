module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'nodes/**/*.ts',
    'credentials/**/*.ts',
    '!**/*.d.ts',
    '!**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  verbose: true,
  moduleNameMapper: {
    '^n8n-workflow$': '<rootDir>/test/__mocks__/n8n-workflow.ts',
  },
};

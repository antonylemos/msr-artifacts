// Backend/jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  globalSetup: './tests/setupGlobal.js', // Added
  setupFilesAfterEnv: ['./tests/setupAfterEnv.js'], // Added
  // Recommended: Increase timeout if DB operations make tests slow
  testTimeout: 30000, // 30 seconds,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};

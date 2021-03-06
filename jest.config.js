module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '!src/**/*.stories.*',
    '!src/**/stories/**',
    'src/**/*.{js,jsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  setupFiles: ['./test/setup.js'],
};

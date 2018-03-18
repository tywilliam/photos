module.exports = {
  collectCoverageFrom: [
    '!src/**/*.stories.*',
    '!src/**/stories/**',
    'src/**/*.{js,jsx}',
  ],
  coverageDirectory: '.coverage',
  coverageReporters: ['lcov', 'text-summary'],
};

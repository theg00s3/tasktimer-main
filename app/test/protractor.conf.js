exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'cucumber',
  cucumberOpts: {
    require: 'features/support/steps.js',
    format: 'progress'
  },
  capabilities: { 'browserName': 'firefox' },
  seleniumArgs: ['-browserTimeout=60'],
  baseUrl: 'http://localhost:9000',
  specs: ['features/**/*.feature'],
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true
  },
  params: {
    base: 'http://localhost:9000',
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [''],
    plugins: [
      require(''),
      require(''),
      require(''),
      require(''),
      require('')
    ],
    client: {
      jasmine: {
      },
      clearContext: false 
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/DevExtreme-App'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};

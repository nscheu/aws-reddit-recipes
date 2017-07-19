// Karma configuration
// Generated on Tue Jul 18 2017 16:50:59 GMT-0400 (EDT)
var express = require('express');
module.exports = function(config) {
    var webpackConfig = require('./webpack.config.js');
    //var express = require('express');

    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec/homeSpec.js': ['webpack'],
            //'spec/**/*Spec.jsx': ['webpack'],
            //'test/**/*Spec.js': ['webpack'],
            //'test/**/*Spec.jsx': ['webpack']
        },


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],



    // list of files / patterns to load in the browser
    files: [
        //'node_modules/requirejs/require.js',
        //'node_modules/events/events.js',
        //'node_modules/express/lib/express.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        //'node_modules/express/express.js',
        'public/app.js',
        //'public/index.html',
        'public/views/home/home.js',
        //'public/views/home/home.html',
        //'public/**/*.js',
        'spec/homeSpec.js'
    ],


    // list of files to exclude
    exclude: [
    ],

      // Using Webpack
      webpack: webpackConfig,
          //{
          // you don't need to specify the entry option because
          // karma watches the test entry points
          // webpack watches dependencies
          // ... remainder of webpack configuration (or import)}//webpackConfig,
      //},
      webpackMiddleware: {
          // webpack-dev-middleware configuration
          // i.e.
          noInfo: true,
          // and use stats to turn off verbose output
          stats: {
              // options i.e.
              chunks: false
          }
      },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS'],
        browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

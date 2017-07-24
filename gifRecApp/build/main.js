/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by nic on 7/17/17.
 * This tests API enpoints on the Node server
 */
var request = __webpack_require__(1);

var base_url = "http://localhost:3000/";

// define(function (require) {
//     var request = require("request");
//     //var express = require("express");
//});

// The describe is a 'Suite'
describe("Gif Recipes Scraper Node Server", function () {
    describe("GET /", function () {
        // This is the 'Spec'
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("GET /login", function () {
        it("returns status code 200", function (done) {
            request.get(base_url + "#/login", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("GET /profile", function () {
        it("returns status code 200", function (done) {
            request.get(base_url + "#/profile", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("GET /register", function () {
        it("returns status code 200", function (done) {
            request.get(base_url + "#/register", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

//

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ })
/******/ ]);
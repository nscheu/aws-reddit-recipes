/**
 * Created by nic on 7/17/17.
 * This tests API enpoints on the Node server
 */
var request = require("request");

var base_url = "http://localhost:3000/"

// define(function (require) {
//     var request = require("request");
//     //var express = require("express");
//});

// The describe is a 'Suite'
describe("Gif Recipes Scraper Node Server", function() {
    describe("GET /", function() {
        // This is the 'Spec'
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("GET /login", function() {
        it("returns status code 200", function(done) {
            request.get(base_url + "#/login", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    })
    describe("GET /profile", function() {
        it("returns status code 200", function(done) {
            request.get(base_url + "#/profile", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    })
    describe("GET /register", function() {
        it("returns status code 200", function(done) {
            request.get(base_url + "#/register", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    })
});

//
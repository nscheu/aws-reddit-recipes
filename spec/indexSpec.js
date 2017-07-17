/**
 * Created by nic on 7/17/17.
 */
// The describe is a 'Suite'
//var app = require("../index.js");


// describe('Hello world', function () {
//     // This is the 'Spec'
//     it('says hello', function () {
//         // This is the 'Matcher'
//         expect(app.helloWorld()).toEqual('Hello world!');
//     });
// });
//
// describe("Addition",function(){
//     it("The function should add 2 numbers",function() {
//         var value = app.AddNumber(5,6);
//         expect(value).toBe(11);
//     });
// });

var request = require("request");

var base_url = "http://localhost:3000/"


// The describe is a 'Suite'
describe("Hello World Server", function() {
    describe("GET /", function() {
        // This is the 'Spec'
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        // it("returns Hello World", function(done) {
        //     request.get(base_url, function(error, response, body) {
        //         expect(body).toBe("Hello World");
        //         done();
        //     });
        // });
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
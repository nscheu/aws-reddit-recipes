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

describe("Hello World Server", function() {
    describe("GET /", function() {
        it("returns status code 200", function() {

            request.get(base_url, function(error, response, body) {


            });

        });
    });
});

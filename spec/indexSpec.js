/**
 * Created by nic on 7/17/17.
 */
// The describe is a 'Suite'
var app = require("../index.js");


describe('Hello world', function () {
    // This is the 'Spec'
    it('says hello', function () {
        // This is the 'Matcher'
        expect(app.helloWorld()).toEqual('Hello world!');
    });
});

describe("Addition",function(){
    it("The function should add 2 numbers",function() {
        var value = app.AddNumber(5,6);
        expect(value).toBe(11);
    });
});
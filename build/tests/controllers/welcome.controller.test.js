"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var server_1 = __importDefault(require("../../server"));
var supertest_1 = __importDefault(require("supertest"));
require("mocha");
describe('GET /welcome', function () {
    it('should return welcome message', function (done) {
        supertest_1.default(server_1.default)
            .get('/welcome')
            .expect(200)
            .then(function (res) {
            expect_1.default(res.text).toBe('Hello, world!');
            done();
        })
            .catch(function (error) { return done(error); });
    });
});

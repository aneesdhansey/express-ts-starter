"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var expect_1 = __importDefault(require("expect"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var seed_1 = require("../seed/seed");
beforeEach(seed_1.populateUsers);
describe('POST /users', function () {
    it('should create new user', function (done) {
        var email = 'testuser20@gmail.com';
        var password = 'mysecret';
        supertest_1.default(server_1.default)
            .post('/users')
            .send({ email: email, password: password })
            .expect(200)
            .end(function (err, res) {
            if (err)
                done(err);
            expect_1.default(res.headers['x-auth']).toBeTruthy();
            expect_1.default(res.body._id).toBeTruthy();
            expect_1.default(res.body.email).toBe(email);
            done();
        });
    });
});

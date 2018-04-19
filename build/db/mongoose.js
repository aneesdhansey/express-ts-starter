"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoURI = process.env.MONGODB_URI;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(mongoURI);
module.exports = { mongoose: mongoose_1.default };

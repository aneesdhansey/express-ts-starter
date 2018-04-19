"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var appRoutes = require('./controllers');
require('./config/config');
require('./db/mongoose');
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
appRoutes(app);
app.listen(port, function () { return console.log("Listening on port: " + port); });
exports.default = app;

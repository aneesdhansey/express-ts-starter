"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var fs_1 = __importDefault(require("fs"));
var excluded = ['index'];
var appRoutes = function (app) {
    fs_1.default.readdirSync(__dirname).forEach(function (file) {
        var basename = file.split('.')[0];
        // Only load files which are not directories and are not excluded
        if (!fs_1.default.lstatSync(__dirname + "/" + file).isDirectory() && !lodash_1.default.includes(excluded, basename))
            app.use("/" + basename, require("./" + basename + ".controller"));
    });
};
module.exports = appRoutes;

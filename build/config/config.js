"use strict";
var env = process.env.NODE_ENV || 'development';
if (env == 'development' || env == 'test') {
    var config = require('./config.json');
    var envConfig_1 = config[env];
    Object.keys(envConfig_1).forEach(function (k) { return process.env[k] = envConfig_1[k]; });
}

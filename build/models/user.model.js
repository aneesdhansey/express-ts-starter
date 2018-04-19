"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var lodash_1 = __importDefault(require("lodash"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var JWT_SECRET = process.env.JWT_SECRET || '';
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator_1.default.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
});
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();
    return lodash_1.default.pick(userObj, ['_id', 'email']);
};
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jsonwebtoken_1.default.sign({ _id: user._id.toHexString(), access: access }, JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{ access: access, token: token }]);
    return user.save().then(function () { return token; });
};
UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: { token: token }
        }
    });
};
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return Promise.reject(error);
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email: email })
        .then(function (user) {
        if (!user)
            return Promise.reject(null);
        return new Promise(function (resolve, reject) {
            bcryptjs_1.default.compare(password, user.password, function (err, result) {
                if (err)
                    reject(err);
                if (result)
                    resolve(user);
                reject();
            });
        });
    })
        .catch(function (error) {
        return Promise.reject(error);
    });
};
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcryptjs_1.default.genSalt(10, function (err, salt) {
            bcryptjs_1.default.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
exports.User = mongoose_1.model('User', UserSchema);
//module.exports = { User };

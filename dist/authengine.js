"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var axios_1 = __importDefault(require("axios"));
var AuthClient = /** @class */ (function () {
    function AuthClient(config) {
        this.config = config;
    }
    AuthClient.prototype.createMagicLink = function (data) {
        return this.config.apiRequest({
            method: "POST",
            url: "/public/auth/magic-link",
            data: data,
        });
    };
    AuthClient.prototype.validateMagicLinkAttempt = function (data) {
        return this.config.apiRequest({
            method: "GET",
            url: "/public/auth/magic-link/".concat(data.requestId, "/validate"),
            data: {
                token: data.token,
            },
        });
    };
    return AuthClient;
}());
var UserClient = /** @class */ (function () {
    function UserClient(config) {
        this.config = config;
    }
    UserClient.prototype.getById = function (id) {
        return this.config.apiRequest({
            method: "GET",
            url: "/management/user/".concat(id),
        });
    };
    UserClient.prototype.create = function (data) {
        return this.config.apiRequest({
            method: "POST",
            url: "/management/user",
            data: data,
        });
    };
    return UserClient;
}());
var Client = /** @class */ (function () {
    function Client(config) {
        if (!config.apiUrl)
            throw new Error("apiUrl is required.");
        if (!config.privateToken)
            throw new Error("privateToken is required.");
        this.config = config;
        axios_1.default.defaults.headers.common["Authorization"] = "Bearer ".concat(config.privateToken);
        axios_1.default.defaults.baseURL = config.apiUrl;
        axios_1.default.defaults.headers.common["Content-Type"] = "application/json";
        if (!config.apiRequest) {
            config.apiRequest = function (config) { return axios_1.default.request(config); };
        }
    }
    Client.prototype.apiRequest = function (config) {
        return axios_1.default.request(config);
    };
    Object.defineProperty(Client.prototype, "auth", {
        get: function () {
            return new AuthClient(this.config);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "user", {
        get: function () {
            return new UserClient(this.config);
        },
        enumerable: false,
        configurable: true
    });
    Client.prototype.whoami = function () {
        return this.apiRequest({
            method: "GET",
            url: "/management/tenant",
        });
    };
    return Client;
}());
exports.Client = Client;

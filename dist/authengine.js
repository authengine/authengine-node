"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var axios_1 = __importDefault(require("axios"));
var SessionClient = /** @class */ (function () {
    function SessionClient(config) {
        this.config = config;
    }
    SessionClient.prototype.getById = function (data) {
        return this.config.apiRequest({
            method: "GET",
            url: "/sessions/".concat(data.id),
        });
    };
    SessionClient.prototype.validateToken = function (data) {
        return this.config.apiRequest({
            method: "POST",
            url: "/management/sessions/validate-token",
            data: data,
        });
    };
    return SessionClient;
}());
var MagicLinkClient = /** @class */ (function () {
    function MagicLinkClient(config) {
        this.config = config;
    }
    MagicLinkClient.prototype.create = function (data) {
        return this.config.apiRequest({
            method: "POST",
            url: "/public/auth/magic-link",
            data: data,
        });
    };
    MagicLinkClient.prototype.validate = function (data) {
        return this.config.apiRequest({
            method: "GET",
            url: "/public/auth/magic-link/".concat(data.requestId, "/validate"),
            data: {
                token: data.token,
            },
        });
    };
    return MagicLinkClient;
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
    Object.defineProperty(Client.prototype, "magicLink", {
        get: function () {
            return new MagicLinkClient(this.config);
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
    Object.defineProperty(Client.prototype, "session", {
        get: function () {
            return new SessionClient(this.config);
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

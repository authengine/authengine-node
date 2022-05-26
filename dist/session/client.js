"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
class SessionClient {
    constructor(config) {
        this.config = config;
    }
    getById(data) {
        return this.config.apiRequest({
            method: "GET",
            url: `/sessions/${data.id}`,
        });
    }
    getByToken(data) {
        return this.config.apiRequest({
            method: "POST",
            url: `/management/sessions/validate-token`,
            data,
        });
    }
    getByBearerTokenFromHeader(request) {
        const bearerToken = utils_1.default.getBearerTokenFromHeader(request);
        if (bearerToken) {
            return this.getByToken({ token: bearerToken });
        }
        else {
            return Promise.reject(new Error("No bearer token found"));
        }
    }
}
exports.default = SessionClient;

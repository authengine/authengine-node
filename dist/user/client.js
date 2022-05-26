"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserClient {
    constructor(config) {
        this.config = config;
    }
    get(data) {
        return this.config.apiRequest({
            method: "GET",
            url: `/management/user`,
            data,
        });
    }
    create(data) {
        return this.config.apiRequest({
            method: "POST",
            url: `/management/user`,
            data,
        });
    }
}
exports.default = UserClient;

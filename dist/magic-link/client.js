"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MagicLinkClient {
    constructor(config) {
        this.config = config;
    }
    create(data) {
        return this.send(data);
    }
    send(data) {
        return this.config.apiRequest({
            method: "POST",
            url: "/public/auth/magic-link",
            data,
        });
    }
    validate(data) {
        return this.config.apiRequest({
            method: "GET",
            url: `/public/auth/magic-link/${data.requestId}/validate`,
            data: {
                token: data.token,
            },
        });
    }
}
exports.default = MagicLinkClient;

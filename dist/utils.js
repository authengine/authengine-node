"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getBearerTokenFromHeader = (request) => {
    var _a;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
    if (!token) {
        return undefined;
    }
    else {
        return token;
    }
};
exports.default = {
    getBearerTokenFromHeader,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const utils_1 = __importDefault(require("./utils"));
exports.default = {
    Client: client_1.Client,
    utils: utils_1.default,
};

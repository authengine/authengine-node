"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const client_1 = __importDefault(require("./session/client"));
const client_2 = __importDefault(require("./magic-link/client"));
const client_3 = __importDefault(require("./user/client"));
class Client {
    constructor(config) {
        if (!config.apiUrl)
            throw new Error("apiUrl is required.");
        if (!config.secretKey)
            throw new Error("secretKey is required.");
        this.config = config;
        const defaultFetcher = (config) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default
                    .request(config)
                    .then((response) => {
                    resolve(response.data);
                })
                    .catch((error) => {
                    if (error.response) {
                        reject(error.response.data);
                    }
                    reject(error);
                });
            });
        });
        axios_1.default.defaults.baseURL = config.apiUrl;
        axios_1.default.defaults.headers.common["x-secret-key"] = config.secretKey;
        axios_1.default.defaults.headers.common["Content-Type"] = "application/json";
        if (!config.apiRequest) {
            config.apiRequest = defaultFetcher;
        }
    }
    get magicLink() {
        return new client_2.default(this.config);
    }
    get user() {
        return new client_3.default(this.config);
    }
    get session() {
        return new client_1.default(this.config);
    }
    whoami() {
        return this.config.apiRequest({
            method: "GET",
            url: "/management/project",
        });
    }
}
exports.Client = Client;

import { AxiosRequestConfig } from "axios";
import SessionClient from "./session/client";
import MagicLinkClient from "./magic-link/client";
import UserClient from "./user/client";
export interface ClientConfig {
    apiUrl: string;
    publicKey?: string;
    secretKey: string;
    apiRequest?: (axiosConfig: AxiosRequestConfig) => any;
}
export declare class Client {
    config: ClientConfig;
    constructor(config: ClientConfig);
    get magicLink(): MagicLinkClient;
    get user(): UserClient;
    get session(): SessionClient;
    whoami(): Promise<any>;
}

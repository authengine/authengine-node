import { ClientConfig, CreateUserData, CreateMagicLinkData, ValidateMagicLinkAttemptData } from "./types";
declare class SessionClient {
    private config;
    constructor(config: ClientConfig);
    getById(data: {
        id: string;
    }): any;
    validateToken(data: {
        token: string;
    }): any;
}
declare class MagicLinkClient {
    private config;
    constructor(config: ClientConfig);
    create(data: CreateMagicLinkData): any;
    validate(data: ValidateMagicLinkAttemptData): Promise<any>;
}
declare class UserClient {
    private config;
    constructor(config: ClientConfig);
    getById(id: string): Promise<any>;
    create(data: CreateUserData): Promise<any>;
}
export declare class Client {
    config: ClientConfig;
    constructor(config: ClientConfig);
    private apiRequest;
    get magicLink(): MagicLinkClient;
    get user(): UserClient;
    get session(): SessionClient;
    whoami(): Promise<any>;
}
export {};

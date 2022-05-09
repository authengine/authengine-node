import { ClientConfig, CreateUserData, CreateMagicLinkData, ValidateMagicLinkAttemptData } from "./types";
declare class AuthClient {
    private config;
    constructor(config: ClientConfig);
    createMagicLink(data: CreateMagicLinkData): any;
    validateMagicLinkAttempt(data: ValidateMagicLinkAttemptData): Promise<any>;
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
    get auth(): AuthClient;
    get user(): UserClient;
    whoami(): Promise<any>;
}
export {};

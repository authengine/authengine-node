import { ClientConfig } from "../client";
export default class SessionClient {
    private config;
    constructor(config: ClientConfig);
    getById(data: {
        id: string;
    }): any;
    getByToken(data: {
        token: string;
    }): any;
    getByBearerTokenFromHeader(request: any): any;
}

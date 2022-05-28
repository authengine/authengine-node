import { ClientConfig } from "../client";
import { CreateUserData, GetUserData } from "./types";
export default class UserClient {
    private config;
    constructor(config: ClientConfig);
    get(data: GetUserData): Promise<any>;
    create(data: CreateUserData): Promise<any>;
}

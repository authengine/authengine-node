import { ClientConfig } from "../client";
import { CreateMagicLinkData, ValidateMagicLinkAttemptData } from "./types";
export default class MagicLinkClient {
    private config;
    constructor(config: ClientConfig);
    create(data: CreateMagicLinkData): any;
    send(data: CreateMagicLinkData): any;
    validate(data: ValidateMagicLinkAttemptData): Promise<any>;
}

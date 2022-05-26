import { ClientConfig } from "../client";

import { CreateMagicLinkData, ValidateMagicLinkAttemptData } from "./types";

export default class MagicLinkClient {
  private config: ClientConfig;
  constructor(config: ClientConfig) {
    this.config = config;
  }

  public create(data: CreateMagicLinkData) {
    return this.send(data);
  }

  public send(data: CreateMagicLinkData) {
    return this.config.apiRequest({
      method: "POST",
      url: "/public/auth/magic-link",
      data,
    });
  }

  public validate(data: ValidateMagicLinkAttemptData): Promise<any> {
    return this.config.apiRequest({
      method: "GET",
      url: `/public/auth/magic-link/${data.requestId}/validate`,
      data: {
        token: data.token,
      },
    });
  }
}

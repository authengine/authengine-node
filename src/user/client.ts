import { ClientConfig } from "../client";

import { CreateUserData, GetUserData } from "./types";

export default class UserClient {
  private config: ClientConfig;
  constructor(config: ClientConfig) {
    this.config = config;
  }

  public get(data: GetUserData): Promise<any> {
    return this.config.apiRequest({
      method: "GET",
      url: `/management/user`,
      data,
    });
  }

  public create(data: CreateUserData): Promise<any> {
    return this.config.apiRequest({
      method: "POST",
      url: `/management/user`,
      data,
    });
  }
}

import axios, { AxiosRequestConfig } from "axios";

import {
  ClientConfig,
  CreateUserData,
  CreateMagicLinkData,
  ValidateMagicLinkAttemptData,
} from "./types";

class SessionClient {
  private config: ClientConfig;
  constructor(config: ClientConfig) {
    this.config = config;
  }

  public getById(data: { id: string }) {
    return this.config.apiRequest({
      method: "GET",
      url: `/sessions/${data.id}`,
    });
  }

  public validateToken(data: { token: string }) {
    return this.config.apiRequest({
      method: "POST",
      url: `/management/sessions/validate-token`,
      data,
    });
  }
}

class MagicLinkClient {
  private config: ClientConfig;
  constructor(config: ClientConfig) {
    this.config = config;
  }

  public create(data: CreateMagicLinkData) {
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

class UserClient {
  private config: ClientConfig;
  constructor(config: ClientConfig) {
    this.config = config;
  }

  public getById(id: string): Promise<any> {
    return this.config.apiRequest({
      method: "GET",
      url: `/management/user/${id}`,
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

export class Client {
  config: ClientConfig;

  constructor(config: ClientConfig) {
    if (!config.apiUrl) throw new Error("apiUrl is required.");
    if (!config.privateToken) throw new Error("privateToken is required.");

    this.config = config;

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${config.privateToken}`;
    axios.defaults.baseURL = config.apiUrl;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    if (!config.apiRequest) {
      config.apiRequest = (config: AxiosRequestConfig) => axios.request(config);
    }
  }

  private apiRequest(config: AxiosRequestConfig): Promise<any> {
    return axios.request(config);
  }

  get magicLink() {
    return new MagicLinkClient(this.config);
  }

  get user() {
    return new UserClient(this.config);
  }

  get session() {
    return new SessionClient(this.config);
  }

  whoami(): Promise<any> {
    return this.apiRequest({
      method: "GET",
      url: "/management/tenant",
    });
  }
}

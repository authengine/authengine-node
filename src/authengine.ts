import axios, { AxiosRequestConfig } from "axios";

import {
  ClientConfig,
  CreateUserData,
  CreateMagicLinkData,
  ValidateMagicLinkAttemptData,
} from "./types";

class AuthClient {
  private config: ClientConfig;
  constructor(config: ClientConfig) {
    this.config = config;
  }

  createMagicLink(data: CreateMagicLinkData) {
    return this.config.apiRequest({
      method: "POST",
      url: "/public/auth/magic-link",
      data,
    });
  }

  validateMagicLinkAttempt(data: ValidateMagicLinkAttemptData): Promise<any> {
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

  getById(id: string): Promise<any> {
    return this.config.apiRequest({
      method: "GET",
      url: `/management/user/${id}`,
    });
  }

  create(data: CreateUserData): Promise<any> {
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

  get auth() {
    return new AuthClient(this.config);
  }

  get user() {
    return new UserClient(this.config);
  }

  whoami(): Promise<any> {
    return this.apiRequest({
      method: "GET",
      url: "/management/tenant",
    });
  }
}

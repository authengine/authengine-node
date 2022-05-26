import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import SessionClient from "./session/client";
import MagicLinkClient from "./magic-link/client";
import UserClient from "./user/client";

export interface ClientConfig {
  apiUrl: string;
  publicKey?: string;
  secretKey: string;
  apiRequest?: (axiosConfig: AxiosRequestConfig) => any;
}

export class Client {
  config: ClientConfig;

  constructor(config: ClientConfig) {
    if (!config.apiUrl) throw new Error("apiUrl is required.");
    if (!config.secretKey) throw new Error("secretKey is required.");

    this.config = config;

    const defaultFetcher: ClientConfig["apiRequest"] = async (
      config: AxiosRequestConfig
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .request(config)
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error: AxiosError) => {
            if (error.response) {
              reject(error.response.data);
            }
            reject(error);
          });
      });
    };

    axios.defaults.baseURL = config.apiUrl;
    axios.defaults.headers.common["x-secret-key"] = config.secretKey;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    if (!config.apiRequest) {
      config.apiRequest = defaultFetcher;
    }
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
    return this.config.apiRequest({
      method: "GET",
      url: "/management/project",
    });
  }
}

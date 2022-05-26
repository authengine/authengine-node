import { ClientConfig } from "../client";
import utils from "../utils";

export default class SessionClient {
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

  public getByToken(data: { token: string }) {
    return this.config.apiRequest({
      method: "POST",
      url: `/management/sessions/validate-token`,
      data,
    });
  }

  public getByBearerTokenFromHeader(request) {
    const bearerToken = utils.getBearerTokenFromHeader(request);
    if (bearerToken) {
      return this.getByToken({ token: bearerToken });
    } else {
      return Promise.reject(new Error("No bearer token found"));
    }
  }
}

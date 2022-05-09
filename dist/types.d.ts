import { AxiosRequestConfig } from "axios";
export interface ClientConfig {
    tenantId: string;
    apiUrl: string;
    publicToken?: string;
    privateToken: string;
    apiRequest?: (axiosConfig: AxiosRequestConfig) => any;
}
export interface CreateUserData {
    email: string;
    username?: string;
    name?: string;
}
export interface CreateMagicLinkData {
    email: string;
}
export interface CreateMagicLinkResponse {
    id: string;
    token: string;
}
export interface ValidateMagicLinkAttemptData {
    requestId: string;
    token: string;
}

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

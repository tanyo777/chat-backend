export enum TokenExpiration {
  Access = 24 * 60 * 60, // 24hours
  Refresh = 7 * 24 * 60 * 60, // 7 days
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userId: string;
}

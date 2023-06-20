export enum TokenExpiration {
  Access = 5 * 60, // 5 minutes
  Refresh = 7 * 24 * 60 * 60, // 7 days
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userId: number;
}


export interface Channel {
  id: string;
  tvgId?: string;
  name: string;
  logo: string;
  group: string;
  url: string;
  licenseKey?: string; // keyid:key
  licenseType?: string;
  userAgent?: string;
  cookie?: string;
  isPro: boolean;
}

export interface EPGProgram {
  start: string;
  stop: string;
  channel: string;
  title: string;
  desc?: string;
}

export interface TokenInfo {
  token: string;
  expiresAt?: string;
  allowedDevices: string[];
  deviceLimit: number;
  allowAdultContent: boolean;
}

export enum UserTier {
  FREE = 'FREE',
  PRO = 'PRO',
  GUEST = 'GUEST'
}

export interface UserSession {
  tier: UserTier;
  token: string;
  tokenData?: TokenInfo;
}

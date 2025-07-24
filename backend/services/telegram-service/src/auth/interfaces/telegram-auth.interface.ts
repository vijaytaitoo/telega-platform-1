export interface TelegramLoginData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface TelegramUserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface TelegramWebAppData {
  initData: string;
}

export interface JwtPayload {
  sub: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}
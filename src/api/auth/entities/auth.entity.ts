export class User {
  constructor(
      public name: string,
      public email: string,
      public phone: string,
      public password: string,
      public id?: number,
  ) {}
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
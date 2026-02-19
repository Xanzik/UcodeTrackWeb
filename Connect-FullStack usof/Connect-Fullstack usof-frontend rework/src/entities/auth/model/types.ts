import type { IUser } from "@/entities/user";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  status: number;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

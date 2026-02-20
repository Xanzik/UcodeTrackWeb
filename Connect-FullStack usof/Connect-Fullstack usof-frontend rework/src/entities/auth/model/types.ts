import type { IUser } from "@/entities/user";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  status: number;
  message: string;
}

export interface ActivateRequest {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  passwordConfirmation: string;
  login: string;
}

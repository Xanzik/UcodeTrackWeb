export type UserDTO = {
  id: string;
  login: string;
  email: string;
  fullName?: string;
  profilePicture: string;
  rating: number;
  role: "user" | "admin";
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: UserDTO;
  status: number;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

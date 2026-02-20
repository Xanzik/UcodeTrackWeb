export interface IUser {
  id: string;
  login: string;
  email: string;
  fullName?: string;
  profilePicture: string;
  rating: number;
  role: "user" | "admin";
}

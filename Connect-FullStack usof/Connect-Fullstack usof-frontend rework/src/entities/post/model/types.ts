import type { IUser } from "@/entities/user";

export interface IPost {
  id: number;
  title: string;
  status: "active" | "inactive";
  authorId: number;
  isBlocked: boolean;
  content: string;
  screenshot: string;
  createdAt: string;
  updatedAt: string;
  author: IUser;
}

import type { IUser } from "@/entities/user";
import type { ICategory } from "@/entities/category/model/types.ts";

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
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  author: IUser;
  categories: ICategory[];
}

export interface PostsGetRequest {
  search?: string;
  categories?: string[];
}

import type { IUser } from "@/entities/user";

export interface HeaderProps {
  user: IUser | null;
  // query: string;
  // onQueryChange: (value: string) => void;
  // onSearch: () => void;
  className?: string;
}

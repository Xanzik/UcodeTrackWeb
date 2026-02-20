import { Header } from "@/features/header/Header.tsx";
import { useAppSelector } from "@/app/hooks";

export default function HomePage() {
  const user = useAppSelector((state) => state.user.user);
  return <Header user={user} />;
}

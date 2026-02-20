import { AppRouter } from "@/app/providers/router";
import { useAppInit } from "@/app/hooks";

export function App() {
  useAppInit();
  return <AppRouter />;
}

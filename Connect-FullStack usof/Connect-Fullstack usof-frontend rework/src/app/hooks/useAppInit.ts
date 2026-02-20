import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { initAuth } from "@/app/model/init/initAuth.ts";

export function useAppInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initAuth(dispatch);
  }, [dispatch]);
}

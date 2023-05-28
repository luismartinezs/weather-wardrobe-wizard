import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export function useAuthRedirect() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (user) {
    const { redirect } = router.query;
    const _redirect = Array.isArray(redirect) ? redirect[0] : redirect;

    router.push(_redirect || "/");
  }
}

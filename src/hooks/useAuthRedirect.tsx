import { useRouter } from "next/router";
import { useAuthUser } from "./useAuthUser";

export function useAuthRedirect() {
  const router = useRouter();
  const { user } = useAuthUser();

  if (user) {
    const { redirect } = router.query;
    const _redirect = Array.isArray(redirect) ? redirect[0] : redirect;

    router.push(_redirect || "/");
  }
}

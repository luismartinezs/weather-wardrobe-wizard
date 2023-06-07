import { useRouter } from "next/router";

import { useUser } from "@/context/User";

export function useAuthRedirect() {
  const router = useRouter();
  const { user } = useUser();

  if (user) {
    const { redirect } = router.query;
    const _redirect = Array.isArray(redirect) ? redirect[0] : redirect;

    router.push(_redirect || "/");
  }
}

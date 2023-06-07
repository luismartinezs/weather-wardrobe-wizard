import { useRouter } from "next/router";

import useStore from "@/store";

export function useAuthRedirect() {
  const router = useRouter();
  const { user } = useStore();

  if (user) {
    const { redirect } = router.query;
    const _redirect = Array.isArray(redirect) ? redirect[0] : redirect;

    router.push(_redirect || "/");
  }
}

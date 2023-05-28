import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRouteChange = (callback: () => void, deps: Array<unknown>) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      callback();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [...deps, callback, router.events]);
};

import { Router } from "next/router";
import { useEffect, useState } from "react";

export function useRouteLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });
  }, []);

  return isLoading;
}

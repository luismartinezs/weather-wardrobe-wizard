import { AppCheckTokenResult, getToken } from "firebase/app-check";

import { appCheck } from "@/firebase/app";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchErrorHandler(
  url: RequestInfo | URL,
  errorMessage: string,
  method: Method = "GET",
  body?: any
) {
  const headers = await withAppCheck({ "Content-Type": "application/json" });

  const fetchOptions =
    method === "GET" || method === "DELETE"
      ? { method, headers }
      : { method, headers, body: JSON.stringify(body) };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function withAppCheck(
  headers: HeadersInit = {}
): Promise<HeadersInit> {
  let appCheckTokenResponse: AppCheckTokenResult;
  try {
    appCheckTokenResponse = await getToken(appCheck, /* forceRefresh= */ false);
  } catch (err) {
    console.error(err);
    return headers;
  }
  return {
    ...headers,
    "X-Firebase-AppCheck": appCheckTokenResponse.token,
  };
}

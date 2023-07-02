import { AppCheck, AppCheckTokenResult, getToken } from "firebase/app-check";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchErrorHandler({
  url,
  errorMessage,
  method = "GET",
  body,
  appCheck,
}: {
  url: RequestInfo | URL;
  errorMessage: string;
  method?: Method;
  body?: any;
  appCheck?: AppCheck | null;
}) {
  const headers = await withAppCheck(appCheck, {
    "Content-Type": "application/json",
  });

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
  appCheck?: AppCheck | null,
  headers: HeadersInit = {}
): Promise<HeadersInit> {
  if (!appCheck) {
    return headers;
  }
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

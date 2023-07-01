type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchErrorHandler(
  url: RequestInfo | URL,
  errorMessage: string,
  method: Method = "GET",
  body?: any
) {
  const headers = { "Content-Type": "application/json" };

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

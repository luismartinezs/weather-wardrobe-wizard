export async function fetchErrorHandler(input: RequestInfo | URL, errorMessage: string) {
  const response = await fetch(input);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
}
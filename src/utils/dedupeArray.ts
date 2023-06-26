export function dedupeArray(arr: any[]) {
  return [...new Set(arr)];
}

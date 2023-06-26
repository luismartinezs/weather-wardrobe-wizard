export function areArraysOverlapping<T>(arr1: T[], arr2: T[]) {
  const set = new Set(arr1);

  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) {
      return true;
    }
  }

  return false;
}

/**
 * Inclusive max, exclusive min
 */
export function between(x: number, ...ranges: [number, number]) {
  const min = Math.min(...ranges);
  const max = Math.max(...ranges);

  return x > min && x <= max;
}

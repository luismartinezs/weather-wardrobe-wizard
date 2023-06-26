function removeByIndex(arr: any[], index: number): any[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default removeByIndex;
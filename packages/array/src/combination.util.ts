export function combination(arr: any[]) {
  return arr.reduce(
    (acc: any[], cur: any) => [...acc, ...acc.map((a) => a + ',' + cur), cur],
    [],
  );
}

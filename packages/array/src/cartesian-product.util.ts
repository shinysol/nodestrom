/**
 * 카르테시안 곱
 */
function cartesianProduct(...arr: any[][]) {
  return arr.reduce((acc, cur) =>
    acc.flatMap((fl) => cur.map((c) => [fl, c].flat()))
  );
}
export { cartesianProduct };

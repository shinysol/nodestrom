/**
 * Cartesian Product
 * @description
 * Generate internal cartesian product
 */
function cartesianProduct(...arr: any[][]) {
  return arr.reduce((acc, cur) =>
    acc.flatMap((fl) => cur.map((c) => [fl, c].flat()))
  );
}
export { cartesianProduct };

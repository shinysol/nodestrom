import { arrayChecker } from "./array-checker.util";

/** array sorter
 * @description
 * - i) array of primitives - no need key
 * - ii) array of objects - keys in need
 */
function sorter<T>(
  arr: T[],
  options?: { key?: keyof T; order?: "ASC" | "DESC" | "asc" | "desc" }
): T[] {
  const ASCENDING = ["ASC", "asc"];
  const DESCENDING = ["DESC", "desc"];
  const { key, order = "ASC" } = options || {};
  if (!arrayChecker(arr, true)) {
    return arr;
  }
  if (key) {
    return arr.sort((a, b) =>
      // object types
      ASCENDING.includes(order)
        ? /* ASCENDING */
          a[key] < b[key]
          ? -1
          : 1
        : DESCENDING.includes(order)
        ? /* DESCENDING */
          a[key] > b[key]
          ? -1
          : 1
        : 0
    );
  } else {
    return arr.sort((a, b) =>
      // primitive types
      ASCENDING.includes(order)
        ? /* ASCENDING */
          a < b
          ? -1
          : 1
        : DESCENDING.includes(order)
        ? /* DESCENDING */
          a > b
          ? -1
          : 1
        : 0
    );
  }
}
export { sorter as arraySorter };

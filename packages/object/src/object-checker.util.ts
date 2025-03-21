/**
 * Object checker
 * @description
 * Check anything, whether [empty or non-empty] not-array object or not
 */
function objectChecker(object: any, includeEmptyObject: boolean = true) {
  return (
    object &&
    typeof object === "object" &&
    !Array.isArray(object) &&
    (includeEmptyObject || Object.keys(object).length !== 0)
  );
}

/**
 * Object's key checker
 * @description
 * Check object is object, then check it has key of specific name `key`.
 * When object is not an "object", it returns `undefined`.
 */
function objectHasKey(object: any, key: string) {
  if (!objectChecker(object)) return undefined;
  return Object.keys(object as { [key: string]: any }).includes(key);
}

/**
 * All-undefined-valued-object checker
 * @description
 * Check object is object, then check all of the values are `undefined`.
 * When object is not an "object", it returns undefined.
 */
function isAllObjectValuesUndefined(object: any) {
  if (!objectChecker(object)) return undefined;
  return Object.values(object).every((value) => value === undefined);
}

export { objectChecker, objectHasKey, isAllObjectValuesUndefined };

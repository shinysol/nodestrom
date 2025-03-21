function arrayChecker(
  object: any,
  includeEmptyArray: boolean = true,
): object is any[] {
  return (
    object && Array.isArray(object) && (includeEmptyArray || object.length > 0)
  );
}
function isEmptyArray(object: any) {
  return arrayChecker(object) && (object as any[]).length === 0;
}
export { arrayChecker, isEmptyArray };

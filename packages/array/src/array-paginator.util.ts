/**
 * Array paginator
 * @description
 * get limited items from array with page_no, limit
 */
function arrayPaginator<T>(array: T[], page_no: number, limit: number) {
  return array.slice((page_no - 1) * limit, page_no * limit);
}
export { arrayPaginator };

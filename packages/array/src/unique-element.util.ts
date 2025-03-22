function arrayUniqueElement<T>(array: T[]) {
  return [...new Set(array)];
}
export { arrayUniqueElement };

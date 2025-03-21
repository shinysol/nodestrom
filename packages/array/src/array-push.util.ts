function arrayPush<T>(target: T[], ...items: T[]) {
  if (target === undefined && items.every((item) => item === undefined)) {
    return undefined;
  }
  const filtered = items.filter((item) => item);
  const array = target ? [...target] : [];
  array.push(...filtered);
  return array;
}
export { arrayPush };

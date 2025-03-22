export function dateAdd(date: Date, days: number) {
  try {
    return new Date(date.getTime() + 86400 * days * 1000);
  } catch {
    return null;
  }
}

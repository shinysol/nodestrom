import { DateTime } from './datetime/datetime.util';

export function arrayBetweenDates(
  from: string,
  to: string,
  options?: {
    descending?: boolean;
  },
) {
  const howManyDates = new DateTime(to).diffInDay(new DateTime(from));
  const array = Array.from({ length: howManyDates + 1 }, (v, k) =>
    new DateTime(from).addDays(k).getDateString(),
  );
  return options?.descending ? array.reverse() : array;
}

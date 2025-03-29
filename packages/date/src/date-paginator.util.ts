import { DateTime } from './datetime/datetime.util.js';

export function datePaginator(arg: {
  from: string;
  to: string;
  page_no: number;
  limit: number;
  descending?: boolean;
}): { from: string | undefined; to: string | undefined } {
  if (!arg) return { from: undefined, to: undefined };
  const { from, to, page_no, limit, descending } = arg;
  const pagedFirstDate = new DateTime(from)
    .setMidnight()
    .addDays(limit * (page_no - 1));
  const pagedLastDate = new DateTime(from)
    .setMidnight()
    .addDays(limit * page_no - 1);
  if (
    new DateTime(to).isBeforeThan(pagedFirstDate) ||
    new DateTime(from).isLaterThan(pagedLastDate)
  ) {
    return {
      from: undefined,
      to: undefined,
    };
  }
  if (!descending) {
    return {
      from: new DateTime(from)
        .setMidnight()
        .addDays(limit * (page_no - 1))
        .getDateString(),
      to: DateTime.min(
        new DateTime(from).setMidnight().addDays(limit * page_no - 1),
        new DateTime(to),
      ).getDateString(),
    };
  } else {
    return {
      from: DateTime.max(
        new DateTime(to).setMidnight().addDays(-limit * page_no + 1),
        new DateTime(from),
      ).getDateString(),
      to: new DateTime(to)
        .setMidnight()
        .addDays(-limit * (page_no - 1))
        .getDateString(),
    };
  }
}

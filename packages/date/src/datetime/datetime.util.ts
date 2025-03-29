import { Decimal } from "decimal.js";
import { dateChecker } from "../date-checker.util.js";
import { dateFormatPreset } from "../date-format.util.js";
import { dateParse } from "../parse.util.js";

export class DateTime {
  private _date = new Date();
  constructor();
  constructor(date: DateTime); // #0
  constructor(date: Date); // #1
  constructor(year?: number, month?: number, day?: number); // #2
  constructor(date: string); // #3
  constructor(date: DateTime | Date | string); // #A1
  constructor(arg1?: unknown, arg2?: unknown, arg3?: unknown) {
    if (arg1 instanceof DateTime) {
      return arg1;
    }
    if (!arg1 && !arg2 && !arg3) {
      this._date = new Date();
    } else if (
      arg1 &&
      arg2 &&
      arg3 &&
      !Number.isNaN(arg1) &&
      !Number.isNaN(arg2) &&
      !Number.isNaN(arg3)
    ) {
      // #2
      const year = arg1 as number;
      const month = arg2 as number;
      const day = arg3 as number;
      if (year && month && day) {
        this._date = new Date(year, month - 1, day);
      }
    } else if (!arg2 && !arg3 && dateChecker(arg1)) {
      // #1
      this._date = new Date(arg1 as Date);
    } else if (!arg2 && !arg3 && typeof arg1 === "string") {
      // 3#
      const parsed = dateParse(arg1);
      if (parsed === null) {
        throw Error("parse error");
      }
      this._date = parsed;
    }
  }
  getUTCString() {
    return dateFormatPreset(this._date, "ISO8601UTC");
  }

  getDateString(separator: "-" | "/" = "-") {
    return dateFormatPreset(this._date, "YMD", separator);
  }

  getDateObject() {
    return new Date(this._date);
  }

  getFullYear() {
    return this.getDateObject()?.getFullYear();
  }

  getAgeFromBirth() {
    return this.diffInYear(new DateTime());
  }

  addDays(days: number) {
    this._date.setDate(this._date.getDate() + days);
    return this;
  }

  addWeeks(weeks: number) {
    this._date.setDate(this._date.getDate() + weeks * 7);
    return this;
  }

  addHours(hours: number) {
    this._date.setHours(this._date.getHours() + hours);
    return this;
  }

  addSeconds(seconds: number) {
    this._date.setMilliseconds(this._date.getMilliseconds() + seconds * 1000);
    return this;
  }

  private _diff(date: DateTime) {
    return new Decimal(this._date.getTime()).minus(
      date.getDateObject().getTime()
    );
  }

  diffInMs(date: DateTime) {
    return this._diff(date).round().toNumber();
  }

  diffInHour(date: DateTime) {
    return this._diff(date).div(3600000).toNumber();
  }

  diffInDay(date: DateTime, withDecimalPart?: boolean) {
    const diff = this._diff(date).div(3600000 * 24);
    return withDecimalPart ? diff.toNumber() : diff.floor().toNumber();
  }

  diffInYear(date: DateTime) {
    const d1 = this.getDateObject();
    const d2 = date.getDateObject();

    const year1 = d1.getFullYear();
    const year2 = d2.getFullYear();

    let yearsDiff = year2 - year1;

    if (
      d1.getMonth() > d2.getMonth() ||
      (d1.getMonth() === d2.getMonth() && d1.getDate() > d2.getDate())
    ) {
      yearsDiff--;
    }

    return yearsDiff;
  }

  setMidnight() {
    this._date.setHours(0, 0, 0, 0);
    return this;
  }

  setTime(hours: number, min?: number, sec?: number, ms?: number) {
    return this._date.setHours(hours, min, sec, ms);
  }

  // ConstructorParameters를 이용해서 뭔가 깔끔하게 만들고 싶은데.. 일단 보류

  isLaterThan(): boolean;
  isLaterThan(date?: DateTime): boolean;
  isLaterThan(date?: Date): boolean;
  isLaterThan(date?: string): boolean;
  isLaterThan(date?: Date | string | DateTime) {
    if (!date) return undefined;
    const dateTime =
      date instanceof DateTime ? date ?? new DateTime() : new DateTime(date);
    return this._diff(dateTime).greaterThan(0);
  }

  isLaterThanOrEqualTo(): boolean;
  isLaterThanOrEqualTo(date: Date): boolean;
  isLaterThanOrEqualTo(date: DateTime): boolean;
  isLaterThanOrEqualTo(date: string): boolean;
  isLaterThanOrEqualTo(date?: Date | string | DateTime) {
    if (!date) return undefined;
    const dateTime =
      date instanceof DateTime ? date ?? new DateTime() : new DateTime(date);
    return this._diff(dateTime).greaterThanOrEqualTo(0);
  }

  isBeforeThan(): boolean;
  isBeforeThan(date?: Date): boolean;
  isBeforeThan(date?: DateTime): boolean;
  isBeforeThan(date?: string): boolean;
  isBeforeThan(date?: Date | string | DateTime) {
    if (!date) return undefined;
    const dateTime =
      date instanceof DateTime ? date ?? new DateTime() : new DateTime(date);
    return this._diff(dateTime).lessThan(0);
  }

  isBeforeThanOrEqualTo(): boolean;
  isBeforeThanOrEqualTo(date?: Date): boolean;
  isBeforeThanOrEqualTo(date?: DateTime): boolean;
  isBeforeThanOrEqualTo(date?: string): boolean;
  isBeforeThanOrEqualTo(date?: Date | string | DateTime) {
    if (!date) return undefined;
    const dateTime =
      date instanceof DateTime ? date ?? new DateTime() : new DateTime(date);
    return this._diff(dateTime).lessThanOrEqualTo(0);
  }

  clone() {
    return new DateTime(this._date);
  }

  static min(date1: DateTime, date2: DateTime) {
    return date1.getDateObject() < date2.getDateObject() ? date1 : date2;
  }

  static max(date1: DateTime, date2: DateTime) {
    return date1.getDateObject() > date2.getDateObject() ? date1 : date2;
  }

  static countDate(
    from: DateTime | string | Date,
    to: DateTime | string | Date,
    excludeBothDates?: boolean
  ) {
    return (
      new DateTime(to).diffInDay(new DateTime(from)) +
      (excludeBothDates ? -1 : 1)
    );
  }

  isToday(): boolean {
    const now = new Date();
    return (
      this._date.getFullYear() === now.getFullYear() &&
      this._date.getMonth() === now.getMonth() &&
      this._date.getDate() === now.getDate()
    );
  }
}

export function dateFormat(date: Date, formatString: string) {
  if (!date) return '';
  const padZero = (number: number, length: number = 2) => {
    const padded = number.toString();
    return '0'.repeat(Math.max(0, length - padded.length)) + padded;
  };
  if (formatString.includes('Z') && !formatString.includes('ZZ')) {
    const year = date.getUTCFullYear();
    const month = padZero(date.getUTCMonth() + 1);
    const day = padZero(date.getUTCDate());
    const hours = padZero(date.getUTCHours());
    const minutes = padZero(date.getUTCMinutes());
    const seconds = padZero(date.getUTCSeconds());
    const milliseconds = padZero(date.getUTCMilliseconds(), 3);
    return formatString
      .replace('YYYY', year.toString())
      .replace('YY', year.toString().substring(2, 4))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('MM', minutes)
      .replace('SS', seconds)
      .replace('SSS', milliseconds);
  }
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  const milliseconds = padZero(date.getMilliseconds(), 3);
  const tzOffset = date.getTimezoneOffset();
  const timezoneString = tzOffset === 0 ? 'Z' : `+${date.getTimezoneOffset()}`;
  return formatString
    .replace('YYYY', year.toString())
    .replace('YY', year.toString().substring(2, 4))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('MM', minutes)
    .replace('SS', seconds)
    .replace('SSS', milliseconds)
    .replace('ZZ', timezoneString);
}

/**
 * Date Formatter Presetted
 *
 * @example
 * YMD: YYYY-MM-DD
 * YMDHMS: YYYY-MM-DD HH:MM:SS
 * YMDHMSS: YYYY-MM-DD HH:MM:SS.SSS
 * @description
 */
export const dateFormatPreset = (
  date: Date,
  formatString: string,
  seperator: '-' | '/' = '-',
) => {
  switch (formatString) {
    case 'YMD':
      return dateFormat(date, `YYYY${seperator}MM${seperator}DD`);
    case 'YMDHMS':
      return dateFormat(date, `YYYY${seperator}MM${seperator}DD HH:MM:SS`);
    case 'YMDHMSS':
      return dateFormat(date, `YYYY${seperator}MM${seperator}DD HH:MM:SS.SSS`);
    case 'ISO8601UTC':
      return dateFormat(date, `YYYY${seperator}MM${seperator}DDTHH:MM:SSZ`);
    case 'ISO8601':
      return dateFormat(date, `YYYY${seperator}MM${seperator}DDTHH:MM:SSZZ`);
    case 'PLAINDATE':
      return dateFormat(date, `YYYYMMDD`);
    case 'PLAINDATETIME':
      return dateFormat(date, `YYYYMMDDHHMMSS`);
    case 'PLAINDATETIMEMS':
      return dateFormat(date, `YYYYMMDDHHMMSSSSS`);
  }
};

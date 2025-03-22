/**
 * Date 개체인지 판별
 * @description
 * 아래 StackOverflow 링크 참조
 * https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
 */
export function dateChecker(date: any) {
  return date instanceof Date;
}

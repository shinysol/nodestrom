export type Timezone = "" | "Asia/Seoul";

/**
 * Date parser
 * @desciption
 * Timezone setting is under development
 */
export function dateParse(
  dateString: string | number,
  options?: {
    timezone?: Timezone;
    format?: "YMD";
  }
) {
  if (!dateString) return null;
  // ISO 8601 정규식 표현
  const iso8601Regex =
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[-+]\d{2}:\d{2})?$/;
  const simpleDateFormatRegex = /^(\d{4})(?:-?)(\d{2})(?:-?)(\d{2})$/;
  const epochRegex = /^\d{10}(\.\d{1,3})?$/;
  // ISO 8601 정규식 표현 여부 체크 및 변환(YYYY-MM-DDTHH:mm:ss.sssZ)
  const isoMatch = dateString.toString().match(iso8601Regex);
  if (options?.format === undefined && isoMatch) {
    const dateString = `${
      //년
      parseInt(isoMatch[1], 10)
    }-${
      //월
      parseInt(isoMatch[2], 10).toString().padStart(2, "0")
    }-${
      //일
      parseInt(isoMatch[3], 10).toString().padStart(2, "0")
    }T${
      //시
      parseInt(isoMatch[4], 10).toString().padStart(2, "0")
    }:${
      //분
      parseInt(isoMatch[5], 10).toString().padStart(2, "0")
    }:${
      //초
      parseInt(isoMatch[6], 10).toString().padStart(2, "0") || "00"
    }.${
      isoMatch[7] ? isoMatch[7].substring(1, 4).padEnd(3, "0") || "000" : "000"
    }${isoMatch[8] || (options.timezone === "Asia/Seoul" ? "+09:00" : "")}`;
    return new Date(dateString);
  }

  // 단순 데이트 포맷 표현 여부 체크 및 변환 (YYYY-MM-DD)
  const simpleDateMatch = dateString.toString().match(simpleDateFormatRegex);
  if (simpleDateMatch) {
    const yearString = parseInt(simpleDateMatch[1], 10);
    const monthString = parseInt(simpleDateMatch[2], 10) - 1;
    const dateString = parseInt(simpleDateMatch[3], 10);
    if (monthString < 0 || monthString > 12 || dateString < 1) return null;
    return new Date(yearString, monthString, dateString);
  }
  const epochMatch = dateString.toString().match(epochRegex);
  if (options?.format === undefined && epochMatch) {
    const epochDate = new Date(0);
    epochDate.setUTCSeconds(+dateString);
    return epochDate;
  }

  // 매칭 안되면 null
  return null;
}

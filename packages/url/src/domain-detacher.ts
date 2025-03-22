const domainRegexPatternWithLocalhost =
  /^http[s]?:\/{2}(?:(?:[a-z0-9\-]+\.)?[a-z0-9]*\.(?:com|net|org|[a-z]{2,3}\.[a-z]{2}|io)|localhost(:[0-9]{1,5})?)+/;
const domainRegexPatternWithLocalhostAndLastSlash =
  /^http[s]?:\/{2}(?:(?:[a-z0-9\-]+\.)?[a-z0-9]*\.(?:com|net|org|[a-z]{2,3}\.[a-z]{2}|io)|localhost(:[0-9]{1,5})?)+\//;
type DomainDetacherResult = {
  domain: string | null;
  path: string;
};
const queryRegex = /\?.*$/;
/**
 * 도메인 분리 유틸
 * @description AWS S3에 활용할 경우 sourceKey 맨 앞에 슬래시가 없어야 하기 때문에 `removeFirstSlash` 옵션과 함께 사용해야 함
 */
type DomainDetacherOption = {
  /** 제거할 domain 특정 */
  domain?: string;
  /** path 맨 앞의 slash 제거 */
  removeFirstSlash?: boolean;
  /** query 파라미터 제거 */
  withoutQueries?: boolean;
};
export function domainDetacher(
  url: string,
  options?: DomainDetacherOption,
): DomainDetacherResult {
  if (!url) return { domain: null, path: url };
  const { domain, removeFirstSlash, withoutQueries } = options || {};
  const regexPattern = removeFirstSlash
    ? domainRegexPatternWithLocalhostAndLastSlash
    : domainRegexPatternWithLocalhost;
  const modifiedDomain =
    domain && domain.endsWith('/') ? domain.slice(0, -1) : domain;
  const match = url.match(regexPattern);
  const queryMatch = withoutQueries ? url.match(queryRegex)?.[0] : undefined;
  if (modifiedDomain && url.indexOf(modifiedDomain) === 0) {
    return {
      domain: modifiedDomain,
      path: url.replace(modifiedDomain, '').replace(queryMatch, ''),
    };
  } else if (!modifiedDomain && match) {
    return {
      domain: match[0],
      path: url.replace(regexPattern, '').replace(queryMatch, ''),
    };
  } else {
    return {
      domain: null,
      path: url.replace(queryMatch, ''),
    };
  }
}

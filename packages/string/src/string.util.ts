/**
 * Get until first space
 * @description
 * Get string until before its first space `" "`. IF there's no space, return `str` itself.
 */
function getUntilFirstSpace(str: string) {
  const spaceIndex = str.indexOf(" ");
  if (spaceIndex !== -1) {
    return str.substring(0, spaceIndex);
  } else {
    return str;
  }
}
export { getUntilFirstSpace };

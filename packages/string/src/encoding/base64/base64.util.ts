/**
 * Encode string to base-64
 */

function base64Encode(data: string): string {
  const buffer = Buffer.from(data, "utf-8");
  return buffer.toString("base64");
}

/**
 * Decode string from base-64
 */
function base64Decode(data: string): string {
  const buffer = Buffer.from(data, "base64");
  return buffer.toString("utf-8");
}

export { base64Encode, base64Decode };

import { createHash } from 'node:crypto';
function hash(input: string) {
  const hash = createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
export { hash };

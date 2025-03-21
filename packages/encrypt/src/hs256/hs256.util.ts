import { createHmac } from 'node:crypto';

// Function to sign data with HS256
function sign(data: string, secret: string): string {
  const hmac = createHmac('sha256', secret);
  hmac.update(data);
  const signature = hmac.digest('hex');
  return `${data}.${signature}`;
}

// Function to verify signature (not decryption)
function verify(signedData: string, secret: string): boolean {
  const parts = signedData.split('.');
  if (parts.length !== 2) {
    return false;
  }
  const data = parts[0];
  const expectedSignature = parts[1];
  const calculatedSignature = sign(data, secret).split('.')[1];
  return expectedSignature === calculatedSignature;
}
export { sign, verify };

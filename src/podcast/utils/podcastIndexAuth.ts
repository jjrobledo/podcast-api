import * as crypto from 'crypto';

export function generatePodcastIndexAuthHeaders(
  apiKey: string,
  apiSecret: string,
): Record<string, string> {
  const xAuthDate = Math.floor(Date.now() / 1000).toString(); // Current UTC unix epoch time as a string
  const authHeader = crypto
    .createHash('sha1')
    .update(apiKey + apiSecret + xAuthDate)
    .digest('hex');

  return {
    'User-Agent': 'YourAppName/YourAppVersion',
    'X-Auth-Date': xAuthDate,
    'X-Auth-Key': apiKey,
    Authorization: authHeader,
  };
}

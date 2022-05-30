const default_charset =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const randomString = (
  length: number,
  charset = default_charset,
): string => {
  const result: string[] = [];
  const charactersLength = charset.length;
  for (let i = 0; i < length; i++) {
    result.push(charset.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
};

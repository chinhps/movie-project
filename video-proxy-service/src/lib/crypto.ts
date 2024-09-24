import * as crypto from 'crypto';

export function decrypt(encryptedData: string, key: string): string | false {
  const data = Buffer.from(
    encryptedData.replace(/-/g, '+').replace(/_/g, '/'),
    'base64',
  );
  const cipher = 'aes-256-cbc';
  const ivLength = 16; // AES block size is 16 bytes
  const iv = data.slice(0, ivLength);
  const hmac = data.slice(ivLength, ivLength + 32);
  const encrypted = data.slice(ivLength + 32);
  const calculatedHmac = crypto
    .createHmac('sha256', key)
    .update(encrypted)
    .digest();

  if (crypto.timingSafeEqual(hmac, calculatedHmac)) {
    const decipher = crypto.createDecipheriv(cipher, key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Kiểm tra lỗi và xử lý các ngoại lệ, Lưu thêm log ở đây
    if (!decrypted) {
      return false;
    }

    return decrypted.toString();
  }

  // Xử lý lỗi tính toàn vẹn dữ liệu, Lưu thêm log ở đây
  return false;
}

export function encrypt(data: string, key: string): string {
  const cipher = 'aes-256-cbc';
  const ivLength = 16; // AES block size is 16 bytes
  const iv = crypto.randomBytes(ivLength);
  const encrypted =
    crypto.createCipheriv(cipher, key, iv).update(data, 'utf8', 'binary') +
    crypto.createCipheriv(cipher, key, iv).final('binary');
  const hmac = crypto
    .createHmac('sha256', key)
    .update(encrypted, 'binary')
    .digest('binary');
  const encryptedData = Buffer.from(iv + hmac + encrypted, 'binary').toString(
    'base64',
  );

  return encryptedData.replace(/\+/g, '-').replace(/\//g, '_');
}

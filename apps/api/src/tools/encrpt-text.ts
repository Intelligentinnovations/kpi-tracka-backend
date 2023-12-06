import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const password = 'WAQEETYTUWY&T*&GYIKWUGT&F*&^&E%&^R';
let key: Buffer;

export const encryptString = async (textToEncrypt: string) => {
  // The key length is dependent on the algorithm.
  // In this case for aes256, it is 32 bytes.
  if (!key) key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);
  console.log({encryptedText, toString:encryptedText.toString()})
  return encryptedText.toString();
};

export const decryptString = async (encryptedText: string) => {
  if (!key) key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(encryptedText)),
    decipher.final(),
  ]);
  console.log({decryptedText, toString:decryptedText.toString()})
  return decryptedText.toString();
};

const crypto = require('crypto');

const SECRET_KEY = crypto.createHash('sha256').update("123").digest('base64').substring(0, 32);
const IV = crypto.createHash('sha256').update("123").digest('base64').substring(0, 16);

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, IV);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, IV);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  } catch {
    return "Decryption failed";
  }
}

module.exports = { encrypt, decrypt };


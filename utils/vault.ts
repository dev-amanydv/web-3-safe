// utils/vault.ts
const enc = new TextEncoder();
const dec = new TextDecoder();

function randomBytes(len = 16) {
  const b = new Uint8Array(len);
  crypto.getRandomValues(b);
  return b;
}

function toB64(u8: Uint8Array) {
  return btoa(String.fromCharCode(...u8));
}

function fromB64(s: string) {
  const bin = atob(s);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}

async function derivePBKDF2Key(password: string, salt: Uint8Array, iterations = 180000) {
  const passKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    passKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function createEmptyVault(password: string) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = await derivePBKDF2Key(password, salt);

  const data = JSON.stringify({ accounts: [] });
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(data)
  );

  return {
    encryptedData: toB64(new Uint8Array(encrypted)),
    salt: toB64(salt),
    iv: toB64(iv),
  };
}
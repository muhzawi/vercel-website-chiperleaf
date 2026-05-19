/**
 * CipherLeaf — Cipher Service
 * Implements Caesar, XOR, Vigenère, and Affine cipher
 * All operations are based on Extended ASCII (mod 256)
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mod256(n) {
  return ((n % 256) + 256) % 256;
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Modular inverse of a mod 256 using Extended Euclidean
function modInverse256(a) {
  a = mod256(a);
  for (let x = 1; x < 256; x++) {
    if ((a * x) % 256 === 1) return x;
  }
  return null; // no inverse (a not coprime with 256)
}

function isCoprime256(a) {
  return gcd(mod256(a), 256) === 1;
}

// ─── Caesar Cipher ────────────────────────────────────────────────────────────

function caesarEncrypt(text, key) {
  const shift = parseInt(key, 10);
  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const processed = mod256(ascii + shift);
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `+${shift}`, processed, result: resultChar });
  }

  return { result, steps };
}

function caesarDecrypt(text, key) {
  const shift = parseInt(key, 10);
  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const processed = mod256(ascii - shift);
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `-${shift}`, processed, result: resultChar });
  }

  return { result, steps };
}

// ─── XOR Cipher ───────────────────────────────────────────────────────────────

function xorCipher(text, key) {
  const keyVal = parseInt(key, 10);
  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const processed = ascii ^ keyVal;
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `XOR ${keyVal}`, processed, result: resultChar });
  }

  return { result, steps };
}

// ─── Vigenère Cipher ──────────────────────────────────────────────────────────

function vigenereEncrypt(text, key) {
  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const keyChar = key[i % key.length];
    const keyAscii = keyChar.charCodeAt(0);
    const processed = mod256(ascii + keyAscii);
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `+${keyAscii}(${keyChar})`, processed, result: resultChar });
  }

  return { result, steps };
}

function vigenereDecrypt(text, key) {
  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const keyChar = key[i % key.length];
    const keyAscii = keyChar.charCodeAt(0);
    const processed = mod256(ascii - keyAscii);
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `-${keyAscii}(${keyChar})`, processed, result: resultChar });
  }

  return { result, steps };
}

// ─── Affine Cipher ────────────────────────────────────────────────────────────

function affineEncrypt(text, a, b) {
  a = parseInt(a, 10);
  b = parseInt(b, 10);

  if (!isCoprime256(a)) {
    throw new Error(`Kunci 'a' (${a}) harus coprime dengan 256`);
  }

  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const processed = mod256(a * ascii + b);
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `(${a}×${ascii}+${b}) mod 256`, processed, result: resultChar });
  }

  return { result, steps };
}

function affineDecrypt(text, a, b) {
  a = parseInt(a, 10);
  b = parseInt(b, 10);

  const aInv = modInverse256(a);
  if (aInv === null) {
    throw new Error(`Kunci 'a' (${a}) tidak memiliki invers mod 256`);
  }

  const steps = [];
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    const processed = mod256(aInv * (ascii - b));
    const resultChar = String.fromCharCode(processed);
    result += resultChar;
    steps.push({ char: text[i], ascii, operation: `${aInv}×(${ascii}-${b}) mod 256`, processed, result: resultChar });
  }

  return { result, steps };
}

// ─── Main Dispatcher ──────────────────────────────────────────────────────────

function encrypt(text, algorithm, key) {
  switch (algorithm) {
    case 'caesar':
      return caesarEncrypt(text, key);
    case 'xor':
      return xorCipher(text, key);
    case 'vigenere':
      return vigenereEncrypt(text, key);
    case 'affine': {
      const { a, b } = typeof key === 'object' ? key : { a: key, b: 0 };
      return affineEncrypt(text, a, b);
    }
    default:
      throw new Error(`Algoritma tidak dikenal: ${algorithm}`);
  }
}

function decrypt(text, algorithm, key) {
  switch (algorithm) {
    case 'caesar':
      return caesarDecrypt(text, key);
    case 'xor':
      return xorCipher(text, key); // XOR is reversible
    case 'vigenere':
      return vigenereDecrypt(text, key);
    case 'affine': {
      const { a, b } = typeof key === 'object' ? key : { a: key, b: 0 };
      return affineDecrypt(text, a, b);
    }
    default:
      throw new Error(`Algoritma tidak dikenal: ${algorithm}`);
  }
}

// ─── Algorithms Metadata ──────────────────────────────────────────────────────

function getAlgorithms() {
  return [
    {
      id: 'caesar',
      name: 'Caesar Cipher',
      description: 'Menggeser nilai ASCII setiap karakter sebesar kunci (shift)',
      keyType: 'number',
      keyLabel: 'Shift (1–255)',
      keyRange: { min: 1, max: 255 },
      formula: '(ASCII(c) + key) mod 256',
      difficulty: 'Pemula',
    },
    {
      id: 'xor',
      name: 'XOR Cipher',
      description: 'Operasi bitwise XOR antara nilai ASCII dan kunci. Reversible.',
      keyType: 'number',
      keyLabel: 'Kunci (1–255)',
      keyRange: { min: 1, max: 255 },
      formula: 'ASCII(c) XOR key',
      difficulty: 'Pemula',
    },
    {
      id: 'vigenere',
      name: 'Vigenère Cipher',
      description: 'Menggunakan string kunci yang diulang untuk menggeser tiap karakter',
      keyType: 'string',
      keyLabel: 'Kata Kunci (string)',
      formula: '(ASCII(c) + ASCII(key[i % len])) mod 256',
      difficulty: 'Menengah',
    },
    {
      id: 'affine',
      name: 'Affine Cipher',
      description: 'Transformasi linear menggunakan dua kunci a dan b',
      keyType: 'affine',
      keyLabel: 'a dan b (a coprime dengan 256)',
      formula: '(a × ASCII(c) + b) mod 256',
      difficulty: 'Lanjutan',
    },
  ];
}

// ─── Key Validator ────────────────────────────────────────────────────────────

function validateKey(algorithm, key) {
  switch (algorithm) {
    case 'caesar':
    case 'xor': {
      const n = parseInt(key, 10);
      if (isNaN(n) || n < 1 || n > 255) {
        return { valid: false, message: 'Kunci harus angka antara 1–255' };
      }
      return { valid: true };
    }
    case 'vigenere': {
      if (!key || typeof key !== 'string' || key.trim().length === 0) {
        return { valid: false, message: 'Kunci Vigenère tidak boleh kosong' };
      }
      return { valid: true };
    }
    case 'affine': {
      const { a, b } = typeof key === 'object' ? key : {};
      const aNum = parseInt(a, 10);
      const bNum = parseInt(b, 10);
      if (isNaN(aNum) || isNaN(bNum)) {
        return { valid: false, message: 'Kunci a dan b harus angka' };
      }
      if (!isCoprime256(aNum)) {
        return { valid: false, message: `Kunci 'a' (${aNum}) harus coprime dengan 256. Coba: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27...` };
      }
      if (bNum < 0 || bNum > 255) {
        return { valid: false, message: 'Kunci b harus antara 0–255' };
      }
      return { valid: true };
    }
    default:
      return { valid: false, message: 'Algoritma tidak dikenal' };
  }
}

// ─── ASCII Table ──────────────────────────────────────────────────────────────

function getAsciiTable() {
  const table = [];
  for (let i = 0; i < 256; i++) {
    let char, description, group;

    if (i === 0) { char = 'NUL'; description = 'Null Character'; group = 'control'; }
    else if (i === 1) { char = 'SOH'; description = 'Start of Heading'; group = 'control'; }
    else if (i === 2) { char = 'STX'; description = 'Start of Text'; group = 'control'; }
    else if (i === 3) { char = 'ETX'; description = 'End of Text'; group = 'control'; }
    else if (i === 4) { char = 'EOT'; description = 'End of Transmission'; group = 'control'; }
    else if (i === 5) { char = 'ENQ'; description = 'Enquiry'; group = 'control'; }
    else if (i === 6) { char = 'ACK'; description = 'Acknowledge'; group = 'control'; }
    else if (i === 7) { char = 'BEL'; description = 'Bell'; group = 'control'; }
    else if (i === 8) { char = 'BS'; description = 'Backspace'; group = 'control'; }
    else if (i === 9) { char = 'HT'; description = 'Horizontal Tab'; group = 'control'; }
    else if (i === 10) { char = 'LF'; description = 'Line Feed'; group = 'control'; }
    else if (i === 11) { char = 'VT'; description = 'Vertical Tab'; group = 'control'; }
    else if (i === 12) { char = 'FF'; description = 'Form Feed'; group = 'control'; }
    else if (i === 13) { char = 'CR'; description = 'Carriage Return'; group = 'control'; }
    else if (i === 14) { char = 'SO'; description = 'Shift Out'; group = 'control'; }
    else if (i === 15) { char = 'SI'; description = 'Shift In'; group = 'control'; }
    else if (i >= 16 && i <= 31) { char = `C${i}`; description = 'Control Character'; group = 'control'; }
    else if (i === 32) { char = 'SPC'; description = 'Space'; group = 'printable'; }
    else if (i >= 33 && i <= 126) {
      char = String.fromCharCode(i);
      description = getCharDescription(i);
      group = 'printable';
    }
    else if (i === 127) { char = 'DEL'; description = 'Delete'; group = 'control'; }
    else {
      char = String.fromCharCode(i);
      description = `Extended ASCII ${i}`;
      group = 'extended';
    }

    table.push({
      decimal: i,
      hex: i.toString(16).toUpperCase().padStart(2, '0'),
      binary: i.toString(2).padStart(8, '0'),
      char,
      description,
      group,
    });
  }
  return table;
}

function getCharDescription(code) {
  const map = {
    33: 'Exclamation Mark', 34: 'Double Quote', 35: 'Hash/Number Sign',
    36: 'Dollar Sign', 37: 'Percent Sign', 38: 'Ampersand',
    39: 'Single Quote', 40: 'Left Parenthesis', 41: 'Right Parenthesis',
    42: 'Asterisk', 43: 'Plus Sign', 44: 'Comma', 45: 'Hyphen-Minus',
    46: 'Period/Full Stop', 47: 'Slash/Solidus', 58: 'Colon',
    59: 'Semicolon', 60: 'Less-Than Sign', 61: 'Equals Sign',
    62: 'Greater-Than Sign', 63: 'Question Mark', 64: 'At Sign',
    91: 'Left Square Bracket', 92: 'Backslash', 93: 'Right Square Bracket',
    94: 'Caret/Circumflex', 95: 'Underscore', 96: 'Grave Accent',
    123: 'Left Curly Bracket', 124: 'Vertical Bar', 125: 'Right Curly Bracket',
    126: 'Tilde',
  };
  if (map[code]) return map[code];
  if (code >= 48 && code <= 57) return `Digit ${code - 48}`;
  if (code >= 65 && code <= 90) return `Uppercase ${String.fromCharCode(code)}`;
  if (code >= 97 && code <= 122) return `Lowercase ${String.fromCharCode(code)}`;
  return `Character ${String.fromCharCode(code)}`;
}

module.exports = {
  encrypt,
  decrypt,
  getAlgorithms,
  validateKey,
  getAsciiTable,
  isCoprime256,
};

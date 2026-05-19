/**
 * CipherLeaf — Frontend Cipher Utilities
 * Mirror dari backend cipher.service.js untuk operasi real-time tanpa API roundtrip
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function mod256(n) {
  return ((n % 256) + 256) % 256;
}

export function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

export function isCoprime256(a) {
  return gcd(mod256(parseInt(a, 10) || 0), 256) === 1;
}

export function modInverse256(a) {
  a = mod256(a);
  for (let x = 1; x < 256; x++) {
    if ((a * x) % 256 === 1) return x;
  }
  return null;
}

// ─── Caesar ───────────────────────────────────────────────────────────────────

export function caesarEncrypt(text, key) {
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

export function caesarDecrypt(text, key) {
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

// ─── XOR ──────────────────────────────────────────────────────────────────────

export function xorCipher(text, key) {
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

// ─── Vigenère ─────────────────────────────────────────────────────────────────

export function vigenereEncrypt(text, key) {
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

export function vigenereDecrypt(text, key) {
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

// ─── Affine ───────────────────────────────────────────────────────────────────

export function affineEncrypt(text, a, b) {
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  if (!isCoprime256(a)) throw new Error(`Kunci 'a' (${a}) harus coprime dengan 256`);
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

export function affineDecrypt(text, a, b) {
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const aInv = modInverse256(a);
  if (aInv === null) throw new Error(`Kunci 'a' (${a}) tidak memiliki invers mod 256`);
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

export function encrypt(text, algorithm, key) {
  if (!text) return { result: '', steps: [] };
  switch (algorithm) {
    case 'caesar': return caesarEncrypt(text, key);
    case 'xor': return xorCipher(text, key);
    case 'vigenere': return vigenereEncrypt(text, key);
    case 'affine': return affineEncrypt(text, key?.a ?? key, key?.b ?? 0);
    default: throw new Error(`Algoritma tidak dikenal: ${algorithm}`);
  }
}

export function decrypt(text, algorithm, key) {
  if (!text) return { result: '', steps: [] };
  switch (algorithm) {
    case 'caesar': return caesarDecrypt(text, key);
    case 'xor': return xorCipher(text, key);
    case 'vigenere': return vigenereDecrypt(text, key);
    case 'affine': return affineDecrypt(text, key?.a ?? key, key?.b ?? 0);
    default: throw new Error(`Algoritma tidak dikenal: ${algorithm}`);
  }
}

// ─── Key Validator ────────────────────────────────────────────────────────────

export function validateKey(algorithm, key) {
  switch (algorithm) {
    case 'caesar':
    case 'xor': {
      const n = parseInt(key, 10);
      if (isNaN(n) || n < 1 || n > 255) return { valid: false, message: 'Kunci harus angka 1–255' };
      return { valid: true };
    }
    case 'vigenere':
      if (!key || key.trim().length === 0) return { valid: false, message: 'Kunci tidak boleh kosong' };
      return { valid: true };
    case 'affine': {
      const { a, b } = key || {};
      if (!isCoprime256(a)) return { valid: false, message: `'a' (${a}) harus coprime dengan 256` };
      const bNum = parseInt(b, 10);
      if (isNaN(bNum) || bNum < 0 || bNum > 255) return { valid: false, message: 'b harus 0–255' };
      return { valid: true };
    }
    default: return { valid: false, message: 'Algoritma tidak dikenal' };
  }
}

// ─── ASCII Table ──────────────────────────────────────────────────────────────

const CONTROL_NAMES = {
  0:'NUL',1:'SOH',2:'STX',3:'ETX',4:'EOT',5:'ENQ',6:'ACK',7:'BEL',
  8:'BS',9:'HT',10:'LF',11:'VT',12:'FF',13:'CR',14:'SO',15:'SI',
  16:'DLE',17:'DC1',18:'DC2',19:'DC3',20:'DC4',21:'NAK',22:'SYN',23:'ETB',
  24:'CAN',25:'EM',26:'SUB',27:'ESC',28:'FS',29:'GS',30:'RS',31:'US',
  32:'SPC',127:'DEL'
};

export function generateAsciiTable() {
  return Array.from({ length: 256 }, (_, i) => {
    let char, description, group;
    if (i in CONTROL_NAMES) {
      char = CONTROL_NAMES[i];
      description = getControlDesc(i);
      group = i === 32 ? 'printable' : 'control';
    } else if (i >= 33 && i <= 126) {
      char = String.fromCharCode(i);
      description = getPrintableDesc(i);
      group = 'printable';
    } else {
      char = String.fromCharCode(i);
      description = `Extended ASCII ${i}`;
      group = 'extended';
    }
    return {
      decimal: i,
      hex: i.toString(16).toUpperCase().padStart(2, '0'),
      binary: i.toString(2).padStart(8, '0'),
      char, description, group,
    };
  });
}

function getControlDesc(i) {
  const map = {
    0:'Null Character',1:'Start of Heading',2:'Start of Text',3:'End of Text',
    4:'End of Transmission',5:'Enquiry',6:'Acknowledge',7:'Bell (Alert)',
    8:'Backspace',9:'Horizontal Tab',10:'Line Feed (Newline)',11:'Vertical Tab',
    12:'Form Feed',13:'Carriage Return',14:'Shift Out',15:'Shift In',
    27:'Escape',32:'Space',127:'Delete',
  };
  return map[i] || `Control Character`;
}

function getPrintableDesc(i) {
  if (i >= 48 && i <= 57) return `Digit ${i - 48}`;
  if (i >= 65 && i <= 90) return `Uppercase Letter ${String.fromCharCode(i)}`;
  if (i >= 97 && i <= 122) return `Lowercase Letter ${String.fromCharCode(i)}`;
  const specials = {
    33:'Exclamation Mark',34:'Double Quote',35:'Hash Sign',36:'Dollar Sign',
    37:'Percent Sign',38:'Ampersand',39:'Single Quote',40:'Left Parenthesis',
    41:'Right Parenthesis',42:'Asterisk',43:'Plus Sign',44:'Comma',
    45:'Hyphen',46:'Period',47:'Slash',58:'Colon',59:'Semicolon',
    60:'Less-Than',61:'Equals',62:'Greater-Than',63:'Question Mark',
    64:'At Sign',91:'Left Bracket',92:'Backslash',93:'Right Bracket',
    94:'Caret',95:'Underscore',96:'Backtick',123:'Left Brace',
    124:'Vertical Bar',125:'Right Brace',126:'Tilde',
  };
  return specials[i] || String.fromCharCode(i);
}

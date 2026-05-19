const cipherService = require('../services/cipher.service');

// POST /api/cipher/encrypt
const encryptText = (req, res) => {
  try {
    const { text, algorithm, key } = req.body;
    const { result, steps } = cipherService.encrypt(text, algorithm, key);

    res.json({
      success: true,
      data: {
        original: text,
        result,
        algorithm,
        key,
        steps: steps.slice(0, 100), // limit steps to first 100 chars for performance
        totalChars: text.length,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// POST /api/cipher/decrypt
const decryptText = (req, res) => {
  try {
    const { text, algorithm, key } = req.body;
    const { result, steps } = cipherService.decrypt(text, algorithm, key);

    res.json({
      success: true,
      data: {
        original: text,
        result,
        algorithm,
        key,
        steps: steps.slice(0, 100),
        totalChars: text.length,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/cipher/algorithms
const getAlgorithms = (req, res) => {
  res.json({
    success: true,
    data: cipherService.getAlgorithms(),
  });
};

// POST /api/cipher/validate-key
const validateKey = (req, res) => {
  const { algorithm, key } = req.body;
  const result = cipherService.validateKey(algorithm, key);
  res.json({ success: true, data: result });
};

// GET /api/ascii
const getAsciiTable = (req, res) => {
  res.json({
    success: true,
    data: cipherService.getAsciiTable(),
  });
};

// GET /api/ascii/:code
const getAsciiChar = (req, res) => {
  const code = parseInt(req.params.code, 10);
  if (isNaN(code) || code < 0 || code > 255) {
    return res.status(400).json({ success: false, message: 'Kode ASCII harus antara 0–255' });
  }
  const table = cipherService.getAsciiTable();
  res.json({ success: true, data: table[code] });
};

module.exports = { encryptText, decryptText, getAlgorithms, validateKey, getAsciiTable, getAsciiChar };

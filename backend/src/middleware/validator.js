const { body, param, validationResult } = require('express-validator');

// Middleware to check validation results
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// Validate encrypt/decrypt request
const validateCipherRequest = [
  body('text')
    .isString().withMessage('text harus berupa string')
    .notEmpty().withMessage('text tidak boleh kosong')
    .isLength({ max: 10000 }).withMessage('text maksimal 10.000 karakter'),

  body('algorithm')
    .isIn(['caesar', 'xor', 'vigenere', 'affine'])
    .withMessage('algorithm harus salah satu: caesar, xor, vigenere, affine'),

  body('key').custom((key, { req }) => {
    const algo = req.body.algorithm;
    if (!algo) return true;

    if (algo === 'caesar' || algo === 'xor') {
      const n = parseInt(key, 10);
      if (isNaN(n) || n < 1 || n > 255) {
        throw new Error('Kunci harus angka antara 1–255');
      }
    } else if (algo === 'vigenere') {
      if (!key || typeof key !== 'string' || key.trim().length === 0) {
        throw new Error('Kunci Vigenère tidak boleh kosong');
      }
    } else if (algo === 'affine') {
      if (typeof key !== 'object' || key === null) {
        throw new Error('Kunci Affine harus berupa objek {a, b}');
      }
    }
    return true;
  }),

  handleValidation,
];

// Validate validate-key request
const validateKeyRequest = [
  body('algorithm').isIn(['caesar', 'xor', 'vigenere', 'affine'])
    .withMessage('algorithm tidak valid'),
  body('key').exists().withMessage('key diperlukan'),
  handleValidation,
];

// Validate ASCII param
const validateAsciiCode = [
  param('code')
    .isInt({ min: 0, max: 255 })
    .withMessage('Kode ASCII harus integer antara 0–255'),
  handleValidation,
];

module.exports = { validateCipherRequest, validateKeyRequest, validateAsciiCode };

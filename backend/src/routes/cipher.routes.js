const express = require('express');
const router = express.Router();

const {
  encryptText,
  decryptText,
  getAlgorithms,
  validateKey,
  getAsciiTable,
  getAsciiChar,
} = require('../controllers/cipher.controller');

const {
  validateCipherRequest,
  validateKeyRequest,
  validateAsciiCode,
} = require('../middleware/validator');

// Cipher routes
router.post('/cipher/encrypt', validateCipherRequest, encryptText);
router.post('/cipher/decrypt', validateCipherRequest, decryptText);
router.get('/cipher/algorithms', getAlgorithms);
router.post('/cipher/validate-key', validateKeyRequest, validateKey);

// ASCII routes
router.get('/ascii', getAsciiTable);
router.get('/ascii/:code', validateAsciiCode, getAsciiChar);

module.exports = router;

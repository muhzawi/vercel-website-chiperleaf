import { useState, useCallback, useRef } from 'react';
import { encrypt, decrypt, validateKey } from '../utils/cipherUtils';

const DEFAULT_KEYS = {
  caesar: 3,
  xor: 42,
  vigenere: 'kunci',
  affine: { a: 5, b: 8 },
};

export function useCipher() {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('caesar');
  const [key, setKey] = useState(DEFAULT_KEYS.caesar);
  const [mode, setMode] = useState('encrypt'); // 'encrypt' | 'decrypt'
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef(null);

  const changeAlgorithm = useCallback((algo) => {
    setAlgorithm(algo);
    setKey(DEFAULT_KEYS[algo]);
    setResult('');
    setSteps([]);
    setError(null);
  }, []);

  const changeMode = useCallback((newMode) => {
    setMode(newMode);
    // Swap input/output when switching mode
    if (result) {
      setText(result);
      setResult('');
      setSteps([]);
    }
    setError(null);
  }, [result]);

  const process = useCallback((inputText, algo, currentKey, currentMode) => {
    if (!inputText || inputText.trim() === '') {
      setResult('');
      setSteps([]);
      setError(null);
      return;
    }

    const validation = validateKey(algo, currentKey);
    if (!validation.valid) {
      setError(validation.message);
      setResult('');
      setSteps([]);
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const fn = currentMode === 'encrypt' ? encrypt : decrypt;
      const { result: res, steps: stps } = fn(inputText, algo, currentKey);
      setResult(res);
      setSteps(stps.slice(0, 100));
    } catch (err) {
      setError(err.message);
      setResult('');
      setSteps([]);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Debounced auto-process on text change
  const handleTextChange = useCallback((value) => {
    setText(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      process(value, algorithm, key, mode);
    }, 300);
  }, [algorithm, key, mode, process]);

  const handleKeyChange = useCallback((newKey) => {
    setKey(newKey);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      process(text, algorithm, newKey, mode);
    }, 300);
  }, [text, algorithm, mode, process]);

  const runProcess = useCallback(() => {
    process(text, algorithm, key, mode);
  }, [text, algorithm, key, mode, process]);

  const clear = useCallback(() => {
    setText('');
    setResult('');
    setSteps([]);
    setError(null);
  }, []);

  const keyValidation = validateKey(algorithm, key);

  return {
    text, setText: handleTextChange,
    algorithm, setAlgorithm: changeAlgorithm,
    key, setKey: handleKeyChange,
    mode, setMode: changeMode,
    result, steps,
    error, isProcessing,
    keyValidation,
    runProcess, clear,
  };
}

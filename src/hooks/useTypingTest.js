import { useState, useRef, useCallback } from 'react';
import { generateText } from '../utils/wordBank';
import { saveSession, loadHistory } from '../utils/storage';
import { generateSuggestion, getWeakKeys, predictNextWPM } from '../utils/aiLogic';

const DURATIONS = [
  { label: '10 seconds', value: 10 },
  { label: '20 seconds', value: 20 },
  { label: '30 seconds', value: 30 },
  { label: '1 minute',   value: 60 },
  { label: '5 minutes',  value: 300 },
];

function calcStats(typedIndex, typedCorrect, errorCount, startTime) {
  const elapsedMin = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
  const words = typedIndex / 5;
  const wpm   = elapsedMin > 0 ? Math.round(words / elapsedMin) : 0;
  const correct = typedCorrect.filter(Boolean).length;
  const acc = typedIndex > 0 ? Math.round((correct / typedIndex) * 100) : 100;
  return { wpm, acc };
}

export function useTypingTest() {
  const [phase, setPhase]         = useState('idle');   // idle | running | done
  const [duration, setDuration]   = useState(30);
  const [remaining, setRemaining] = useState(30);
  const [text, setText]           = useState('');
  const [typedIndex, setTypedIndex]     = useState(0);
  const [typedCorrect, setTypedCorrect] = useState([]);
  const [errorCount, setErrorCount]     = useState(0);
  const [liveWPM, setLiveWPM]           = useState(0);
  const [liveAcc, setLiveAcc]           = useState(100);
  const [results, setResults]           = useState(null);

  const startTimeRef   = useRef(null);
  const timerRef       = useRef(null);
  const keyErrorMapRef = useRef({});
  const textRef        = useRef('');
  const typedIndexRef  = useRef(0);
  const typedCorrectRef = useRef([]);
  const errorCountRef   = useRef(0);
  const inputRef        = useRef(null);

  // ── Sync refs so timer callback always sees current values
  const syncRefs = useCallback((idx, correct, errs) => {
    typedIndexRef.current   = idx;
    typedCorrectRef.current = correct;
    errorCountRef.current   = errs;
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const endTest = useCallback((forcedRemaining) => {
    stopTimer();
    setPhase('done');

    const elapsed = (duration - (forcedRemaining ?? 0)) || duration;
    const idx     = typedIndexRef.current;
    const correct = typedCorrectRef.current.filter(Boolean).length;
    const errs    = errorCountRef.current;
    const words   = idx / 5;
    const wpm     = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
    const acc     = idx > 0 ? Math.round((correct / idx) * 100) : 0;

    const history   = loadHistory();
    const predicted = predictNextWPM(wpm, history);
    const weakKeys  = getWeakKeys(keyErrorMapRef.current);
    const suggestion = generateSuggestion(wpm, acc, errs);

    const record = { wpm, acc, errors: errs, duration };
    saveSession(record);

    setResults({ wpm, acc, errors: errs, predicted, weakKeys, suggestion });
  }, [duration, stopTimer]);

  const startTest = useCallback(() => {
    stopTimer();
    keyErrorMapRef.current = {};
    startTimeRef.current   = null;
    typedIndexRef.current  = 0;
    typedCorrectRef.current = [];
    errorCountRef.current   = 0;

    const newText = generateText(Math.max(80, duration * 4));
    textRef.current = newText;

    setText(newText);
    setTypedIndex(0);
    setTypedCorrect([]);
    setErrorCount(0);
    setLiveWPM(0);
    setLiveAcc(100);
    setRemaining(duration);
    setResults(null);
    setPhase('running');

    setTimeout(() => inputRef.current?.focus(), 50);
  }, [duration, stopTimer]);

  const resetTest = useCallback(() => {
    stopTimer();
    setPhase('idle');
    setRemaining(duration);
    setText('');
    setTypedIndex(0);
    setTypedCorrect([]);
    setErrorCount(0);
    setLiveWPM(0);
    setLiveAcc(100);
    setResults(null);
    startTimeRef.current = null;
    typedIndexRef.current = 0;
    typedCorrectRef.current = [];
    errorCountRef.current = 0;
    keyErrorMapRef.current = {};
  }, [duration, stopTimer]);

  const handleChangeDuration = useCallback((val) => {
    setDuration(val);
    setRemaining(val);
  }, []);

  // ── Called by TypingArea on every valid keystroke
  const handleChar = useCallback((char) => {
    if (phase !== 'running') return;

    // Start timer on first char
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
      let rem = duration;
      timerRef.current = setInterval(() => {
        rem--;
        setRemaining(rem);
        // Update live stats every second
        const { wpm, acc } = calcStats(
          typedIndexRef.current,
          typedCorrectRef.current,
          errorCountRef.current,
          startTimeRef.current
        );
        setLiveWPM(wpm);
        setLiveAcc(acc);
        if (rem <= 0) endTest(0);
      }, 1000);
    }

    const idx      = typedIndexRef.current;
    const expected = textRef.current[idx];
    const isOk     = char === expected;

    const newCorrect = [...typedCorrectRef.current];
    newCorrect[idx]  = isOk;

    let newErrors = errorCountRef.current;
    if (!isOk) {
      newErrors++;
      const key = expected?.toUpperCase();
      if (key && key.trim()) {
        keyErrorMapRef.current[key] = (keyErrorMapRef.current[key] || 0) + 1;
      }
    }

    const newIdx = idx + 1;
    syncRefs(newIdx, newCorrect, newErrors);

    // Extend text if running low
    if (newIdx > textRef.current.length - 60) {
      const extra = generateText(40);
      textRef.current += ' ' + extra;
      setText(prev => prev + ' ' + extra);
    }

    setTypedIndex(newIdx);
    setTypedCorrect(newCorrect);
    setErrorCount(newErrors);

    const { wpm, acc } = calcStats(newIdx, newCorrect, newErrors, startTimeRef.current);
    setLiveWPM(wpm);
    setLiveAcc(acc);
  }, [phase, duration, endTest, syncRefs]);

  return {
    phase, duration, remaining, text,
    typedIndex, typedCorrect, errorCount,
    liveWPM, liveAcc, results,
    inputRef,
    durations: DURATIONS,
    startTest, resetTest, endTest,
    handleChar,
    handleChangeDuration,
  };
}

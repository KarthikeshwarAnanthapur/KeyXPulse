import { useState, useEffect, useCallback } from 'react';

let _showToast = null;

export function showToast(msg) {
  if (_showToast) _showToast(msg);
}

export default function Toast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = { current: null };

  const show = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 2400);
  }, []);

  useEffect(() => {
    _showToast = show;
    return () => { _showToast = null; };
  }, [show]);

  return (
    <div className={`toast${visible ? ' show' : ''}`} aria-live="polite">
      {message}
    </div>
  );
}

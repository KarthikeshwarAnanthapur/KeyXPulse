import { useRef, useEffect } from 'react';
import { showToast } from './Toast';

/* ──────────────────────────────────────────────
   Word display: renders each char with colour
────────────────────────────────────────────── */
function WordDisplay({ text, typedIndex, typedCorrect }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    cursorRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [typedIndex]);

  if (!text) return <div className="word-display placeholder-text">Waiting to start…</div>;

  return (
    <div className="word-display" aria-label="Text to type">
      {text.split('').map((ch, i) => {
        let cls = 'char';
        if (i < typedIndex) cls += typedCorrect[i] ? ' correct' : ' incorrect';
        else if (i === typedIndex) cls += ' current';
        return (
          <span key={i} className={cls} ref={i === typedIndex ? cursorRef : null}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Typing Area card
────────────────────────────────────────────── */
export default function TypingArea({
  phase, text, typedIndex, typedCorrect,
  inputRef, handleChar,
}) {
  /* Block backspace – show wiggle feedback */
  const cardRef = useRef(null);

  function onKeyDown(e) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      cardRef.current?.classList.remove('wiggle');
      void cardRef.current?.offsetWidth;
      cardRef.current?.classList.add('wiggle');
      return;
    }
  }

  function onInput(e) {
    if (phase !== 'running') return;
    const val = e.target.value;
    if (!val) return;

    // Grab only the last character typed (handles IME, paste, etc.)
    const lastChar = val[val.length - 1];
    handleChar(lastChar);
    // Always reset input so it stays empty → prevents accumulation
    e.target.value = '';
  }

  function onPaste(e) {
    e.preventDefault();
    showToast('Paste is disabled during the test 🚫');
  }

  const placeholder =
    phase === 'idle'    ? 'Select a duration and press Start ✨' :
    phase === 'running' ? 'Start typing…' :
                          'Test complete!';

  return (
    <div className="typing-card card" ref={cardRef}>
      <WordDisplay text={text} typedIndex={typedIndex} typedCorrect={typedCorrect} />
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          id="typing-input"
          className="typing-input"
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={phase !== 'running'}
          onKeyDown={onKeyDown}
          onInput={onInput}
          onPaste={onPaste}
          onContextMenu={e => e.preventDefault()}
          aria-label="Typing input"
        />
      </div>
    </div>
  );
}

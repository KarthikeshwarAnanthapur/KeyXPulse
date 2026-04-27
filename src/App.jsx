import { useState, useEffect } from 'react';
import Header    from './components/Header';
import Controls  from './components/Controls';
import TypingArea from './components/TypingArea';
import LiveStats  from './components/LiveStats';
import Results    from './components/Results';
import History    from './components/History';
import Toast      from './components/Toast';
import { useTypingTest } from './hooks/useTypingTest';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('practice');
  const [historyKey, setHistoryKey] = useState(0); // force History re-render

  const {
    phase, duration, remaining, text,
    typedIndex, typedCorrect, errorCount,
    liveWPM, liveAcc, results,
    inputRef, durations,
    startTest, resetTest,
    handleChar, handleChangeDuration,
  } = useTypingTest();

  // Global keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (activeTab !== 'practice') return;
      if (e.key === 'Enter' && phase === 'idle') startTest();
      if (e.key === 'Escape' && phase === 'running') resetTest();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeTab, phase, startTest, resetTest]);

  function handleTabChange(tab) {
    if (tab === 'history') setHistoryKey(k => k + 1);
    setActiveTab(tab);
  }

  function handleRetry() {
    resetTest();
    startTest();
  }

  return (
    <>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="main-container">
        {/* ══════════ PRACTICE TAB ══════════ */}
        {activeTab === 'practice' && (
          <div className="section-fade">
            {/* Hero (only when idle) */}
            {phase === 'idle' && (
              <div className="intro-block">
                <h1 className="hero-title">Train smarter, type faster 🌸</h1>
                <p className="hero-sub">
                  AI-powered coaching to help you build effortless speed and precision.
                </p>
                <p className="hero-hint">Press <kbd>Enter</kbd> to start · <kbd>Esc</kbd> to reset</p>
              </div>
            )}

            <Controls
              phase={phase}
              duration={duration}
              remaining={remaining}
              durations={durations}
              onChangeDuration={handleChangeDuration}
              onStart={startTest}
              onReset={resetTest}
            />

            <TypingArea
              phase={phase}
              text={text}
              typedIndex={typedIndex}
              typedCorrect={typedCorrect}
              inputRef={inputRef}
              handleChar={handleChar}
            />

            <LiveStats
              wpm={liveWPM}
              acc={liveAcc}
              errors={errorCount}
              visible={phase === 'running'}
            />

            {phase === 'done' && results && (
              <Results results={results} onRetry={handleRetry} />
            )}
          </div>
        )}

        {/* ══════════ HISTORY TAB ══════════ */}
        {activeTab === 'history' && (
          <div className="section-fade">
            <div className="history-page-header">
              <h2 className="section-title">Your Progress 📈</h2>
            </div>
            <History key={historyKey} onClear={() => setHistoryKey(k => k + 1)} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Made with 💜 · KeyXPulse © 2026</p>
      </footer>

      <Toast />
    </>
  );
}

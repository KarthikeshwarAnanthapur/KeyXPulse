export default function Controls({
  phase, duration, remaining, durations,
  onChangeDuration, onStart, onReset,
}) {
  const pct = Math.max(0, (remaining / duration) * 100);
  const isUrgent = remaining <= 10 && phase === 'running';

  function fmt(s) {
    if (s >= 60) {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m}:${sec.toString().padStart(2, '0')}`;
    }
    return `${s}s`;
  }

  return (
    <div className="controls-bar card">
      {/* Duration selector */}
      <div className="control-group">
        <label className="control-label" htmlFor="time-select">⏱ Duration</label>
        <select
          id="time-select"
          className="select-input"
          value={duration}
          disabled={phase === 'running'}
          onChange={e => onChangeDuration(Number(e.target.value))}
        >
          {durations.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      {/* Timer */}
      <div className="control-group timer-group">
        <span className="control-label">Time left</span>
        <div className="timer-wrap">
          <svg className="timer-ring" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" className="ring-track" />
            <circle
              cx="22" cy="22" r="18"
              className={`ring-fill${isUrgent ? ' urgent' : ''}`}
              strokeDasharray={`${(2 * Math.PI * 18 * pct) / 100} ${2 * Math.PI * 18}`}
              strokeDashoffset="0"
              transform="rotate(-90 22 22)"
            />
          </svg>
          <span className={`timer-display${isUrgent ? ' urgent' : ''}`}>{fmt(remaining)}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="control-group btn-group">
        {phase !== 'running' && (
          <button className="btn btn-primary" onClick={onStart} id="start-btn">
            {phase === 'done' ? 'Retry ✨' : 'Start ✨'}
          </button>
        )}
        {phase === 'running' && (
          <button className="btn btn-ghost" onClick={onReset} id="reset-btn">
            Reset 🔄
          </button>
        )}
        {phase === 'done' && (
          <button className="btn btn-ghost" onClick={onReset} id="reset-btn-done">
            New Test 🔄
          </button>
        )}
      </div>
    </div>
  );
}

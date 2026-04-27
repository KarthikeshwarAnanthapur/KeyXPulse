import { useEffect, useRef } from 'react';

function StatCard({ icon, value, label, id, colorClass }) {
  const valRef = useRef(null);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value && valRef.current) {
      valRef.current.classList.remove('pop');
      void valRef.current.offsetWidth;
      valRef.current.classList.add('pop');
    }
    prevRef.current = value;
  }, [value]);

  return (
    <div className={`stat-card card ${colorClass}`} id={id}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value" ref={valRef}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function LiveStats({ wpm, acc, errors, visible }) {
  return (
    <div className={`live-stats-row${visible ? ' visible' : ''}`}>
      <StatCard id="stat-wpm" icon="🚀" value={wpm}        label="WPM"      colorClass="stat-purple" />
      <StatCard id="stat-acc" icon="🎯" value={`${acc}%`}  label="Accuracy" colorClass="stat-green"  />
      <StatCard id="stat-err" icon="❌" value={errors}      label="Errors"   colorClass="stat-red"    />
    </div>
  );
}

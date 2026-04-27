import AIFeedback from './AIFeedback';
import { WpmChart, AccChart } from './Charts';
import { loadHistory } from '../utils/storage';

function ResultCard({ icon, value, label, className = '' }) {
  return (
    <div className={`result-card card ${className}`}>
      <div className="result-icon">{icon}</div>
      <div className="result-value">{value}</div>
      <div className="result-label">{label}</div>
    </div>
  );
}

export default function Results({ results, onRetry }) {
  if (!results) return null;
  const { wpm, acc, errors, predicted, weakKeys, suggestion } = results;

  const history = loadHistory();
  const labels  = history.map((_, i) => `#${i + 1}`);
  const wpms    = history.map(h => h.wpm);
  const accs    = history.map(h => h.acc);

  return (
    <div className="results-section">
      <h2 className="section-title">Your Results 🎉</h2>

      {/* Stat cards */}
      <div className="results-stats-row">
        <ResultCard icon="🚀" value={wpm}        label="Words Per Minute" />
        <ResultCard icon="🎯" value={`${acc}%`}  label="Accuracy" />
        <ResultCard icon="❌" value={errors}      label="Errors" />
        <ResultCard icon="🔮" value={predicted}   label="Predicted Next WPM" className="pred-card" />
      </div>

      {/* AI Feedback */}
      <AIFeedback suggestion={suggestion} weakKeys={weakKeys} predicted={predicted} />

      {/* Charts */}
      {history.length >= 2 && (
        <div className="charts-row">
          <div className="chart-card card">
            <h3 className="chart-title">WPM History 📊</h3>
            <WpmChart labels={labels} data={wpms} />
          </div>
          <div className="chart-card card">
            <h3 className="chart-title">Accuracy Trend 🎯</h3>
            <AccChart labels={labels} data={accs} />
          </div>
        </div>
      )}

      <button className="btn btn-primary btn-center" onClick={onRetry}>
        Try Again 🔄
      </button>
    </div>
  );
}

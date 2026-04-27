import { loadHistory, clearAllHistory } from '../utils/storage';
import { WpmChart, AccChart } from './Charts';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatDur(s) {
  return s >= 60 ? `${s / 60}m` : `${s}s`;
}

export default function History({ onClear }) {
  const history = loadHistory();
  const labels  = history.map((_, i) => `#${i + 1}`);
  const wpms    = history.map(h => h.wpm);
  const accs    = history.map(h => h.acc);

  const handleClear = () => {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      clearAllHistory();
      onClear();
    }
  };

  if (history.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-icon">📋</div>
        <p>No sessions yet. Complete a typing test to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="history-content">
      <div className="history-header-row">
        <div className="history-summary">
          <span className="summary-chip">🏆 Best WPM: <strong>{Math.max(...wpms)}</strong></span>
          <span className="summary-chip">🎯 Best Acc: <strong>{Math.max(...accs)}%</strong></span>
          <span className="summary-chip">📝 Sessions: <strong>{history.length}</strong></span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={handleClear}>Clear 🗑</button>
      </div>

      {history.length >= 2 && (
        <div className="charts-row">
          <div className="chart-card card">
            <h3 className="chart-title">WPM Over Sessions 🚀</h3>
            <WpmChart labels={labels} data={wpms} />
          </div>
          <div className="chart-card card">
            <h3 className="chart-title">Accuracy Trend 🎯</h3>
            <AccChart labels={labels} data={accs} />
          </div>
        </div>
      )}

      <div className="card history-table-card">
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Duration</th>
              <th>WPM</th>
              <th>Accuracy</th>
              <th>Errors</th>
            </tr>
          </thead>
          <tbody>
            {[...history].reverse().map((h, i) => (
              <tr key={h.id}>
                <td>{history.length - i}</td>
                <td>{formatDate(h.date)}</td>
                <td>{formatDur(h.duration)}</td>
                <td className="wpm-cell">{h.wpm}</td>
                <td className="acc-cell">{h.acc}%</td>
                <td>{h.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AIFeedback({ suggestion, weakKeys, predicted }) {
  return (
    <div className="ai-box card">
      <div className="ai-box-header">
        <span className="ai-dot" />
        <span className="ai-title">AI Coach Feedback ✨</span>
      </div>

      <p className="ai-suggestion">{suggestion}</p>

      {weakKeys && weakKeys.length > 0 ? (
        <div className="ai-weak-keys">
          <span className="ai-weak-label">🔑 Most mistyped keys:</span>
          <div className="key-chips">
            {weakKeys.map(k => (
              <span key={k} className="key-chip">{k}</span>
            ))}
          </div>
        </div>
      ) : (
        <p className="ai-weak-none">🌟 No frequently mistyped keys — great consistency!</p>
      )}

      <div className="ai-prediction">
        <span className="pred-label">🔮 Predicted next WPM</span>
        <span className="pred-value">{predicted}</span>
      </div>
    </div>
  );
}

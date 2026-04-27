export function generateSuggestion(wpm, acc, errors) {
  if (acc >= 98 && wpm >= 70)
    return '🌟 Exceptional! You\'re typing like a seasoned pro. Your speed and precision are both outstanding!';
  if (acc >= 95 && wpm >= 55)
    return '🌸 Great performance! Accuracy is rock-solid. Push your speed a little more each session.';
  if (acc >= 90 && wpm >= 40)
    return '💪 You\'re on the right track! Focus on keeping accuracy high while gradually building speed.';
  if (acc < 80 && errors > 15)
    return '🐢 Slow down — accuracy matters more than speed right now. Type deliberately, not quickly.';
  if (acc < 85)
    return '⚠️ You\'re making frequent errors. Try to focus on each key press intentionally.';
  if (wpm < 25)
    return '✨ Every expert was once a beginner! Daily 5-minute sessions will compound your growth.';
  if (wpm < 45)
    return '🎯 Solid foundation! Relax your hands, stay consistent, and your speed will naturally climb.';
  return '💫 Nice work! Keep targeting your weak keys and your WPM will keep climbing.';
}

export function getWeakKeys(keyErrorMap) {
  return Object.entries(keyErrorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .filter(([, count]) => count >= 2)
    .map(([k]) => k);
}

export function predictNextWPM(currentWPM, history) {
  const recent = [...history.slice(-3).map((h) => h.wpm), currentWPM];
  if (recent.length < 2) return currentWPM;

  const n = recent.length;
  const sumX = (n * (n - 1)) / 2;
  const sumX2 = ((n - 1) * n * (2 * n - 1)) / 6;
  const sumY = recent.reduce((a, b) => a + b, 0);
  const sumXY = recent.reduce((acc, val, i) => acc + i * val, 0);
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return currentWPM;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return Math.max(1, Math.round(intercept + slope * n));
}

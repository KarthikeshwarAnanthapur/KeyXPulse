const STORAGE_KEY = 'keyxpulse_history_v2';

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveSession(record) {
  const history = loadHistory();
  history.push({ ...record, id: Date.now(), date: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function clearAllHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

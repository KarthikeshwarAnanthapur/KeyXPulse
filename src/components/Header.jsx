export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">⌨️</span>
          <span className="logo-text">
            KeyX<span className="logo-accent">Pulse</span>
          </span>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => onTabChange('practice')}
          >
            Practice
          </button>
          <button
            className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => onTabChange('history')}
          >
            History 📈
          </button>
        </nav>
      </div>
    </header>
  );
}

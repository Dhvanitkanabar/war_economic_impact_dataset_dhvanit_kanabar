import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-card p-6 text-center select-none">
          <div className="max-w-md w-full border border-border bg-ink-950/40 rounded-2xl p-8 shadow-card flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-crimson-600/10 flex items-center justify-center text-crimson-400">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-ink-50 tracking-tight">Something went wrong.</h1>
              <p className="text-muted text-sm leading-relaxed">
                An unexpected rendering error occurred. Please refresh the page or reload the application to restore operations.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="clip-corner-sm text-xs font-semibold bg-accent-500 hover:bg-accent-400 text-white px-6 py-2.5 transition-all hover:shadow-glow-accent w-full"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

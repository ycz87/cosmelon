/**
 * ErrorBoundary — Catches React render errors to prevent full app crash.
 * Shows a simple recovery UI instead of a blank/black screen.
 */
import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          backgroundColor: '#111114',
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'system-ui, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px' }}>🍉</div>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>出了点问题</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            Something went wrong
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              marginTop: '8px',
              padding: '10px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#f43f5e',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

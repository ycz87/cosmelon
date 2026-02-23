import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FarmPixiPrototype } from './components/FarmPixiPrototype'
import { ErrorBoundary, installGlobalErrorHandlers } from './components/ErrorBoundary'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'

// Catch ALL errors — React and non-React — show on screen
installGlobalErrorHandlers();

// Native platform status bar config
if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#111114' });
}

const query = new URLSearchParams(window.location.search);
const isPixiPrototypeMode = query.get('prototype') === 'pixi' || window.location.hash === '#pixi-prototype';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPixiPrototypeMode ? (
      <FarmPixiPrototype />
    ) : (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    )}
  </StrictMode>,
)

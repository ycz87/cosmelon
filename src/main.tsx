import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FarmPixiPrototype } from './components/FarmPixiPrototype'
import { FarmPixiPhase0Prototype } from './components/FarmPixiPhase0Prototype'
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
const prototypeMode = query.get('prototype');
const isLegacyPixiPrototypeMode = prototypeMode === 'pixi' || window.location.hash === '#pixi-prototype';
const isFarmV3Phase0Mode = prototypeMode === 'farm-v3-phase0' || window.location.hash === '#farm-v3-phase0';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isFarmV3Phase0Mode ? (
      <FarmPixiPhase0Prototype />
    ) : isLegacyPixiPrototypeMode ? (
      <FarmPixiPrototype />
    ) : (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    )}
  </StrictMode>,
)

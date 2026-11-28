import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@lemuel-manske/components/styles.css';

import '@lemuel-manske/design-tokens/styles.css';

import './preview.css';

import { App } from './App';

const rootElement = document.getElementById('root');

if (rootElement == null) {
  throw new Error('Missing preview root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialize theme synchronously before CSS loads to prevent flash
const storedTheme = localStorage.getItem('theme-preference');
if (storedTheme === 'dark' || storedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', storedTheme);
}
// If 'system' or no preference, leave it without data-theme (CSS handles @media prefers-color-scheme)

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

// Updated to match the ID in index.html (app instead of root)
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import { ThemeProvider } from './ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

import { ThemeProvider } from './ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, Scripts } from '@remix-run/react';
import ReduxProvider from './store/reduxProvider';
import MainLayout from './layouts/main';

const App = () => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <ReduxProvider>
          <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
            <ThemeProvider>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </ThemeProvider>
          </ErrorBoundary>
        </ReduxProvider>
        <Scripts />
      </body>
    </html>
  );
};

export default App;

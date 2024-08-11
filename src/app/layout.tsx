import '../styles/index.css';
import { ThemeProvider } from '../ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../layouts/main';
import { ReactNode } from 'react';
import ReduxProvider from 'src/store/reduxProvider';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <ReduxProvider>
          <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
            <ThemeProvider>
              <MainLayout>{children}</MainLayout>
            </ThemeProvider>
          </ErrorBoundary>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default Layout;

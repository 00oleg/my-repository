import '../styles/index.css';
import { ThemeProvider } from '../ThemeContext';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from 'src/layouts/main';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
        <ThemeProvider>
          <MainLayout>
            <Component {...props.pageProps} />
          </MainLayout>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default MyApp;

import ErrorBoundary from './components/ErrorBoundary';
import SearchPage from './pages/Search';

const App = () => {
  return (
    <>
      <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
        <SearchPage />
      </ErrorBoundary>
    </>
  );
};

export default App;

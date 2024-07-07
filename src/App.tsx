import ErrorBoundary from './components/ErrorBoundary';
import SearchPage from './pages/Search';

function App() {
  return (
    <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
      <SearchPage params={{}} />
    </ErrorBoundary>
  );
}

export default App;

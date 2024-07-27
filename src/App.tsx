import ThemeSelector from './components/ThemeSelector';
import DetailPage from './pages/Detail';
import SearchPage from './pages/Search';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <ThemeSelector />
      </header>
      <main>
        <Routes>
          <Route path={'/'} element={<SearchPage />}>
            <Route path={'details'} element={<DetailPage />} />
          </Route>
          <Route path={'*'} element={<div>Page not found 404</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

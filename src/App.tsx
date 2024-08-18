import FormUncontrolledPage from './pages/FormUncontrolled';
import FormControlledPage from './pages/FormControlled';
import MainPage from './pages/Main';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'form-uncontrolled'} element={<FormUncontrolledPage />} />
        <Route path={'form-controlled'} element={<FormControlledPage />} />
        <Route path={'*'} element={<div>Page not found 404</div>} />
      </Routes>
    </main>
  );
};

export default App;

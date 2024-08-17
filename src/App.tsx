import Form1Page from './pages/Form1';
import Form2Page from './pages/Form2';
import MainPage from './pages/Main';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'form1'} element={<Form1Page />} />
        <Route path={'form2'} element={<Form2Page />} />
        <Route path={'*'} element={<div>Page not found 404</div>} />
      </Routes>
    </main>
  );
};

export default App;

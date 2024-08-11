'use client';

import ThemeSelector from '../components/ThemeSelector';
import { useTheme } from '../ThemeContext';

function MainLayout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <ThemeSelector />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;

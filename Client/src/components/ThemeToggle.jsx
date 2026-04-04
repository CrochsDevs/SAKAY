// Client/src/components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme('system');
  };

  const label = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm transition-colors"
      title={`Theme: ${label} (click to cycle: System → Dark → Light)`}
    >
      {theme === 'system' ? (
        <Monitor size={16} />
      ) : theme === 'dark' ? (
        <Moon size={16} />
      ) : (
        <Sun size={16} />
      )}
    </button>
  );
};

export default ThemeToggle;

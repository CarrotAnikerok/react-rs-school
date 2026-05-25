import { ThemeContext, ThemeUpdateContext } from '../../contexts/contexts';
import { useContext, useState } from 'react';

export function ThemeSwitch() {
  const [isActive, setActive] = useState(true);
  const theme = useContext(ThemeContext);
  const setTheme = useContext(ThemeUpdateContext);

  let isDark = theme === 'dark';

  const toggle = () => {
    if (theme === 'light') {
      setTheme('dark');
      isDark = true;
    } else {
      setTheme('light');
      isDark = false;
    }

    setActive(!isActive);
  };

  return (
    <div className="switch">
      <button aria-pressed={isDark} onClick={toggle}>
        dark theme:
        <span aria-hidden="true">{isDark ? 'on' : 'off'}</span>
      </button>
    </div>
  );
}

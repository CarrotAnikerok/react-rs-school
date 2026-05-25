import { Outlet, type NavLinkRenderProps } from 'react-router';
import { Navigation } from '../Navigation/Navigation';
import { useState } from 'react';
import { ThemeContext, ThemeUpdateContext } from '../../contexts/contexts';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

export function Layout() {
  const style = ({ isActive }: NavLinkRenderProps) => {
    return isActive ? 'active' : '';
  };

  const [theme, setTheme] = useState('light');

  return (
    <>
    <ThemeContext value={theme}>
       <div className={`app-container ${theme}`}>
        <ThemeUpdateContext value={setTheme}>
          <ThemeSwitch></ThemeSwitch>
        </ThemeUpdateContext>
        <Navigation style={style}></Navigation>
        <main>
          <Outlet />
        </main>
       </div>
    </ThemeContext>
    </>
  );
}

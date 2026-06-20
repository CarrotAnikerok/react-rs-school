'use client'

import { useState } from 'react';
import { ThemeSwitch } from '../../components/ThemeSwitch/ThemeSwitch';
import { Navigation } from '../../components/Navigation/Navigation';
import { ThemeContext, ThemeUpdateContext } from '../../contexts/contexts';
import { Provider } from 'react-redux';
import { store } from '../../utils/store';

export default function Layout({children}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState('light');

  return (
    <>
    <Provider store={store}>
      <ThemeContext value={theme}>
        <div className={`app-container ${theme}`}>
          <ThemeUpdateContext value={setTheme}>
            <ThemeSwitch></ThemeSwitch>
          </ThemeUpdateContext>
          <Navigation style='isActive'></Navigation>
          <main>
            {children}
          </main>
        </div>
      </ThemeContext>
    </Provider>
    </>
  );
}

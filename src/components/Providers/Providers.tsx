'use client'

import { useState } from "react";
import StoreProvider from "../StoreProvider/StoreProvider";
import { ThemeContext, ThemeUpdateContext } from "../../contexts/contexts";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  return (
    <>
      <StoreProvider>
        <ThemeContext value={theme}>
            <ThemeUpdateContext value={setTheme}>
                <div className={`app-container ${theme}`}>
                    {children}
                </div>
            </ThemeUpdateContext>
        </ThemeContext>
      </StoreProvider>
    </>
  );
}
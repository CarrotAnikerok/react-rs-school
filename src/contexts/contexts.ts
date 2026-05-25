import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const ThemeUpdateContext = createContext<(theme: string) => void>(() => {});
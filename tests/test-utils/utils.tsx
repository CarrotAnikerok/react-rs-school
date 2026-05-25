import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import type { HomeState } from '../../src/features/home/homeSlice';
import homeReducer from '../../src/features/home/homeSlice';
import { Provider } from 'react-redux';

export const renderWithRouter = (ui: ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

interface RenderOptions {
  preloadedState?: Partial<HomeState>;
}

export const renderWithReduxAndRouter = (
  ui: React.ReactElement,
  options: RenderOptions = {}
) => {
  const { preloadedState = {} } = options;
  const store = configureStore({
    reducer: {
      home: homeReducer,
    },
    preloadedState: {
      home: {
        list: [],
        isLoading: false,
        error: '',
        currentQuery: 'all',
        ...preloadedState,
      },
    },
  });

  return renderWithRouter(<Provider store={store}>{ui}</Provider>);
};

import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import type { HomeState } from '../../src/features/home/homeSlice';
import homeReducer from '../../src/features/home/homeSlice';
import { Provider } from 'react-redux';
import { ponyApi } from '../../src/services/pony';

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
      [ponyApi.reducerPath]: ponyApi.reducer,
    },
    preloadedState: {
      home: {
        currentQuery: 'all',
        ...preloadedState,
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ponyApi.middleware),
  });

  return renderWithRouter(<Provider store={store}>{ui}</Provider>);
};

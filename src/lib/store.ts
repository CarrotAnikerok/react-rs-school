import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/home/homeSlice';
import { ponyApi } from '../services/pony';

export const makeStore = () => configureStore({
  reducer: {
    [ponyApi.reducerPath]: ponyApi.reducer,
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ponyApi.middleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

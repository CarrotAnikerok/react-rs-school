import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import { ponyApi } from '../services/pony'

export const store = configureStore({
  reducer: {
    [ponyApi.reducerPath]: ponyApi.reducer,
    home: homeReducer,
  },
  middleware: getDefaultMiddleware => 
      getDefaultMiddleware().concat(ponyApi.middleware)
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

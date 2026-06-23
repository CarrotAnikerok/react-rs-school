import { createSlice, type SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface PonyListing {
  status: number;
  data: PonyData[];
}

export interface PonyData {
  id: number;
  name: string;
  occupation: string;
  sex: string;
  residence: string;
  kind: string[];
  image: string[];
}

export interface HomeState {
  currentQuery: string;
}

const initialState: HomeState = {
  currentQuery: 'all',
};

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  if ('status' in error) {
    const status = error.status;

    if (typeof status === 'number') {
      const category = Math.floor(status / 100);
      if (category === 5) {
        return `Sorry, server error :( ${status}`;
      } else if (category === 4) {
        return `Sorry, client error :( ${status})`;
      }

      return `Sorry, some weird error has occurred :( ${status})`;
    }

    if (status === 'FETCH_ERROR') {
      return 'No internet connection or server is unreachable. Please check your network.';
    }

    return `Network error: ${status}`;
  }

  return error.message || 'Sorry, some weird error has occurred :(';
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
  },
});

export const { setQuery } = homeSlice.actions;
export default homeSlice.reducer;

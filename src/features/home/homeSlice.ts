import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ponyData {
    id: number;
    name: string;
    occupation: string;
    sex: string;
    residence: string;
    kind: string[];
    image: string[];
};

export interface HomeState {
    list: ponyData[]
    isLoading: boolean
    error: string
    currentQuery: string
}

const initialState: HomeState = { list: [], isLoading: true, error: '', currentQuery: 'all' };

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async ({page, query, limit}: {page: number; query: string; limit: number}, thunkAPI) => {
        try {
            const offset = (page - 1) * limit;
            const response = await fetch(
                `https://ponyapi.net/v1/character/${query}?limit=${limit}&offset=${offset}`
            );

            if (!response.ok) {
                return thunkAPI.rejectWithValue(getErrorMessage(response.status));
            }

            const data = await response.json();
            return data.data;
        } catch {
            return thunkAPI.rejectWithValue('Error of access or network :(');
        }
    }
)

const getErrorMessage = (status: number) => {
  const category = Math.floor(status / 100);

  if (category === 5) {
    return `Sorry, server error :( ${status}`;
  } else if (category === 4) {
    return `Sorry, client error :( ${status})`;
  }

  return `Sorry, some weird error has occurred :( ${status})`;
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.currentQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
                state.error = ''
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.list = [];
                state.error = action.payload as string;
            })
    }

})

export const { setQuery } = homeSlice.actions;
export default homeSlice.reducer;

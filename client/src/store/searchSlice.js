// store/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';
import toast from 'react-hot-toast';

export const searchImages = createAsyncThunk(
  'search/searchImages',
  async (term, { rejectWithValue }) => {
    try {
      const res = await api.post('/search', { term });
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Search failed');
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchTopSearches = createAsyncThunk('search/top', async () => {
  const res = await api.get('/top-searches');
  return res.data;
});

export const fetchHistory = createAsyncThunk('search/history', async () => {
  const res = await api.get('/history');
  return res.data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    images: [],
    count: 0,
    message: '',
    selected: new Set(),
    topSearches: [],
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleSelect: (state, action) => {
      const id = action.payload;
      if (state.selected.has(id)) {
        state.selected.delete(id);
      } else {
        state.selected.add(id);
      }
    },
    clearSelection: (state) => {
      state.selected.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // SEARCH
      .addCase(searchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.images || [];
        state.count = action.payload.count || 0;
        state.message = action.payload.message || 'No results';
        state.selected.clear();
        toast.success(`Found ${action.payload.count} results`);
      })
      .addCase(searchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Search failed';
      })

      // TOP SEARCHES
      .addCase(fetchTopSearches.fulfilled, (state, action) => {
        state.topSearches = action.payload;
      })

      // HISTORY
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export const { toggleSelect, clearSelection } = searchSlice.actions;
export default searchSlice.reducer;
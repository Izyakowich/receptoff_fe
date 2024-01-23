import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store'; 

interface FilterState {
  searchTerm: string;
  statusFilter: string;
  startDate: string;
  endDate: string;
}

const initialState: FilterState = {
  searchTerm: '',
  statusFilter: 'Все',
  startDate: '',
  endDate: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    resetFilters(state) {
      state.searchTerm = '';
      state.statusFilter = 'Все';
      state.startDate = '';
      state.endDate = '';
    },
  },
});

export const { setSearchTerm, setStatusFilter, setStartDate, setEndDate, resetFilters } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filterSliceData;

export default filterSlice.reducer;


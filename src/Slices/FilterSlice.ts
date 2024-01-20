// import { createSlice } from "@reduxjs/toolkit"
// import { useSelector } from "react-redux";

// interface CategoryData {
//     id: number;
//     name: string;
// }

// interface DataState {
//     inputValue: string;
//     dropdownValue: CategoryData;
// }

// const filterSlice = createSlice({
//   name: "filters",
//   initialState:  {
//     inputValue: "",
//     dropdownValue: {
//     id: 0,
//     name: "Все статусы",
//   },
// } as DataState, 
//   reducers: {
//     setAppInputValue(state, action) {
//       state.inputValue = action.payload
//     },
//     setAppDropdownValueId(state, action) {
//       state.dropdownValue.id = action.payload
//     },
//     setAppDropdownValueName(state, action) {
//       state.dropdownValue.name = action.payload
//     },
//   },
// })
// export const useInputValue = () => useSelector((state: {filterSliceData : DataState}) => state.filterSliceData.inputValue)
// export const useStatusValue = () => useSelector((state: {filterSliceData : DataState}) => state.filterSliceData.dropdownValue)

// export const {
// //   setAppDropdownValueId,
// //   setAppDropdownValueName,
// //   setAppInputValue,

//     setAppInputValue: setAppValueAction,
//     setAppDropdownValueId: setAppDropdownValueIdAction,
//     setAppDropdownValueName: setAppDropdownValueNameAction
// } = filterSlice.actions
// export default filterSlice.reducer



import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store'; // Предполагаем, что store вашего приложения называется 'store.ts'

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
    // Редьюсер для сброса фильтров может быть добавлен здесь, если необходимо
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





//Даня
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface filterState {
// //   Name: string;
//   status: string;
//   startDate: string;
//   endDate: string;
//   selectedUser: string;
// }

// const initialState: filterState = {
// // Name: '',
//     status: '',
//   startDate: '',
//   endDate: '',
//   selectedUser: '',
// };

// const filterSlice = createSlice({
//   name: 'filterSlice',
//   initialState,
//   reducers: {
//     // setFilterName(state, action: PayloadAction<string>) {
//     //     state.Name = action.payload;
//     //   },
//     setFilterStatus(state, action: PayloadAction<string>) {
//       state.status = action.payload;
//     },
//     setStartDate(state, action: PayloadAction<string>) {
//       state.startDate = action.payload;
//     },
//     setEndDate(state, action: PayloadAction<string>) {
//       state.endDate = action.payload;
//     },
//     setFilterUser: (state, action: PayloadAction<string>) => {
//       state.selectedUser = action.payload;
//     },
//     clearFilter(state) {
//         // state.Name = '';
//         state.status = '';
//         state.startDate = '';
//         state.endDate = '';
//         state.selectedUser = '';
//       },
//   },
// });

// export const {setFilterUser, setFilterStatus, setStartDate, setEndDate, clearFilter} = filterSlice.actions;

// export default filterSlice.reducer;
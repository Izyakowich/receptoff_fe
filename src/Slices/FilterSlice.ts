// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// interface FilterState {
//     startDate: string;
//     endDate: string;
//     emailValue: string;
//     statusValue: string;
//   }

// const filterSlice = createSlice({
//     name: "filter",
//     initialState: {
//       startDate: "",
//       endDate: "",
//       emailValue: "",
//       statusValue: "Все", 
//     } as FilterState,
//     reducers: {
//       setStartDate(state, action: PayloadAction<string>) {
//         state.startDate = action.payload;
//       },
//       setEndDate(state, action: PayloadAction<string>) {
//         state.endDate = action.payload;
//       },
//       setEmailValue(state, action: PayloadAction<string>) {
//         state.emailValue = action.payload;
//       },
//       setStatusValue(state, action: PayloadAction<string>) {
//         state.statusValue = action.payload;
//       },
//     },
//   });
  
//   export const useStartDate = () => useSelector((state: { filterData: FilterState }) => state.filterData.startDate);
//   export const useEndDate = () => useSelector((state: { filterData: FilterState }) => state.filterData.endDate);
//   export const useEmailValue = () => useSelector((state: { filterData: FilterState }) => state.filterData.emailValue);
//   export const useStatusValue = () => useSelector((state: { filterData: FilterState }) => state.filterData.statusValue);
  
//   export const {
//     setStartDate: setStartDateAction,
//     setEndDate: setEndDateAction,
//     setEmailValue: setEmailValueAction,
//     setStatusValue: setStatusValueAction,
//   } = filterSlice.actions;
  
//   export default filterSlice.reducer;




import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
// import Option from "../types";
interface CategoryData {
    id: number;
    name: string;
}

interface DataState {
    inputValue: string;
    dropdownValue: CategoryData;
}

// const initialState = {
//     inputValue: "",
//     dropdownValue: {
//     id: 0,
//     name: "Все статусы",
//   },
// }

const filterSlice = createSlice({
  name: "filters",
  initialState:  {
    inputValue: "",
    dropdownValue: {
    id: 0,
    name: "Все статусы",
  },
} as DataState, 
  reducers: {
    setAppInputValue(state, action) {
      state.inputValue = action.payload
    },
    setAppDropdownValueId(state, action) {
      state.dropdownValue.id = action.payload
    },
    setAppDropdownValueName(state, action) {
      state.dropdownValue.name = action.payload
    },
  },
})
export const useInputValue = () => useSelector((state: {FilterData : DataState}) => state.FilterData.inputValue)
export const useStatusValue = () => useSelector((state: {FilterData : DataState}) => state.FilterData.dropdownValue)

export const {
//   setAppDropdownValueId,
//   setAppDropdownValueName,
//   setAppInputValue,

    setAppInputValue: setAppValueAction,
    setAppDropdownValueId: setAppDropdownValueIdAction,
    setAppDropdownValueName: setAppDropdownValueNameAction
} = filterSlice.actions
export default filterSlice.reducer
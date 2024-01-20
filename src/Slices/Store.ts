import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainDataReducer from "Slices/MainSlice"
import detailedDataReducer from 'Slices/DetailedSlice'
import authDataReducer from "Slices/AuthSlice"
import applicationsDataReducer from 'Slices/ApplicationsSlice'
import FilterSlice from "Slices/FilterSlice"


export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: combineReducers({
        mainData: mainDataReducer,
        detailedData: detailedDataReducer,
        authData: authDataReducer,
        applicationsData: applicationsDataReducer,
        filterSliceData: FilterSlice
    })
})

export default store
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainDataReducer from "Slices/MainSlice"
import detailedDataReducer from 'Slices/DetailedSlice'
import authDataReducer from "Slices/AuthSlice"
import applicationsDataReducer from 'Slices/ApplicationsSlice'



export default configureStore({
    reducer: combineReducers({
        mainData: mainDataReducer,
        detailedData: detailedDataReducer,
        authData: authDataReducer,
        applicationsData: applicationsDataReducer
    })
})
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface ProductData {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
}

interface ApplicationData {
  id: number;
  status: string;
  userEmail: string;
  moderatorEmail: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
  readyStatus: boolean;
}

interface DataState {
  currentApplicationId: number | null;
  currentApplicationDate: string;
  productsFromApplication: ProductData[];
  applications: ApplicationData[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentApplicationId: null,
    currentApplicationDate: '',
    productsFromApplication: [],
    applications: []
  } as DataState,
  reducers: {
    setCurrentApplicationId(state, action: PayloadAction<number>) {
      state.currentApplicationId = action.payload;
    },
    setCurrentApplicationDate(state, action: PayloadAction<string>) {
      state.currentApplicationDate = action.payload;
    },
    setProductsFromApplication(state, action: PayloadAction<ProductData[]>) {
      state.productsFromApplication = action.payload;
    },
    setApplications(state, action: PayloadAction<ApplicationData[]>) {
      state.applications = action.payload;
      console.log('applications is', action.payload)
    }
  },
});

export const useCurrentApplicationId = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationId);

export const useCurrentApplicationDate = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationDate);

export const useProductsFromApplication = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.productsFromApplication);

export const useApplications = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.applications);

export const {
    setCurrentApplicationId: setCurrentApplicationIdAction,
    setCurrentApplicationDate: setCurrentApplicationDateAction,
    setProductsFromApplication: setProductsFromApplicationAction,
    setApplications: setApplicationsAction

} = dataSlice.actions;

export default dataSlice.reducer;
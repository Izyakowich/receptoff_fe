import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface ClaimData {
  id: number;
  titleClaim: string;
  status: string;
  textClaim: string;
  publicationDate : string;
  approvingDate : string;
}

interface DataState {
  claim : ClaimData[];
  currentClaimId : number | null;
  currentClaimDate : string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentClaimId: null,
    currentClaimDate: '',
    productsFromApplication: [],
    claim: []
  } as DataState,
  reducers: {
    setCurrentClaimId(state, action: PayloadAction<number>) {
      state.currentClaimId = action.payload;
    },
    setCurrentClaimDate(state, action: PayloadAction<string>) {
      state.currentClaimDate = action.payload;
    },
    setClaim(state, action: PayloadAction<ClaimData[]>) {
      state.claim = action.payload;
      console.log('claim is', action.payload)
    }
  },
});

export const useCurrentApplicationId = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentClaimId);

export const useCurrentApplicationDate = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentClaimDate);

export const useApplications = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.claim);

export const {
    setCurrentClaimId: setCurrentClaimIdAction,
    setCurrentClaimDate: setCurrentClaimDateAction,
    setClaim: setClaimAction

} = dataSlice.actions;

export default dataSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from './Store';

interface ProductData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string
}

export type ReceivedProductData = {
  id: number,
  product_name: string,
  product_info: string,
  price: number,
  status: string,
  photo: string,
}

interface LinksMapType {
  [key: string]: string;
}

interface DataState {
  product: ProductData,
  LinksMapData: LinksMapType
}

const initialState: DataState = {
  product: {} as ProductData,
  LinksMapData: { 'Блюда': '/products' }
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductData>) {
      state.product = action.payload;
    },
    setLinksMapData: (state, action: PayloadAction<Map<string, string>>) => {
      state.LinksMapData = Object.fromEntries(action.payload);
    },
  },
});

export const useProduct = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.product);

export const useLinksMapData = () =>
  useSelector((state: { detailedData: DataState }) => 
    new Map(Object.entries(state.detailedData.LinksMapData))
  );

export const {
  setProduct: setProductAction,
  setLinksMapData: setLinksMapDataAction
} = dataSlice.actions;

export default dataSlice.reducer;
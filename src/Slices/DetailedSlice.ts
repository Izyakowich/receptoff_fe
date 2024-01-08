import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface ProductData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string
}

// export type ReceivedProductData = {
//   id: number,
//   product_name: string,
//   product_info: string,
//   price: number,
//   status: string,
//   photo: string,
// }
interface DataState {
  product: ProductData,
  LinksMapData: Map<string, string>
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    product: {},
    LinksMapData: new Map<string, string>([['блюда', '/']])
  } as DataState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductData>) {
        state.product = action.payload
    },
    setLinksMapData(state, action: PayloadAction<Map<string, string>>) {
      console.log(action.payload)
      state.LinksMapData = action.payload
  },
  },
});

export const useProduct = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.product);

export const useLinksMapData = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.LinksMapData);

export const {
    setProduct: setProductAction,
    setLinksMapData: setLinksMapDataAction
} = dataSlice.actions;

export default dataSlice.reducer;
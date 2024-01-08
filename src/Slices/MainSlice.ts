import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// interface CategoryData {
//   id: number;
//   title: string;
// }

interface ProductData {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
}

interface DataState {
  titleValue: string;
  products: ProductData[];
  priceValues: number[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    titleValue: '',
    products: [],
    priceValues: [0, 10000]
  } as DataState,
  reducers: {
    // setCategories(state, action: PayloadAction<CategoryData[]>) {
    //   state.categories = action.payload
    // },
    // setCategoryValue(state, action: PayloadAction<string>) {
    //   state.categoryValue = action.payload
    // },
    setTitleValue(state, action: PayloadAction<string>) {
      state.titleValue = action.payload
    },
    setProducts(state, action: PayloadAction<ProductData[]>) {
      console.log('pay is', action.payload)
      state.products = action.payload
    },
    setPriceValues(state, action: PayloadAction<number[]>) {
      state.priceValues = action.payload
    }
  },
});

// Состояние, которое будем отображать в компонентах
// export const useCategories = () =>
//   useSelector((state: { mainData: DataState }) => state.mainData.categories);

 
export const useTitleValue = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.titleValue);

export const useProducts = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.products);

export const usePriceValues = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.priceValues);

// Action, который будем применять в различных обработках
export const {
    // setCategories: setCategoriesAction,
    // setCategoryValue: setCategoryValueAction,
    setTitleValue: setTitleValueAction,
    setProducts: setProductsAction,
    setPriceValues: setPriceValuesAction
} = dataSlice.actions;

export default dataSlice.reducer;
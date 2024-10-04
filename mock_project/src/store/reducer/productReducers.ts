import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "../../utils/url";

interface Product {
  id: number;
  name: string;
  available: number;
  sold: number;
  category: string;
  colors: string;
  price: number;
}

export const fetchProduct = createAsyncThunk(
  'products',
  async () => {
    const productInfo = await fetchJson(BASE_URL + '/products')
    return productInfo
  }
)

interface ProductState {
  entities: Record<number, Product>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const products: Product[] = action.payload
      state.ids = products.map((product) => product.id)
      products.forEach((product) => {
        state.entities[product.id] = product;
      });
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = 'failed';
      // state.error = action.error.message
    })
  }
})

export const productReducer = productSlice.reducer
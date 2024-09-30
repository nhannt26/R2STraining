import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "./authReducers";

interface Product {
  id: number;
  name: string;
  available: number;
  sold: number;
  category: string;
  colors: string;
  price: number;
}

export const product = createAsyncThunk(
  'products',
  async () => {
    const productInfo = await fetchJson(BASE_URL + '/products')
    return productInfo
  }
)

const initialState = {
  product: [],
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(product.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(product.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload
    })
    builder.addCase(product.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.error.message
    })
  }
})

export const productReducer = productSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";
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
    const res = await fetchJson(BASE_URL + '/products')
    return res
  }
)

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct: Product) => {
    const res = await updateJson(BASE_URL + '/products', newProduct, 'POST')
    return res
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    const res = await updateJson(`${BASE_URL}/products/${product.id}`, product, "PUT");
    return res;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    await deleteJson(BASE_URL + "/products", productId.toString());
    return productId;
  }
);
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
    builder.addCase(addProduct.fulfilled, (state, action) => {
      const addedProduct: Product = action.payload;
      state.entities[addedProduct.id] = addedProduct;
      state.ids.push(addedProduct.id);
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct: Product = action.payload;
      state.entities[updatedProduct.id] = updatedProduct;
    })
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.error.message || "Failed to update product";
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const productId = action.payload;
      delete state.entities[productId];
      state.ids = state.ids.filter((id) => id !== productId); 
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.error.message || "Failed to delete product";
    });
  }
})

export const productReducer = productSlice.reducer
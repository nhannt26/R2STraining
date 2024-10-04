import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "../../utils/url";

interface Category {
  id: number;
  name: string;
}

export const fetchCategory = createAsyncThunk(
  'categories',
  async () => {
    const categoryInfo = await fetchJson(BASE_URL + '/categories')
    return categoryInfo
  }
)

interface CategoryState {
  entities: Record<number, Category>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const categories: Category[] = action.payload
      state.ids = categories.map((category) => category.id)
      categories.forEach((category) => {
        state.entities[category.id] = category;
      });
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.status = 'failed';
      // state.error = action.error.message
    })
  }
})

export const categoryReducer = categorySlice.reducer
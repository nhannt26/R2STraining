import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "../../utils/url";

interface Color {
  id: number;
  name: string;
}

export const fetchColor = createAsyncThunk(
  'colors',
  async () => {
    const colorInfo = await fetchJson(BASE_URL + '/colors')
    return colorInfo
  }
)

interface ColorState {
  entities: Record<number, Color>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ColorState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchColor.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchColor.fulfilled, (state, action) => {
      // console.log(action);
      
      state.status = 'succeeded';
      const colors: Color[] = action.payload
      state.ids = colors.map((color) => color.id)
      colors.forEach((color) => {
        state.entities[color.id] = color;
      });
    })
    builder.addCase(fetchColor.rejected, (state, action) => {
      state.status = 'failed';
      // state.error = action.error.message
    })
  }
})

export const colorReducer = colorSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fetchData";
import { PostsState } from "../../types/post";

export const fetchListPosts = createAsyncThunk('posts/fetchListPosts', async () => {
  try {
    const dataResponse = await fetchData('posts')
    return dataResponse
  } catch (error) {
    return error
  }
})

const initialState: PostsState = {
  list: [],
  loading: 'idle',
  error: ''
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListPosts.pending, (state, action) => {
      state.loading = 'loading'
    })
    builder.addCase(fetchListPosts.fulfilled, (state, action) => {
      state.list = action.payload || []
      state.loading = 'succeed'
    })
    builder.addCase(fetchListPosts.rejected, (state, action) => {
      state.loading = 'failed'
    })

  }
})

export const postsReducer = postsSlice.reducer
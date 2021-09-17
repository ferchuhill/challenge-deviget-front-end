import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store';
import { fetchPosts } from '../../service/postsApi';
import { PropsIndexType } from '../../util';

export interface CounterState {
  value: PropsIndexType;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: { after: '', before: '', posts: [] },
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const findPost = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchPosts();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const counterSlice = createSlice({
  name: 'posts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPosts: (state, action: PayloadAction<PropsIndexType>) => {
      state.value = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(findPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(findPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { setPosts } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getPost = (state: AppState) => state.posts.value;

export default counterSlice.reducer;
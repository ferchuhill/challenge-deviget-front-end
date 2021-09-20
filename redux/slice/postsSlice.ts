import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../store';
import { fetchPosts } from '../../service/postsApi';
import { PostDissmisAction, PostDissmisAllAction, PostReadAction, PropsIndexType } from '../../util';

export interface CounterState {
  value: PropsIndexType;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: { after: '', before: '', posts: [] },
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic.
export const findPost = createAsyncThunk(
  'posts/fetchPosts',
  // async ({ after, before }: { after?: string; before?: string }) => {
  async () => {
    const response = await fetchPosts({ after: undefined, before: undefined });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const findPostBefore = createAsyncThunk('posts/fetchPostsBefore', async ({ before }: { before?: string }) => {
  const response = await fetchPosts({ after: undefined, before: before });
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const findPostAfter = createAsyncThunk('posts/fetchPostsAfter', async ({ after }: { after: string }) => {
  const response = await fetchPosts({ after: after, before: undefined });
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
    //Set a Post as Read
    setReadPost: (state, action: PayloadAction<PostReadAction>) => {
      state.value.posts = state.value.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.read = action.payload.read;
        }
        return post;
      });
    },
    //Set a Post as dissmis
    setDismissPost: (state, action: PayloadAction<PostDissmisAction>) => {
      state.value.posts = state.value.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.dismiss = true;
        }
        return post;
      });
    },
    //Set all Posts as dissmis
    setDismissAllPost: (state, action: PayloadAction<PostDissmisAllAction>) => {
      console.log(action.payload.id);
      state.value.posts = state.value.posts.map((post) => {
        console.log(action.payload.id.indexOf(post.id), post.id);
        if (action.payload.id.indexOf(post.id) >= 0) {
          post.dismiss = true;
        }
        return post;
      });
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(findPost.pending, (state) => {
        state.status = 'loading';
        state.value.posts = [];
      })
      .addCase(findPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(findPostBefore.pending, (state) => {
        state.status = 'loading';
        state.value.posts = [];
      })
      .addCase(findPostBefore.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(findPostAfter.pending, (state) => {
        state.status = 'loading';
        state.value.posts = [];
      })
      .addCase(findPostAfter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { setPosts, setReadPost, setDismissPost, setDismissAllPost } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPost = (state: AppState) => {
  const posts = state.posts.value.posts.filter((post) => {
    return post.dismiss !== true;
  });
  return { after: state.posts.value.after, before: state.posts.value.before, posts: posts };
};

export default counterSlice.reducer;

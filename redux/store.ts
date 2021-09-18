import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import postReducer from './slice/postsSlice';
import viewRedicer from './slice/viewTypeSlice';

const reducers = combineReducers({ posts: postReducer, view: viewRedicer });

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

//Generate the store use to wrapper the page
export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    devTools: true,
  });
}
const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;

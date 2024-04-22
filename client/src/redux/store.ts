import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import auth from '../redux/slices/auth';
import { postsReducer } from './slices/posts';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../../pages/api/posts'; // Замените 'api/postsAPI' на путь к вашему модулю для сетевых запросов

const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchPosts(); // Предполагаем, что у вас есть функция fetchPosts для получения постов
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    categories: [],
    total: 0,
    loaded: 0,
    status: 'idle', // Добавляем поле статуса для отслеживания состояния асинхронной операции
    error: null, // Добавляем поле для отслеживания ошибок
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addCategory, setCategories, removeCategory, setLoadedCount } =
  postsSlice.actions;
export { fetchPostsAsync }; // Экспортируем thunk

export default postsSlice.reducer;

export const postsReducer = postsSlice.reducer;

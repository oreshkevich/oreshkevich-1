/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';

import bookSlice from '../features/book/book-slice';
import categorySlice from '../features/category/category-slice';
import postSlice from '../features/post/post-slice';

export const store = configureStore({
  reducer: {
    post: postSlice,
    book: bookSlice,
    category: categorySlice,
  },
});
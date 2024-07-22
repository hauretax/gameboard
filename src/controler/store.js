import { configureStore } from '@reduxjs/toolkit';
import lettersReducer from './lettersSlice';

export const store = configureStore({
  reducer: {
    letters: lettersReducer,
  },
});

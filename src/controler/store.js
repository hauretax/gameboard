import { configureStore } from '@reduxjs/toolkit';
import lettersReducer from './lettersSlice';
import printableLettersReducer from './printableLettersSlice';

export const store = configureStore({
  reducer: {
    letters: lettersReducer,
    printableLetters: printableLettersReducer,
  },
});

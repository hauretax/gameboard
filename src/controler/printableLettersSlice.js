import { createSlice } from '@reduxjs/toolkit';

const printableLettersSlice = createSlice({
    name: 'printableLetters',
    initialState: [],
    reducers: {
        addPrintableLetters: (state, action) => {
            state.push(action.payload);
        },
        removePrintableLetters: (state, action) => {
            state = state.filter((letter) => letter !== action.payload);
        },
        toString: (state) => {
            return state.join(', ').replace(/ , $/, '');
        },
        clearPrintableLetters: (state) => {
            return [];
        }
    },
});

export const { addPrintableLetters, removePrintableLetters, clearPrintableLetters } = printableLettersSlice.actions;
export default printableLettersSlice.reducer;

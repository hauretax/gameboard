import { createSlice } from '@reduxjs/toolkit';

const printableLettersSlice = createSlice({
    name: 'printableLetters',
    initialState: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    reducers: {
        addPrintableLetters: (state, action) => {
            state.push(action.payload);
        },

        removePrintableLetters: (state, action) => {

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

import { createSlice } from '@reduxjs/toolkit';

let nextId = 0;

const createLetter = (key, dispatch) => {
    const id = nextId++;
    const duration = 5000;
    const startTime = Date.now();
    const interval = setTimeout(() => {
        console.log('missed ' + key);
        dispatch(removeLetter(id));
    }, duration);

    return {
        id,
        key,
        duration,
        isHit: false,
        startTime,
        interval
    };
};

const lettersSlice = createSlice({
    name: 'letters',
    initialState: [],
    reducers: {
        addLetter: (state, action) => {
            state.push(action.payload);
        },
        removeLetter: (state, action) => {
            const letter = state.filter(letter => letter.id === action.payload);
            letter[0].interval && clearTimeout(letter[0].interval);
            return state.filter(letter => letter.id !== action.payload);
        },
    },
});

export const { addLetter, removeLetter } = lettersSlice.actions;
export default lettersSlice.reducer;

export const createAndAddLetter = (key) => (dispatch) => {
    const letter = createLetter(key, dispatch);
    dispatch(addLetter(letter));
};

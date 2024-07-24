import { createSlice } from '@reduxjs/toolkit';

const lettersSlice = createSlice({
    name: 'letters',
    initialState: [],
    reducers: {
        addLetter: (state, action) => {
            state.push(action.payload);
        },
        successHit: (state, action) => {
            const letter = state.find(letter => letter.id === action.payload);
            if (letter) {
                letter.interval && clearTimeout(letter.interval);
                letter.isHit = true;

            }

        },
        removeLetter: (state, action) => {
            const letter = state.filter(letter => letter.id === action.payload);
            letter[0].interval && clearTimeout(letter[0].interval);
            return state.filter(letter => letter.id !== action.payload);
        },
        clear: (state) => {
            return [];
        }
    },
});

export const { addLetter, successHit, removeLetter, clear } = lettersSlice.actions;
export default lettersSlice.reducer;

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

function getRandomCharacter() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

export const createAndAddLetter = () => (dispatch) => {
    const letter = createLetter(getRandomCharacter(), dispatch);
    dispatch(addLetter(letter));
};

export const hit = (key) => (dispatch, getState) => {
    const state = getState().letters;
    const letter = state.find(letter => letter.key === key);
    if (letter) {
        dispatch(successHit(letter.id));
        // pour ajouter un mode plus tard avec un nombre de cible ou je ne sait quoi pour le moment il es tinfinit
        if (true) {
            dispatch(createAndAddLetter());
        }
    } else {
        console.log('miss');
    }
};

export const clearLetters = () => (dispatch) => {
    dispatch(clear());
}
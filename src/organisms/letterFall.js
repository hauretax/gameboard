import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAndAddLetter, removeLetter } from '../controler/lettersSlice';
import '../styles/letterFall.css';

function getRandomCharacter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

export default function LetterFall() {
    const dispatch = useDispatch();
    const letters = useSelector((state) => state.letters);

    const addNewLetter = () => {
        const randomKey = getRandomCharacter();
        dispatch(createAndAddLetter(randomKey));
    };

    return (
        <div className="letterFall">
            <h1>Letter Fall</h1>
            <button onClick={addNewLetter}>Add Letter</button>
            <div id='fall'>
                {letters.map(letter => (
                    <div key={letter.id} className="fallingLetter">
                        {letter.key}
                        {/* Ajout d'un bouton pour supprimer manuellement une lettre */}
                        <button onClick={() => dispatch(removeLetter(letter.id))}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

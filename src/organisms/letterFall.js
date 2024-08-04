import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearLetters, createAndAddLetter, removeLetter } from '../controler/lettersSlice';
import '../styles/letterFall.css';

export default function LetterFall() {
    const dispatch = useDispatch();
    const letters = useSelector((state) => state.letters);

    const printableLetters = useSelector((state) => state.printableLetters);

    const addNewLetter = () => {
        dispatch(clearLetters());
        dispatch(createAndAddLetter());
    };

    return (
        <div className="letterFall">
            <h1>Letter Fall</h1>
            <h2>{printableLetters.toString()}</h2>
            <button onClick={addNewLetter}>Add Letter</button>
            <div id='fall'>
                {letters.filter(letter => !letter.isHit).map(letter => (
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

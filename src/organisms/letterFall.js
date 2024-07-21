import { useEffect, useState } from 'react';
import '../styles/letterFall.css';
import MovingLetters from '../utils/MovingLetters';

const movingLetters = new MovingLetters();

function getRandomCharacter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

export default function LetterFall() {

    const [letters, setLetters] = useState([]);
    movingLetters.setOnUpdate(() => {
        const letters = movingLetters.getLetters()
        setLetters([...letters]);
    });

    const addLetter = () => {
        movingLetters.newLetter(getRandomCharacter());
        const letters = movingLetters.getLetters();
        setLetters([...letters]);
    };

    return (
        <div className="letterFall">
            <h1>Letter Fall</h1>
            <button onClick={() => addLetter()}> add letter</button>
            <div id='fall'>
                {letters.map(letter => (
                    <div key={letter.id} className="fallingLetter">
                        {letter.key}
                    </div>
                ))}
            </div>
        </div>
    )
}
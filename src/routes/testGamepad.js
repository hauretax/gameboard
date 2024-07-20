import '../styles/testGamepad.css';
import { useEffect, useState, useRef } from "react";
import GamepadManager from "../utils/GamepadManager";
import KeyList from '../organisms/keyList';
import PlatoTemplate from '../organisms/platoTemplate';
import { useNavigate } from 'react-router-dom';

import mapConfigFile from '../assets/mapConfig/BepoStyle.json';
/**
 * Représente une association entre une touche de clavier et une combinaison de contrôles sur une manette.
 * @typedef {Object} Key
 * @property {string} character - La touche du clavier associée (par exemple, 'A', 'B', 'C', ...).
 * @property {string} leftStickPosition - La position du joystick gauche.
 * @property {string} rightStickPosition - La position du joystick droit.
 * @property {number} buttonPressed - Le bouton pressé :
 *                                     0 = A, 1 = B, 2 = X, 3 = Y,
 *                                     4 = LB, 5 = RB, 6 = LT, 7 = RT,
 *                                     8 = Back, 9 = Start, 10 = L3, 11 = R3,
 *                                     12 = D-Pad Up, 13 = D-Pad Down,
 *                                     14 = D-Pad Left, 15 = D-Pad Right,
 *                                     16 = Guide.
 * je compte rendre ca modulable plus tard pour pouvoir integrer tout sort de clvier
 */

/**
 * Exemple d'utilisation :
 * @type {Key}
 */

export default function TestGamepad() {
    const [axes, setAxes] = useState([]);
    const [buttonsPressed, setButtonsPressed] = useState([]);
    const mapConfig = mapConfigFile;
    const requestRef = useRef();

    const navigate = useNavigate();
    const setedKey = []
    mapConfig.plato.forEach(plato => {
        Object.entries(plato.KeyTab).forEach(([_, value]) => {
            setedKey.push(value);
        })
    })

    useEffect(() => {
        const Gamepad = new GamepadManager();

     
        const getGamepadsInfo = () => {
            const gamepadState = Gamepad.getState();
            if (gamepadState == null) return;

            setButtonsPressed(gamepadState.buttonsPressed);
            setAxes(gamepadState.axes);
        };

        const gameLoop = () => {
            getGamepadsInfo();
            requestRef.current = requestAnimationFrame(gameLoop);
        };

        requestRef.current = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const goToGamePage = () => {
        navigate('/game');
    };

    return (
        <div className='testGamepad' >
            <div className="gamepadInfo">
                <button onClick={goToGamePage}>Go to Game Page</button>
                <h1>Stick gauches</h1>
                <div>
                    {axes.map((axe, index) => (
                        <div
                            key={index}
                            style={{ margin: '1px' }}
                        >
                            {axe}
                        </div>
                    ))}
                </div>
                <h1>Buttons</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                    {buttonsPressed.map((buttonPressed, index) => (
                        <div
                            key={index}
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: buttonPressed ? 'red' : 'blue',
                                margin: '1px',
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            <div className='map'>
                {mapConfig.plato.map(plato => {
                    return <PlatoTemplate key={plato.id} className='KeyTemplate' plato={plato} />
                })
                }
            </div>

            <div className='keylist'>
                <KeyList setedKey={setedKey} />
            </div>
        </div >
    );
}

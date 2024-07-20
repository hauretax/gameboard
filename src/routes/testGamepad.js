import '../styles/testGamepad.css';
import { useEffect, useState, useRef } from "react";
import GamepadManager from "../utils/GamepadManager";
import Stick from "../utils/Stick";
import KeyList from '../organisms/keyList';
import PlatoTemplate from '../organisms/platoTemplate';


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
    //recording
    const [rec, setRec] = useState(false);
    const recRef = useRef(rec);
    //direction
    const [actualKeyCombinations, setactualKeyCombinations] = useState({ leftStickPosition: '', rightStickPosition: '', buttonPressed: '' });
    useEffect(() => {
        recRef.current = rec;
    }, [rec]);

    const setedKey = []
    mapConfig.plato.forEach(plato => {
        Object.entries(plato.KeyTab).forEach(([_, value]) => {
            setedKey.push(value);
        })
    })

    useEffect(() => {
        const Gamepad = new GamepadManager();
        const leftStick = new Stick(0, 0);
        const rightStick = new Stick(0, 0);

        const recordOneInput = (leftStick, rightStick, buttonsPressed) => {
            const trueCount = buttonsPressed.filter(button => button === true).length
            if (trueCount === 1) {
                setactualKeyCombinations({
                    leftStickPosition: leftStick.getDirection(),
                    rightStickPosition: rightStick.getDirection(),
                    buttonPressed: buttonsPressed.findIndex(button => button === true)
                });
            }
        };

        const getGamepadsInfo = () => {
            const gamepadState = Gamepad.getState();
            if (gamepadState == null) return;
            if (recRef.current) {
                leftStick.setDirection(gamepadState.axes[0], gamepadState.axes[1]);
                rightStick.setDirection(gamepadState.axes[2], gamepadState.axes[3]);
                recordOneInput(leftStick, rightStick, gamepadState.buttonsPressed);
            }

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



    const recording = () => {
        setRec(true);
    };

    return (
        <div className='testGamepad' >
            <div className="gamepadInfo">
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
        </div>
    );
}

import '../styles/gamePage.css';
import { useEffect, useState, useRef } from "react";
import GamepadManager from "../utils/GamepadManager";
import Stick from "../utils/Stick";
import PlatoTemplate from '../organisms/platoTemplate';



import mapConfigFile from '../assets/mapConfig/BepoStyle.json';
import LetterFall from '../organisms/letterFall';

export default function GamePage() {
    const mapConfig = mapConfigFile;

    const [plato, setPlato] = useState(mapConfig.plato[0]);
    const [key, setKey] = useState('');
    const requestRef = useRef();

    useEffect(() => {
        const Gamepad = new GamepadManager();
        const leftStick = new Stick(0, 0);
        const rightStick = new Stick(0, 0);

        const selectPlato = ({ leftStickPosition, rightStickPosition }) => {
            const findedPlato = mapConfig.plato.find(plato => {
                //se serais plus propre de definire left et right joystick dans les json . mais je ne sait pas encors si je vais limiter ca a 2 joystick ou a uniquement des joystick . donc je laisse ca en tableaux c'est plus libre pour plus tard
                return plato.joystick[0] === leftStickPosition && plato.joystick[1] === rightStickPosition
            })
            setPlato(findedPlato)
            return findedPlato;
        }
        //ici je recuperer la list de tout les boutons presser mais je n'en utiliserais que un ca peu etre interessant plus tard de pouvoir fair des combinaison de bouton et de fair l'entrer sur le relachement des touche .
        const selectKey = (curentPlato, buttonsPressed) => {
            const buttonPresse = buttonsPressed.findIndex(button => button === true);
            if (buttonPresse === -1 || curentPlato === null || curentPlato === undefined) return; //close

            setKey(curentPlato.KeyTab[mapConfig.buttonId[buttonPresse]]);
        }

        const getGamepadsInfo = () => {
            const gamepadState = Gamepad.getState();
            if (gamepadState == null) return; //close


            leftStick.setDirection(gamepadState.axes[0], gamepadState.axes[1]);
            rightStick.setDirection(gamepadState.axes[2], gamepadState.axes[3]);

            const curentPlato = selectPlato({ leftStickPosition: leftStick.getDirection(), rightStickPosition: rightStick.getDirection() })
            selectKey(curentPlato, gamepadState.buttonsPressed);
        };

        const gameLoop = () => {
            getGamepadsInfo();
            requestRef.current = requestAnimationFrame(gameLoop);
        };

        requestRef.current = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(requestRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='gamePage' >
            {plato != null ? <PlatoTemplate plato={plato} /> : null}
            <LetterFall />
            <div className='key'>{key}</div>
        </div >
    );
}

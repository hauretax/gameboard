import '../styles/testGamepad.css';
import { useEffect, useState, useRef } from "react";
import GamepadManager from "../utils/GamepadManager";
import Stick from "../utils/Stick";
import PlatoTemplate from '../organisms/platoTemplate';



import mapConfigFile from '../assets/mapConfig/BepoStyle.json';

export default function GamePage() {
    const mapConfig = mapConfigFile;


    const [axes, setAxes] = useState([]);
    const [buttonsPressed, setButtonsPressed] = useState([]);
    const [plato, setPlato] = useState(mapConfig.plato[0]);
    const requestRef = useRef();

    //recording
    const [rec, setRec] = useState(false);
    const recRef = useRef(rec);
    useEffect(() => {
        const Gamepad = new GamepadManager();
        const leftStick = new Stick(0, 0);
        const rightStick = new Stick(0, 0);

        const selectPlato = ({ leftStickPosition, rightStickPosition }) => {
            setPlato(mapConfig.plato.find(plato => {

                //se serais plus propre de definire left et right joystick dans les json . mais je ne sait pas encors si je vais limiter ca a 2 joystick ou a uniquement des joystick . donc je laisse ca en tableaux c'est plus libre pour plus tard
                return plato.joystick[0] === leftStickPosition && plato.joystick[1] === rightStickPosition
            }))
        }

        const getGamepadsInfo = () => {
            const gamepadState = Gamepad.getState();
            if (gamepadState == null) return;
            leftStick.setDirection(gamepadState.axes[0], gamepadState.axes[1]);
            rightStick.setDirection(gamepadState.axes[2], gamepadState.axes[3]);
            selectPlato({ leftStickPosition: leftStick.getDirection(), rightStickPosition: rightStick.getDirection() })

            setButtonsPressed(gamepadState.buttonsPressed);
            setAxes(gamepadState.axes);
        };

        const gameLoop = () => {
            getGamepadsInfo();
            requestRef.current = requestAnimationFrame(gameLoop);
        };

        requestRef.current = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(requestRef.current);
    }, [mapConfig.plato]);



    const recording = () => {
        setRec(true);
    };

    return (
        <div className='GamePage' >
            {plato != null ? <PlatoTemplate plato={plato} /> : null}
            <DIV></DIV>
        </div >
    );
}

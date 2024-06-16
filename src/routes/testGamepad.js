import { useEffect, useState } from "react";
import GamepadManager from "../utils/GamepadManager";



export default function TestGamepad() {

    const [axes, setAxes] = useState([]);
    const [buttonsPressed, setButtonsPressed] = useState([]);


    useEffect(() => {
        const Gamepad = new GamepadManager();

        function getGamepadsInfo() {
            const gamepadState = Gamepad.getState();
            if (gamepadState == null) return;
            
            setButtonsPressed(gamepadState.buttonsPressed);
            setAxes(gamepadState.axes);
            console.log(gamepadState.buttons);
        }
        function gameLoop() {
            getGamepadsInfo();
            requestAnimationFrame(gameLoop);
        }

        gameLoop()
    }, []);

    return (
        <div>
            <h1>Axes</h1>
            <div >
                {axes.map((axe, index) => (
                        <div
                            key={index}
                            style={{
                                margin: '1px',
                            }}
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
                            backgroundColor: buttonPressed  ? 'red' : 'blue',
                            margin: '1px',
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}